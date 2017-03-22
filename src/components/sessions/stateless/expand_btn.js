
import React from 'react';

export default function(props){
  return (
      <div className={props.css}>
        <a href="#"
          onClick={props.expand}
          className="icon icon-information"
          title={props.text} >
          <span className="hidden">{props.text}</span>
        </a>
      </div>
    );
};
