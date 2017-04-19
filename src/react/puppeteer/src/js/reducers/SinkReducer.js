/**
 * Defines actions that can be performed on the system state with
 * regards to sink data.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { SinkActionTypes } from '../constants/SinkActionTypes';
import { sinks } from '../data/Presets';

const SinkReducer = (state = sinks, action) => {
  switch(action.type) {

    case SinkActionTypes.UPDATE_SINKS:
      return state;

    default:
      return state;
  }
};

export default SinkReducer;
