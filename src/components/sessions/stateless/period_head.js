const React = require('react')

module.exports = function(props){
  return (
    <header className='section-header'>
      <h1 className='gg beta secondary'>{props.title}</h1>
    </header>
  );
}