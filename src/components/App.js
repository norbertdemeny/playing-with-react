import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Pill from './Pill';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addPill = this.addPill.bind(this);
    this.updatePill = this.updatePill.bind(this);
    this.deletePill = this.deletePill.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.state = {
      pills: [],
      order: [],
    }
  }

  componentWillMount() {
    // // this runs right before the <aoo> is rendered
    this.ref = base.syncState(`tno-database/pills`, {
        context: this,
        state: 'pills',
      });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem('order');
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
    localStorage.setItem('order', JSON.stringify(nextState.order));
  }

  addPill(pill) {
    const pills = {...this.state.pills};
    const timestamp = Date.now();
    pills[`pill-${timestamp}`]=pill;
    this.setState({pills});
  }

  updatePill(key, updatePill) {
    const pills = {...this.state.pills};
    pills[key] = updatePill;
    this.setState({pills});
  }

  deletePill(key) {
    debugger;
    const pills = {...this.state.pills};
    pills[key] = null;
    this.setState({pills});
  }

  loadSamples() {
    this.setState({
       pills: sampleFishes,
    })
  }

  addToOrder(key) {
    //take a copy of our state
    const order = { ...this.state.order};
    const pills = { ...this.state.pills};
    const pill = pills[key];
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;

    if (pill.piece <= 1) {
      pill.piece = 0;
      pill.status = "unavailable";
    } else {
      pill.piece -= 1;
    }

    // update our state
    this.setState({
      order,
      pills
    })
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    const pills = { ...this.state.pills};
    const pill = pills[key];
    if (order[key] <= 1) {
      delete order[key];
    } else {
      order[key] -= 1;
    }
    pill.piece += 1;
    pill.status = "available";
    this.setState({order, pills});
  }

  render() {
    const pills = Object.keys(this.state.pills);
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Medicine database!" />
          <ul className="list-of-fishes">
            {
              pills
                .map((key) => {
                  return (
                    <Pill
                      addToOrder={ this.addToOrder }
                      details={this.state.pills[key]}
                      index={ key }
                      key={ key }
                    />
                  )
                })
            }
          </ul>
        </div>
        <Order
          pills={ this.state.pills }
          order={ this.state.order }
          params={ this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          pills={this.state.pills}
          addPill={ this.addPill }
          loadSamples={ this.loadSamples }
          updatePill={ this.updatePill }
          deletePill={ this.deletePill }
        />
      </div>
    )
  }
}

export default App;
