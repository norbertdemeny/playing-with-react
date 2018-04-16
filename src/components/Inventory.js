import React from 'react';
import AddPillForm from './AddPillForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.state = {
      uid: null,
      owner: null,
    }
  }

  handleChange(e, key) {
    const pill = this.props.pills[key];
    // take copy of that fish
    const updatedPill = {
      ...pill,
      [e.target.name]: e.target.value
    };
    this.props.updatePill(key, updatedPill);
  }

  renderInventory(key) {
    const pill = this.props.pills[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={pill.name}
          placeholder="Pill Name"
          onChange={(e) => this.handleChange(e, key)}/>
         <input
          type="text"
          name="piece"
          value={pill.piece}
          placeholder="Pill Piece"
          onChange={(e) => this.handleChange(e, key)}
          />
        <input
          type="text"
          name="price"
          value={pill.price}
          placeholder="Pill Price"
          onChange={(e) => this.handleChange(e, key)}
          />
        <select
          name="status"
          value={pill.status}
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Available!</option>
          <option value="unavailable">Not Available!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={pill.desc}
          placeholder="Pill Description"
          onChange={(e) => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="img"
          value={pill.image}
          placeholder="Pill Image"
          onChange={(e) => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.deletePill(key)}>Remove Pill</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <p>Inventory</p>
        {Object.keys(this.props.pills).map(this.renderInventory)}
        <AddPillForm addPill={this.props.addPill} />
        <button onClick={this.props.loadSamples}>Load Sample Pills</button>
      </div>
    )
  }
}


Inventory.propTypes = {
  addPill: React.PropTypes.func.isRequired,
  deletePill: React.PropTypes.func.isRequired,
  updatePill: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
}

export default Inventory;
