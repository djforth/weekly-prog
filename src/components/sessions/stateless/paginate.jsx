import React from 'react';

const Paginate = function(props){
  return (
    <div className={props.css}>
      <a href="#" onClick={props.onClick} className="button button-pagination">
        Load More
      </a>
    </div>
  );
};

export default  Paginate;
