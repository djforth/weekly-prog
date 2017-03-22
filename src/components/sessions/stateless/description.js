
import React from 'react';

import RichText from './richtext';

export default function(props){
  return (
    <div className="description">
      <RichText content={props.content} />
    </div>
  );
};
