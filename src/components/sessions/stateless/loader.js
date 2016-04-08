const React = require('react')
    , _     = require('lodash/core');

module.exports = function(props){
  return(
      <div className='loading'>
        <span className='hidden'>Loading {props.alt}</span>
      </div>
    );
}