const _     = require('lodash/core')
     , React = require('react')
     , timeChecker = require('../../../utils/time_checker');

function setCss(item, col){
  if (!_.has(col, 'wrapper')) return '';

  if (!col.type === 'time' || _.isUndefined(col.concat)) return col.wrapper;

  let checker = timeChecker(item, col);
  return `${col.wrapper} ${checker.setNowOrPast('now', 'old-session')}`;
}

module.exports = function(props){
  let css = setCss(props.item, props.col)
    return (
      <div className={css}>
        {props.children}
      </div>
    );
};