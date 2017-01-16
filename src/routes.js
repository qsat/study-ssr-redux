import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

export default (store) => {

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      <Route path="about" component={About}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
