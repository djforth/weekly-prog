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
    className="nav-mover move-right svg-arrow-right"
    onClick={onClick}>
    <div className="svg-arrow">
      <svg viewBox="0 0 15 25" xmlns="http://www.w3.org/2000/svg">
        <path style={arrowStyles} d="M1.8 23.2L13.9 13C9.9 9.4 5.8 5.8 1.8 2.2"/>
      </svg>
    </div>
  </a>);
};
