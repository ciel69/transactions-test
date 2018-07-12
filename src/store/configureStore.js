import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'reapop';

import rootReducer from 'src/reducers';

export default function configureStore(initialState) {
  const middleware = [thunk];

  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose;

  if (
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  /* eslint-enable */
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
