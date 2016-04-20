import React from 'react';
import { Link } from 'react-router';

function Layout(props) {
  const style = require('./Layout.scss');

  return (
    <div>
      <div className={ style.logo }>React Starter Kit</div>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/repos">Repos</Link></li>
      </ul>
      {props.children}
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Layout;
