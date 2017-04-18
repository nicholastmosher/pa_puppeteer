/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';
import classNames from 'classnames';

export default function HostnameInputView(props) {
  const helpText = props.validHost ? null :
    <span id="helpHost" className="help-block">Invalid hostname</span>;
  return (
    <div className={classNames(
      "form-group",
      {
          "has-success": props.validHost,
          "has-error": !props.validHost,
      }
    )}>
      <label className="control-label" htmlFor="hostInput">Host</label>
      <input id="hostInput"
             className="form-control"
             type="text"
             placeholder="Enter the IP address or hostname of your device. http(s)://"
             aria-describedby="hostHelp"
             onChange={props.onUpdateHost} />
      {helpText}
    </div>
  );
}
