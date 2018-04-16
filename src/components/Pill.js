import React from 'react';
import { formatPrice } from '../helpers';

class Pill extends React.Component {
  render() {
    const {details} = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to order' : 'Not Available!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name}/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{details.piece} &times; {formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc} </p>
        <button disabled={!isAvailable} onClick={ () => this.props.addToOrder(this.props.index)}>{buttonText}</button>
      </li>
    )
  }
}


Pill.propTypes = {
  details: React.PropTypes.object.isRequired,
}

export default Pill;
