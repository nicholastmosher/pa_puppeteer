/**
 * Defines actions that can be performed on the system state with
 * regards to device data.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { List } from 'immutable';
import { devices } from '../data/Presets';
import { Device } from '../data/Records';
import { DeviceActionTypes } from '../constants/DeviceActionTypes';

/**
 * Identifies the next ID available to use when creating a new Device.
 *
 * @param state The state tree, used to find existing device IDs.
 * @returns {number}
 */
const nextDeviceId = (state) => {
  let ids = [];
  state.get('devices').forEach(device => {
    ids.push(device.get('id'));
  });
  let i = 0;
  while(ids.includes(i)) i++;
  return i;
};

/**
 * Finds the list index within the state that the device with the given
 * id is stored at.
 *
 * @param state The state tree of the system.
 * @param id The id of the device to find.
 */
const deviceIndex = (state, id) => state.get('devices').findIndex(d => d.get('id') === id);

const DeviceReducer  = (state = devices, action) => {
  switch(action.type) {
    case DeviceActionTypes.ADD_DEVICE:
      // Check that we have the appropriate parameters in the action.
      if(!action.name || !action.host) {
        return state;
      }

      return state.set('devices', state.get('devices').push(
        Device({
          name: action.name,
          id: nextDeviceId(state),
          description: action.desc,
          host: action.host,
          sinks: List(),
          modules: List(),
        }),
      ));

    case DeviceActionTypes.SET_ACTIVE:
      return state.set('activeDevice', action.id);

    case DeviceActionTypes.MODIFY_DEVICE:
      // Devices must always have a name and a host.
      if(!action.name || !action.host) {
        return state;
      }
      // Find the existing device and overwrite it.
      return state.set('devices', state.get('devices').update(
        deviceIndex(state, action.id), (device) =>
        device.set('name', action.name)
              .set('description', action.desc)
              .set('host', action.host)
      ));

    case DeviceActionTypes.UPDATE_DEVICE:
      return state.set('devices', state.get('devices').update(
        deviceIndex(state, action.id), (device) => {
          device.set('sinks', action.sinks.get('sinks'))
                .set('modules', action.modules.get('modules'))
        }));

    case DeviceActionTypes.DELETE_DEVICE:
      // Find the existing device and delete it.
      return state.set('devices', state.devices.remove(
        deviceIndex(state, action.id))
      );

    default:
      return state;
  }
};

export default DeviceReducer;
