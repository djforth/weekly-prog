const React = require('react');
const TodayDisplay = require('./today_display')

module.exports = function(props){
  let item = props.nav_item
  return (
    <div role='presentation' className={`date-nav-item today-nav ${props.active}`}>
      <a href      = '#'
         title     = {item.alt}
         onClick   = {props.onClick}
         className = 'date-nav-item-link'
        >
          <TodayDisplay
            device = {props.device}
            date   = {item.fmt}
          />
        </a>
    </div>
  );
}