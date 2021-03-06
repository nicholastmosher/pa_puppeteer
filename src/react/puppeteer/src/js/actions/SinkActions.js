/**
 * Defines action objects for Sink actions.
 *
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import $ from 'jquery';
import { fromJS } from 'immutable';
import { SinkActionTypes } from '../constants/SinkActionTypes';

export const updateSinks = (sinks) => ({type: SinkActionTypes.UPDATE_MODULES, modules});

export const querySinks = device => dispatch => {
  $.ajax({
    url: device.host + '/v1/sinks',
    method: 'GET',
    accepts: 'application/json',
    contentType: 'application/json',
    beforeSend: xhr => xhr.setRequestHeader('Authorization', 'Basic ' + btoa('nick:something')),
    error: jqXHR => console.log('Ajax module error: ' + jqXHR.status),
  }).done(data => {
    dispatch(updateSinks(fromJS(data['sinks'])));
  });
};
