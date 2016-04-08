
const React = require('react')

module.exports = function(props){
  return (
    <div className={props.css}>
      {props.title}
    </div>
  );
}