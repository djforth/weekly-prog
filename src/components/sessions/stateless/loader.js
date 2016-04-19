const React = require('react');

module.exports = function(props){
  return (
      <div className="loading">
        <span className="hidden">Loading {props.alt}</span>
      </div>
    );
};
