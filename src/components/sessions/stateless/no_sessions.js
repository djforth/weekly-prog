const React = require('react')

module.exports = function(props){
  return (
    <div className='cols-lg-12' key={`${props.title.toLowerCase()}-nosessions`}>
      <h5 className='no-sessions'>{props.no_sessions || 'There are no sessions this'} {props.title}</h5>
  </div>);
}