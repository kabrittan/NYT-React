import React from 'react';

const Article = props => (
  <div className={`border rounded bg-white p-3 ${props.fade}`}>
    <a href={props.href} target="_blank">
      <h3>{props.headline}</h3>
    </a>
    <p>{props.snippet}</p>
    <p>{props.date}</p>
    {props.children}
  </div>
);

export default Article;