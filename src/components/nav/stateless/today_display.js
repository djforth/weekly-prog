const React = require('react');

module.exports = function(props){
  let fmt = props.date
  if (props.device === 'mobile'){
    return (
      <span>
        <span className='nav-date'>{fmt.format('DD')}</span>
        <span className='nav-day'>Today</span>
      </span>
    );
  } else {
    return <span>{`Today ${fmt.format('Do')}`}</span>;
  }
}