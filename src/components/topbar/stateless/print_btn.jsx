import React from 'react';

const printStyles = {
  fill: 'none'
  , stroke: '#585858'
  , strokeWidth: 1.5
  , strokeLinecap: 'round'
  , strokeLinejoin: 'round'
  , strokeMiterlimit: 10
};

export default ({url})=>{
  return (
    <a href={url} target="_blank" className="svg-print" rel="nofollow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <title>Print Program</title>
        <g id="icons">
          <path style={printStyles} d="M6.4.7h12.2v4.5H6.4V.7zm0 17.8h-4V5.1h20.3v13.4h-4.1"/>
          <path style={printStyles} d="M6.4 15.2h12.2v8.9H6.4v-8.9zm-2 0h16.2M8.5 20.8h8.1m-8.1-2.3h8.1"/>
          <ellipse style={printStyles} cx="19" cy="10.7" rx="1" ry="1.1"/>
        </g>
      </svg>
    </a>
  );
};
