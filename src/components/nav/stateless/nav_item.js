
import React from 'react';


import DayDisplay from './day_display';

export default function(props){
  let item = props.nav_item;
  return (
    <li role="presentation" className={`date-nav-item ${props.active}`}>
      <a href      = "#"
         title     = {item.alt}
         onClick   = {props.onClick}
         className = "date-nav-item-link"
        >
          <DayDisplay
            device = {props.device}
            date   = {item.fmt}
          />
        </a>
    </li>
  );
};
