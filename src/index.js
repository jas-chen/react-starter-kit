import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import Layout from 'components/Layout/Layout';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import Repos from 'components/Repos/Repos';

// disable ?_k in url
const history = useRouterHistory(createHashHistory)({ queryKey: false });

render((
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/repos" component={Repos} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'));
