
import React from 'react';

import RichText from './richtext';

 const Description = (props)=>{
  return (
    <div className="description">
      <RichText content={props.content} />
    </div>
  );
};

export default Description;
