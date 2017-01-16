import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from './routes';
import createStore from './redux/createStore';

const store = createStore( browserHistory )
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render( 
  <Provider store={store} key="provider">
    <Router history={ history }>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById("content")
);
