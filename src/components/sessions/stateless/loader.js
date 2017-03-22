
import React from 'react';

export default function(props){
  return (
      <div className="loading">
        <span className="hidden">Loading {props.alt}</span>
      </div>
    );
};
