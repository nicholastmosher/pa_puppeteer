/**
 * Defines actions that can be performed on the system state with
 * regards to device data.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { OrderedMap, List } from 'immutable';
import { DeviceActions } from '../constants/ActionTypes';

let initialState = OrderedMap({
    devices: List([
        OrderedMap({
            name: "Thinkpad",
            id: 0,
            description: "My thinkpad laptop",
            host: "http://127.0.0.1:5000",
            sinks: List([
                OrderedMap({
                    name: "Sink One",
                    id: 0,
                    description: "Sink one!",
                    status: "RUNNING",
                }),
                OrderedMap({
                    name: "Sink Two",
                    id: 1,
                    description: "Sink two!",
                    status: "SUSPENDED",
                })
            ]),
            modules: List([
                OrderedMap({
                    name: "Module One",
                    id: 0,
                    args: OrderedMap({
                        arg0: "arg0",
                        arg1: "arg1",
                    })
                })
            ])
        }),
        OrderedMap({
            name: "Obsidyn",
            id: 1,
            description: "The shiny original laptop",
            host: "http://localhost:5000",
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

export default function deviceReducer (state = initialState, action) {
    switch(action.type) {
        case DeviceActions.ADD_DEVICE:
            // Check that we have the appropriate parameters in the action.
            if(!action.name || !action.host) {
                return state;
            }

            return state.set('devices', state.get('devices').push(OrderedMap({
                name: action.name,
                id: nextDeviceId(state),
                description: action.desc,
                host: action.host,
                sinks: List(),
                modules: List(),
            })));

        case DeviceActions.SET_ACTIVE:
            return state.set('activeDevice', action.id);

        case DeviceActions.MODIFY_DEVICE:
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

        case DeviceActions.UPDATE_DEVICE:
            return state.set('devices', state.get('devices').update(
                deviceIndex(state, action.id), (device) => {
                    device.set('sinks', action.sinks.get('sinks'))
                          .set('modules', action.modules.get('modules'))
                }));

        case DeviceActions.UPDATE_SINKS:
            return state.set('devices', state.get('devices').update(
                deviceIndex(state, action.id), (device) => device.set('sinks', action.sinks)
            ));

        case DeviceActions.UPDATE_MODULES:
            return state.set('devices', state.get('devices').update(
                deviceIndex(state, action.id), (device) => device.set('modules', action.modules)
            ));

        case DeviceActions.DELETE_DEVICE:
            // Find the existing device and delete it.
            return state.set('devices', state.devices.remove(
                deviceIndex(state, action.id))
            );

        default:
            return state;
    }
}
