import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.module.scss';
import App from './components/App/App';
import rootReducer from './store/reducer';
import { fetchArticles } from './actions/actions';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const loggerMiddleware = (store) => (next) => (action) => {
  const res = next(action);
  console.log('Middleware', store.getState());
  return res;
};

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// const localStorageState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : null;
// const token = localStorageState.loggedState.isLogged ? localStorageState.loggedState.data.token : null;

store.dispatch(fetchArticles(0));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App></App>
    </Router>
  </Provider>
);
