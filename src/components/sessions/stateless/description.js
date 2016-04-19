const React = require('react');
var RichText = require('./richtext');

module.exports = function(props){
  return (
    <div className="description">
      <RichText content={props.content} />
    </div>
  );
};
