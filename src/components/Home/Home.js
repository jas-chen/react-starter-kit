import React from 'react';

function Home(props) {
  const { number, increase, decrease } = props;
  return (
    <div>
      <h1>Home</h1>
      Some state changes:
      <span>{number}</span>
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

export default Home;
