import _ from 'lodash';
import React from 'react';

function createMarkup(content){
  return {__html: content};
}

export default function(props){
  if (_.isString(props.content) && props.content.match(/<|>/g)){
    return (<div dangerouslySetInnerHTML={ createMarkup(props.content) } />);
  }

  return <span>{props.content}</span>;
};
