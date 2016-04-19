const React = require('react');

module.exports = function(props){
  let title = `The session between ${props.time} is cancelled`;
  return (<span title={title}>Cancelled</span>);
};
