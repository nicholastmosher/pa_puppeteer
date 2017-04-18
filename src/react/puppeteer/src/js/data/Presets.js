/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import { fromJS, Map } from 'immutable';
import { Device, Sink, Module } from './Records';

export const devices = fromJS({
  activeDevice: '0',
  devices: {
    '0': Device({
      id: '0',
      name: "Thinkpad",
      description: "My thinkpad laptop",
      host: "http://127.0.0.1:5000",
    }),
    '1': Device({
      id: '1',
      name: "Obsidyn",
      description: "The shiny original laptop",
      host: "http://localhost:5000",
    })
  },
});

export const sinks = fromJS({
  sinks: {
    '0': Sink({
      id: '0',
      name: "Sink One",
      description: "Sink one!",
      device: '0',
      status: "RUNNING",
    }),
    '1': Sink({
      id: 1,
      name: "Sink Two",
      description: "Sink two!",
      device: '0',
      status: "SUSPENDED",
    }),
    '2': Sink({
      id: '2',
      name: "Sink Three",
      description: "Sink Three!",
      device: '1',
      status: "SUSPENDED",
    }),
    '3': Sink({
      id: '3',
      name: "Sink Four",
      description: "Sink Four!",
      device: '1',
      status: "SUSPENDED",
    }),
  },
});

export const modules = fromJS({
  modules: {
    '0': Module({
      id: '0',
      name: "Module One",
      device: '0',
      args: Map({
        arg0: "arg0",
        arg1: "arg1",
      }),
    }),
  },
});
