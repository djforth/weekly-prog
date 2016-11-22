'use strict';

var _I18n_helper = require('@djforth/I18n_helper');

var _I18n_helper2 = _interopRequireDefault(_I18n_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react'),
    _ = require('lodash/core');

var wp = (0, _I18n_helper2.default)('javascript')('weekly_programme');

function checkBook(url) {
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places) {
  return _.isNumber(places) && places === 0;
}

module.exports = function (_ref) {
  var instruction = _ref.instruction,
      link = _ref.link,
      places = _ref.places,
      title = _ref.title;

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
      wp('additional.session_full')
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
    wp('additional.no_booking')
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(wp, 'wp', 'src/components/sessions/stateless/book_btn.js');

  __REACT_HOT_LOADER__.register(checkBook, 'checkBook', 'src/components/sessions/stateless/book_btn.js');

  __REACT_HOT_LOADER__.register(checkPlaces, 'checkPlaces', 'src/components/sessions/stateless/book_btn.js');
}();

;