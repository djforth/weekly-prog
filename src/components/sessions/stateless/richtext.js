const _     = require('lodash/core')
    , React = require('react');

function createMarkup(content) {
  return {__html: content};
};

module.exports = function(props){

  if (_.isString(props.content) && props.content.match(/<|>/g)){
    return (<div dangerouslySetInnerHTML={ createMarkup(props.content) } />);
  }

  return <span>{props.content}</span>;
}