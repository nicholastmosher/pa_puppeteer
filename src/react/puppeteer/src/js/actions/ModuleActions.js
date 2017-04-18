/**
 * Defines action objects for Module actions.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import $ from 'jquery';
import { fromJS } from 'immutable';
import { ModuleActionTypes } from '../constants/ModuleActionTypes';

export const updateModules = (modules) => ({type: ModuleActionTypes.UPDATE_MODULES, modules});

export const queryModules = device => dispatch => {
  $.ajax({
    url: device.host + '/v1/modules',
    method: 'GET',
    accepts: 'application/json',
    contentType: 'application/json',
    beforeSend: xhr => xhr.setRequestHeader('Authorization', 'Basic ' + btoa('nick:something')),
    error: jqXHR => console.log('Ajax module error: ' + jqXHR.status),
  }).done(data => {
    dispatch(updateModules(fromJS(data['modules'])));
  });
};
