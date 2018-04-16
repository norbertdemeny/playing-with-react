import React from 'react';
import { getMedicinePicture } from '../helpers';

class AddPillForm extends React.Component {
  createPill(event) {
    event.preventDefault();
    let pill = {
      name : this.name.value,
      piece: this.piece.value,
      price : this.price.value,
      status : this.status.value,
      desc : this.desc.value,
      image : this.image.value
    }
    this.props.addPill(pill);
    this.pillForm.reset();
  }

  render() {
    return (
      <form ref={(form) => this.pillForm = form} className="fish-edit" onSubmit={(e) => this.createPill(e)}>
        <input ref={(name) => this.name = name} type="text" placeholder="Name"/>
        <input ref={(piece) => this.piece = piece} type="text" placeholder="Piece"/>
        <input ref={(price) => this.price = price} type="text" placeholder="Price"/>
        <select ref={(status) => this.status = status}>
          <option value="available">Available!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(desc) => this.desc = desc} type="text" placeholder="Desc"/>
        <input ref={(image) => this.image = image} type="text" defaultValue={getMedicinePicture()} placeholder="Image"/>
        <button type="submit">Add Item</button>
      </form>
    )
  }
}

AddPillForm.propTypes = {
  addPill: React.PropTypes.func.isRequired
}

export default AddPillForm;
