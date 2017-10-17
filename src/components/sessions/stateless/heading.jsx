import React from 'react';

const Heading = function(props){
  return (
    <div className={props.css}>
      {props.title}
    </div>
  );
};

export default Heading;
