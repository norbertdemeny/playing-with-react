import React from 'react';

class AddFishForm extends React.Component {
  createFish(event) {
    event.preventDefault();
    let fish = {
      name : this.name.value,
      price : this.price.value,
      status : this.status.value,
      desc : this.desc.value,
      image : this.image.value
    }
    this.props.addFish(fish);
    this.fishForm.reset();
  }

  render() {
    return (
      <form ref={(form) => this.fishForm = form} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
        <input ref={(name) => this.name = name} type="text" placeholder="Fish Name"/>
        <input ref={(price) => this.price = price} type="text" placeholder="Fish Price"/>
        <select ref={(status) => this.status = status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(desc) => this.desc = desc} type="text" placeholder="Fish Desc"/>
        <input ref={(image) => this.image = image} type="text" placeholder="Fish Image"/>
        <button type="submit">Add Item</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
