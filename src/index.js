import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './components/Layout/Layout';
import Home from './containers/Home';
import About from './components/About/About';
import Repos from './components/Repos/Repos';

import configureStore from './store/configureStore';


// disable ?_k in url
const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="/repos" component={Repos} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
