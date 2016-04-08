const React = require('react')

module.exports = function(props){
  return (
    <div className={props.css}>
      <a href='#' onClick={props.onClick} className='button button-pagination'>Load More</a>
    </div>
  );
}