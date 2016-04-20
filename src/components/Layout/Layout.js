import React from 'react';
import { Link } from 'react-router';
import rcm from 'react-css-modules';
const styles = require('./Layout.scss');

function Layout(props) {
  return (
    <div>
      <div styleName="logo">React Starter Kit</div>
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

export default rcm(Layout, styles);
