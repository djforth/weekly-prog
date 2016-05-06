'use strict';

var React = require('react'),
    _ = require('lodash/core');

function checkBook(url) {
  console.log(!_.isEmpty(url) && url !== '#');
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places) {
  return _.isNumber(places) && places === 0;
}

module.exports = function (props) {
  if (checkPlaces(props.places)) {
    return React.createElement(
      'span',
      { className: 'session-full' },
      'Session full'
    );
  }

  if (checkBook(props.link)) {

    return React.createElement(
      'a',
      { className: 'button button-secondary', href: props.link },
      'Book'
    );
  }

  return React.createElement(
    'span',
    { className: 'session-full' },
    'No booking required'
  );
};