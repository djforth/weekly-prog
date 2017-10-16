
import React from 'react';

export default function(props){
  let key, nosession;
  key = `${props.title.toLowerCase()}-nosessions`;
  nosession = props.no_sessions || 'There are no sessions this';
  return (
    <div className="cols-lg-12" key={key}>
      <h5 className="no-sessions">{nosession} {props.title}</h5>
  </div>);
};
