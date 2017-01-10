/**
 * Collects all of the actions for subsystems in this application
 * and exports them together.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import DeviceActions from './DeviceActions';

const Actions = [
    DeviceActions,
];

const flatten = (o) => Object.keys(o).reduce((a, b) => {
    console.log(a);
    console.log(b);
});

export default flatten(Actions);
