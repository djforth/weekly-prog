var React, TodayDisplay;
React        = require('react');
TodayDisplay = require('./today_display');

module.exports = function(props){
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
