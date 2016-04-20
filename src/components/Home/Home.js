import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/counter';

function Home(props) {
  const { number, increase, decrease } = props;
  return (
    <div>
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  );
}

Home.propTypes = {
  number: React.PropTypes.number.isRequired,
  increase: React.PropTypes.func.isRequired,
  decrease: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { number: state.counter.number };
}

export default connect(mapStateToProps, Actions)(Home);
