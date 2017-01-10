/**
 * Defines actions that can be performed on the system state with
 * regards to device data.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { Map, OrderedMap, List } from 'immutable';
import { DeviceActions } from '../constants/ActionTypes';

let initialState = OrderedMap({
    devices: List([
        Map({
            name: "Device#1",
            id: 0,
            description: "Device one!",
            host: "device1.host",
            sinks: List([
                Map({
                    name: "Sink#1",
                    id: 0,
                    description: "Sink one!",
                    status: "RUNNING",
                }),
                Map({
                    name: "Sink#2",
                    id: 1,
                    description: "Sink two!",
                    status: "SUSPENDED",
                })
            ]),
            modules: List([
                Map({
                    name: "Module#1",
                    id: 0,
                    args: Map({
                        arg0: "arg0",
                        arg1: "arg1",
                    })
                })
            ])
        }),
        Map({
            name: "Device#2",
            id: 1,
            description: "Device two!",
            host: "device2.host",
            sinks: List(),
            modules: List(),
        })
    ]),
    activeDevice: 0,
});

/**
 * Identifies the next ID available to use when creating a new Device.
 *
 * @param state The state tree, used to find existing device IDs.
 * @returns {number}
 */
const nextDeviceId = (state) => {
    let ids = [];
    state.devices.forEach(device => {
        ids.push(device.get('id'));
    });
    let i = 0;
    while(ids.contains(i)) i++;
    return i;
};

const deviceIndex = (state, id) => state.devices.findIndex(d => d.get('id') === id);

export default function deviceReducer (state = initialState, action) {
    switch(action.type) {
        case DeviceActions.ADD_DEVICE:
            // Check that we have the appropriate parameters in the action.
            if(!action.name || !action.desc || !action.host) {
                return state;
            }
            return state.get('devices').push(Map({
                id: nextDeviceId(state),
                name: action.name,
                description: action.desc,
                host: action.host,
                sinks: List(),
                modules: List(),
            }));
        case DeviceActions.SET_ACTIVE:
            return state.set('activeDevice', action.id);
        case DeviceActions.MODIFY_DEVICE:
            if(!action.name || !action.host) {
                return state;
            }
            // Find the existing device and overwrite it.
            return state.devices.update(deviceIndex(state, action.id), (device) =>
                device.set('name', action.name)
                      .set('description', action.desc)
                      .set('host', action.host)
            );
        case DeviceActions.UPDATE_DEVICE:
            return state.devices.update(deviceIndex(state, action.id), (device) =>
                device.set('sinks', action.sinks)
                      .set('modules', action.modules)
            );
        case DeviceActions.DELETE_DEVICE:
            break;
        default:
            return state;
    }
}
