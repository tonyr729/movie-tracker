import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Container/App/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './Reducers/reducer';
import { BrowserRouter as Router} from 'react-router-dom';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
                 window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);


ReactDOM.render(
  <Provider store={store}>
    <Router> 
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
