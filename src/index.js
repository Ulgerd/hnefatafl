import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import { store } from './configureStore.js';
import TitlePage from './components/titlePage.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <TitlePage />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
