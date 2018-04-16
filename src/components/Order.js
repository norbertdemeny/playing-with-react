import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const pill = this.props.pills[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!pill || (pill.status === 'unavailable' && count <= 0)) {
      debugger;
      return <li key={ key }>Sorry, this { pill ? pill.name : 'pill'} is not available.
      {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>{ count }buc {pill.name} {removeButton}</span>
        <span className="price">{formatPrice(count * pill.price)}</span>
      </li>
    )
  }



  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const pill = this.props.pills[key];
      const count = this.props.order[key];
      const available = pill && (pill.status === 'available' || count > 0);
      if (available) {
        return prevTotal + (pill.price * count || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your order</h2>
        <ul className="order">
          { orderIds.map((key) => this.renderOrder(key)) }
          <li className="total"><strong>Total:</strong>{formatPrice(total)}</li>
        </ul>
      </div>
    )
  }
}

export default Order;
