import React from 'react';

const circleStyles = {
  'stroke': '#e14e00'
  , 'stroke-width': '2px'
  , 'fill': 'transparent'
};

const lineStyles = {
  'stroke': '#e14e00'
  , 'stroke-width': '2px'
};

const ellipseStyles = {
  "fill": '#e14e00'
  , 'stroke': '#e14e00'
  , 'stroke-width': '2px'
};

const ExpandBtn = function(props){
  return (
      <div className={props.css}>
        <a href="#"
          onClick={props.expand}
          className="svg-information"
          title={props.text} >
          <svg id="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="35" height="35">
            <title>{props.text}</title>
            <circle style={circleStyles} cx="21" cy="21" r="20"/>
            <line style={lineStyles} x1="21" y1="17.4" x2="21" y2="31.2"/>
            <ellipse style={ellipseStyles} cx="21" cy="11.2" rx="0.6" ry="0.4"/>
          </svg>
        </a>
      </div>
    );
};

export default ExpandBtn;
