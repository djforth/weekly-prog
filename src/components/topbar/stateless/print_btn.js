
const React = require('react')

module.exports = function(props){
   return (
    <a href={props.url} target='_blank' className='print-prog'>
      <i className='print-prog-icon'></i>
      <span className='hidden'>Print</span>
    </a>
  );
}


