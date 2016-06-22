import * as Collections from '../../lib/collections';
import {Meteor} from 'meteor/meteor';

import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory);


export default function ({ reducers }) {

  const reducer = combineReducers({
    ...reducers,
  });

  const middlewares = [
    thunk,
    middleware,
  ];

  const Store = createStore(reducer, applyMiddleware(...middlewares));

  console.log("localState", Store.getState());

  return {
    Meteor,
    Collections,
    Store,
  };
}



