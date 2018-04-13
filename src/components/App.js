import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.deleteFish = this.deleteFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.state = {
      fishes: [],
      order: [],
    }
  }

  componentWillMount() {
    // this runs right before the <aoo> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
        context: this,
        state: 'fishes',
      });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
      localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`]=fish;
    this.setState({fishes});
  }

  updateFish(key, updateFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updateFish;
    this.setState({fishes});
  }

  deleteFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    console.log('notdemo', fishes);
    this.setState({fishes});
  }

  loadSamples() {
    this.setState({
       fishes: sampleFishes,
    })
  }

  addToOrder(key) {
    //take a copy of our state
    const order = { ...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({
      order,
    })
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  render() {
    const fishes = Object.keys(this.state.fishes);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market!" />
          <ul className="list-of-fishes">
            {
              fishes
                .map((key) => {
                  return (
                    <Fish
                      addToOrder={ this.addToOrder }
                      details={this.state.fishes[key]}
                      index={ key }
                      key={ key }
                    />
                  )
                })
            }
          </ul>
        </div>
        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          params={ this.props.params}
          removeFromOrder= {this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={ this.addFish }
          loadSamples={ this.loadSamples }
          updateFish={ this.updateFish }
          deleteFish={ this.deleteFish }
          storeId = {this.props.params.storeId }
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
}

export default App;
