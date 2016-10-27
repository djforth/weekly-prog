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
      { className: 'button button-primary', href: link },
      title
    );
  }

  return React.createElement(
    'span',
    { className: 'session-full' },
    'No booking required'
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(checkBook, 'checkBook', 'src/components/sessions/stateless/book_btn.js');

  __REACT_HOT_LOADER__.register(checkPlaces, 'checkPlaces', 'src/components/sessions/stateless/book_btn.js');
}();

;