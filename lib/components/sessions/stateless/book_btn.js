'use strict';

var React = require('react'),
    _ = require('lodash/core');

function checkBook(url) {
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places) {
  return _.isNumber(places) && places === 0;
}

module.exports = function (_ref) {
  var instruction = _ref.instruction;
  var link = _ref.link;
  var places = _ref.places;
  var title = _ref.title;

  if (instruction) {
    return React.createElement(
      'span',
      { className: 'session-full' },
      instruction
    );
  }

  if (checkPlaces(places)) {
    return React.createElement(
      'span',
      { className: 'session-full' },
      'Session full'
    );
  }

  if (checkBook(link)) {
    return React.createElement(
      'a',
      { className: 'button button-secondary', href: link },
      title
    );
  }

  return React.createElement(
    'span',
    { className: 'session-full' },
    'No booking required'
  );
};
//# sourceMappingURL=book_btn.js.map