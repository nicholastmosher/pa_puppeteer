/**
 * @author Nick Mosher <nicholastmosher@gmail.com>
 */
import React from 'react';

/**
 * Renders a list of items given by props.items.
 * @param props Contains an 'items' map to render in this list.
 */
const ListView = (props) => (
  <ul className="list-group">
    {props.items}
  </ul>
);

export default ListView;
