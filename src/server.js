'use strict';

import Express from 'express'
import React from "react"
import ReactDOM from "react-dom/server"
import Html from "./server/components/Html"
import path from 'path'

import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import createStore from './redux/createStore';

import getRoutes from './routes';
const app = new Express();

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if ( true ) {
  //if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpack_isomorphic_tools.refresh();
  }
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore( history, {} );
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(
        <Html assets={webpack_isomorphic_tools.assets()}>
          <div id="app">
            <p>Hello</p>
          </div>
        </Html>
      ));
  }

  //hydrateOnClient();

  match(
    { history, routes: getRoutes(), location: req.originalUrl }, 
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html 
              assets={webpack_isomorphic_tools.assets()} 
              content={ReactDOM.renderToString(
                <Provider store={store} key="provider">
                  <RouterContext {...renderProps}/>
                </Provider>
              )} 
            />
          )
        );
      } else {
        res.status(404).send('Not found');
      }
    }
  );

});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
