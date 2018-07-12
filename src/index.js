import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from 'src/store/configureStore';

const store = configureStore();

const rootEl = document.getElementById('app');
// Render to div with id App
if (rootEl) {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    rootEl
  );

  if (module.hot) {
    module.hot.accept('./App', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextApp = require('./App').default; //eslint-disable-line

      render(
        <AppContainer>
          <Provider store={store}>
            <NextApp />
          </Provider>
        </AppContainer>,
        rootEl
      );
    });
  }
}
