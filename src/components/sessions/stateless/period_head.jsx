import React from 'react';

 const PeriodHead = function(props){
  return (
    <header className="section-header">
      <h1 className="gg beta secondary">{props.title}</h1>
    </header>
  );
};

export default PeriodHead;