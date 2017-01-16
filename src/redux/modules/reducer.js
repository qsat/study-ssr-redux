import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as form} from 'redux-form';
import counter from './counter';

export default combineReducers({
  routing: routerReducer, counter, form
});
