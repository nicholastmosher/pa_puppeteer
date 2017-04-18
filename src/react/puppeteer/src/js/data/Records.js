/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { Record, Map } from 'immutable';

export const Device = new Record({
  name: '',
  id: undefined,
  description: '',
  host: '',
});

export const Sink = new Record({
  name: '',
  id: undefined,
  description: '',
  device: undefined,
  status: '',
});

export const Module = new Record({
  name: '',
  id: undefined,
  device: undefined,
  args: Map( ),
});
