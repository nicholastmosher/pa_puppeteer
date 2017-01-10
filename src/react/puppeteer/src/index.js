import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers/index';
import DashboardContainer from './containers/DashboardContainer';

let store = createStore(Reducer);

render(
    <Provider store={store}>
        <DashboardContainer />
    </Provider>,
    document.getElementById('root')
);

console.log('Completed root index.js');
