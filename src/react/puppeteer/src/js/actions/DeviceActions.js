/**
 * Defines action objects for Device Actions.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { DeviceActionTypes } from '../constants/DeviceActionTypes';

export const addDevice =     (name, desc, host) =>     ({type: DeviceActionTypes.ADD_DEVICE,     name, desc, host});
export const selectDevice =  (id) =>                   ({type: DeviceActionTypes.SELECT_DEVICE,  id });
export const modifyDevice =  (id, name, desc, host) => ({type: DeviceActionTypes.MODIFY_DEVICE,  id, name, desc, host});
export const deleteDevice =  (id) =>                   ({type: DeviceActionTypes.DELETE_DEVICE,  id});
