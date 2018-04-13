import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null,
    }
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take copy of that fish
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return
    }

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId)

    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });

    })
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, {user});
      }
    });
  }

  logout() {
    base.unauth();
    this.setState({uid: null});
  }

  renderLogin() {
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={(e) => this.handleChange(e, key)}/>
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={(e) => this.handleChange(e, key)}
          />
        <select
          name="status"
          value={fish.status}
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Description"
          onChange={(e) => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="img"
          value={fish.image}
          placeholder="Fish Image"
          onChange={(e) => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={() => this.logout()}>Logout</button>
    if(!this.state.uid) {
      // check if they are not logged in at all
      return <div>{this.renderLogin()}</div>
    }

    if(this.state.uid !== this.state.owner) {
      return (<div><p>Sorry you aren't the owner!</p></div>)
    }

    return (
      <div>
        <p>Inventory</p>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}


Inventory.propTypes = {
  addFish: React.PropTypes.func.isRequired,
  deleteFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
}

export default Inventory;
