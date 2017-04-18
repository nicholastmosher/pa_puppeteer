/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import classNames from 'classnames';

export default function DeviceDescInputView(props) {
  const helpText = !props.validDesc ? null :
    <span id="descHelp" className="help-block">A description is not required, but recommended</span>;
  return (
    <div className={classNames(
      "form-group",
      {
        "has-warning": props.validDesc,
      })}>
      <label className="control-label" htmlFor="descInput">Description</label>
      <input id="descInput"
             className="form-control"
             type="text"
             placeholder="Enter a short description of your device"
             aria-describedby="descHelp"
             onChange={props.onUpdateDesc} />
      {helpText}
    </div>
  );
}
