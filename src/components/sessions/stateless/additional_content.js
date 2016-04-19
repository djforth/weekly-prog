const React = require('react');

const timeChecker = require('../../../utils/time_checker')
    , formatter   = require('../../../utils/formatter');

// Components
let Time     = require('./time')
  , RichText = require('./richtext');

module.exports = function(props){
  let col, getVal, item, value;
  item   = props.item;
  col    = props.col;
  getVal = formatter(item);
  value  = getVal(col);

  if (col.type === 'time'){
    return (<Time
      cols = {col}
      checker = {timeChecker(item, col)}
      time = {value}
      cancelled = {item.has('cancelled')}
      />);
  }

  return <RichText content={value} />;
};
