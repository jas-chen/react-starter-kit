import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/counter';
import Home from '../components/Home/Home';

function App(props) {
  return (
    <Home {...props} />
  );
}

App.propTypes = {
  number: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { number: state.counter.number };
}

export default connect(mapStateToProps, Actions)(Home);
