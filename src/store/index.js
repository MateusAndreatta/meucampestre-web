import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { PRODUCTION } from '../globals';

function configureStore(preloadedState) {
  const middlewares = [thunk, promiseMiddleware];

  const middleware = applyMiddleware(...middlewares);

  const composeEnhancers = !PRODUCTION
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(middleware)
  );

  return store;
}

const store = configureStore();

export default store;
