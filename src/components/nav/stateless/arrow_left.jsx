import React from 'react';

const arrowStyles = {
  fill: 'none'
  , stroke: '#cfcfcf'
  , strokeWidth: 2
  , strokeLinecap: 'round'
  , strokeLinejoin: 'round'
  , strokeMiterlimit: 10
};

export default ({onClick})=>{
  return (<a href="#"
    className="nav-mover move-left"
    onClick={onClick}
      >
      <div className="svg-arrow">
        <svg viewBox="0 0 15 25" xmlns="http://www.w3.org/2000/svg">
          <title>Left</title>
          <path style={arrowStyles} d="M13.6 1.7L1.5 11.9c4.1 3.6 8.2 7.1 12.2 10.7"/>
        </svg>
      </div>
  </a>);
};
