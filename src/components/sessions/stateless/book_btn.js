const React = require('react')
    , _     = require('lodash/core');

function checkBook(url){
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places){
  return _.isNumber(places) && places === 0;
}

module.exports = function({instruction, link, places, title}){
  if(instruction){
    return (<span className="session-full">{instruction}</span>);
  }

  if (checkPlaces(places)){
    return (<span className="session-full">Session full</span>);
  }

  if (checkBook(link)){
    return (<a className="button button-secondary" href={link}>{title}</a>);
  }

  return (<span className="session-full">No booking required</span>);
};
