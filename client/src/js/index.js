import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
const rootReducer = require('./reducers/reducers.js');
import { Provider } from 'react-redux'
const React = require('react');
const ReactDOM = require('react-dom');
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
