import _ from 'lodash';
import React from 'react';
import timeChecker from '../../../utils/time_checker';

function setCss(item, col){
  if (!_.has(col, 'wrapper')) return '';

  if (!col.type === 'time' || _.isUndefined(col.concat)) return col.wrapper;

  let checker = timeChecker(item, col);
  return `${col.wrapper} ${checker.setNowOrPast('now', 'old-session')}`;
}

 const Wrapper = function(props){
  let css = setCss(props.item, props.col);
  return (
    <div className={css}>
      {props.children}
    </div>
  );
};

export default Wrapper;
