/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import classNames from 'classnames';

export default function DeviceNameInputView(props) {
  const helpText = props.validName ? null :
    <span id="nameHelp" className="help-block">Device name cannot be empty</span>;

  return (
    <div className={classNames(
      "form-group",
      {
        "has-success": props.validName,
        "has-error": !props.validName,
      })}>
      <label className="control-label" htmlFor="nameInput">Name</label>
      <input id="nameInput"
             className="form-control"
             type="text"
             placeholder="Enter the name for your device"
             aria-describedby="nameHelp"
             onChange={props.onUpdateName} />
      {helpText}
    </div>
  );
}
