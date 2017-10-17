
import React from 'react';

const Loader = function(props){
  return (
      <div className="loading">
        <span className="hidden">Loading {props.alt}</span>
      </div>
    );
};
export default Loader;
