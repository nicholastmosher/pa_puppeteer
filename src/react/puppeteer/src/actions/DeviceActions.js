/**
 * Defines action objects for Device Actions.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { DeviceActions } from '../constants/ActionTypes';

export const addDevice = (name, desc, host) => ({type: DeviceActions.ADD_DEVICE, name, desc, host});
export const setActive = (id) => ({type: DeviceActions.SET_ACTIVE, id });
export const modifyDevice = (id, name, desc, host) => ({type: DeviceActions.MODIFY_DEVICE, id, name, desc, host});
export const updateSinks = (id, sinks) => ({type: DeviceActions.UPDATE_SINKS, id, sinks});
export const updateModules = (id, modules) => ({type: DeviceActions.UPDATE_MODULES, id, modules});
export const deleteDevice = (id) => ({type: DeviceActions.DELETE_DEVICE, id});

export default {
    addDevice,
    setActive,
    modifyDevice,
    updateSinks,
    updateModules,
    deleteDevice,
};
