 import React from 'react';

 import timeChecker from '../../../utils/time_checker';
 import formatter from '../../../utils/formatter';

// Components
 import Time from './time';
 import RichText from './richtext';

const AdditionalContent = (props)=>{
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

export default AdditionalContent;
