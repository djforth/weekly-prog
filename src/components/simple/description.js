const React = require('react');
const RichText = require('./richtext');

module.exports = function(props){
  return (
    <div className="description">
      <RichText content={props.content} />
    </div>
  )
}
