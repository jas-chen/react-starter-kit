import React, { Component, PropTypes } from 'react';
const style = require('./Hello.scss');

class Hello extends Component {
  render() {
    if (!this.props.name) {
      return null;
    }

    return (
      <div className={style.box}>Hello {this.props.name}!</div>
    );
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
};

export default Hello;
