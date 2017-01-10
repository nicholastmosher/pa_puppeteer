/**
 * Defines families of actions that can be performed on the system
 * state. Families are divisions of actions on related data that
 * can be imported individually.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */

/**
 * Actions that can be performed on Device data.
 * @type {{ADD_DEVICE: string, UPDATE_DEVICE: string, DELETE_DEVICE: string}}
 */
export const DeviceActions = {
    ADD_DEVICE: 'ADD_DEVICE',
    SET_ACTIVE: 'SET_ACTIVE',
    MODIFY_DEVICE: 'MODIFY_DEVICE',
    UPDATE_SINKS: 'UPDATE_SINKS',
    UPDATE_MODULES: 'UPDATE_MODULES',
    DELETE_DEVICE: 'DELETE_DEVICE',
};

/**
 * A list of all action families, which describe related actions.
 * @type {[*]}
 */
export default [
    DeviceActions,
];
