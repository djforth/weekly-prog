
import React from 'react';
import TodayDisplay from './today_display';

export default  function(props){
  let css, item;
  item = props.nav_item;
  css  = `date-nav-item today-nav ${props.active}`;
  return (
    <div role="presentation" className={css}>
      <a href      = "#"
         title     = {item.alt}
         onClick   = {props.onClick}
         className = "date-nav-item-link"
        >
          <TodayDisplay
            device = {props.device}
            date   = {item.fmt}
          />
        </a>
    </div>
  );
};
