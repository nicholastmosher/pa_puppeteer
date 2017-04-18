/**
 * Defines actions that can be performed on the system state with
 * regards to module data.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { ModuleActionTypes } from '../constants/ModuleActionTypes';
import { modules } from '../data/Presets';

const ModuleReducer = (state = modules, action) => {
  switch(action.type) {

    case ModuleActionTypes.UPDATE_MODULES:
      return state;

    default:
      return state;
  }
};

export default ModuleReducer;
