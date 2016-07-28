import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/reducers.js';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import TypeFastApp from './components/TypeFastApp';

const store = createStore(
  rootReducer,
   applyMiddleware(
     thunkMiddleware
   )
)

ReactDOM.render(
  <Provider store={store}>
    <TypeFastApp />
  </Provider>,
  document.getElementById('typefast')
);
