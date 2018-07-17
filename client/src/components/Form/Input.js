import React from 'react';

export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.name}>{props.label}</label>
    <input
      id={props.name}
      className="form-control"
      onChange={props.onChange}
      type={props.type}
      name={props.name}
      value={props.value}
    />
  </div>
);