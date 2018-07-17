import React from 'react';

const ColumnOffset = props => (
  <div className="p-3 col-12 col-md-10 offset-md-1">{props.children}</div>
);

export default ColumnOffset;