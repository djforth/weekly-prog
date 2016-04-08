const React = require('react');

const timeChecker = require('../../../utils/time_checker')
    , formatter   = require('../../../utils/formatter');


const Cancelled = require('./cancelled');

function titleCreator(checker, time){
  return checker.setNowOrPast('This session has started', 'This session has finished', `This sessions runs between ${time}`);
}

module.exports = function(props){

  if (props.cancelled){
    <Cancelled time={props.time} />
  }

  return (<span title={titleCreator(props.checker, props.time)}>{props.time}</span>);
}