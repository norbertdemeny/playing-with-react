import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>TNO
          <span className="ofThe">
            <span className="of"></span>
            <span className="the"></span>
          </span>
        DB</h1>
        <h3 className="tagline">{this.props.tagline}</h3>
      </header>
    )
  }
}


Header.propTypes = {
  tagline: React.PropTypes.string.isRequired,
}

export default Header;
