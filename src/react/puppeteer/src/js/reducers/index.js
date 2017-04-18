/**
 * The root reducer for this web application. Here we use a combineReducer
 * to combine individual reducers in this directory. We create individual
 * and specialized reducers to increase cohesion, then merge them here
 * since they all operate on the same application state. Containers should
 * import and use this as their reducer.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import DeviceReducer from './DeviceReducer';

const rootReducer = combineReducers({
  DeviceReducer,
  routing,
});

export default rootReducer;
