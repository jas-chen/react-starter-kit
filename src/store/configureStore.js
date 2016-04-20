import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from '../reducers';


export default function configureStore(history, initialState) {
  reducers.routing = routerReducer;
  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(history))
  );

  return store;
}
