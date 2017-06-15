(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isNumber', 'lodash/isEmpty', 'react', '@morsedigital/i18n_helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isNumber'), require('lodash/isEmpty'), require('react'), require('@morsedigital/i18n_helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isNumber, global.isEmpty, global.react, global.i18n_helper);
    global.book_btn = mod.exports;
  }
})(this, function (exports, _isNumber2, _isEmpty2, _react, _i18n_helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (_ref) {
    var instruction = _ref.instruction,
        link = _ref.link,
        places = _ref.places,
        title = _ref.title;

    if (instruction) {
      return _react2.default.createElement(
        'span',
        { className: 'session-full' },
        instruction
      );
    }

    if (checkPlaces(places)) {
      return _react2.default.createElement(
        'span',
        { className: 'session-full' },
        wp('additional.session_full')
      );
    }

    if (checkBook(link)) {
      return _react2.default.createElement(
        'a',
        { className: 'button button-primary', href: link },
        title
      );
    }

    return _react2.default.createElement(
      'span',
      { className: 'session-full' },
      wp('additional.no_booking')
    );
  };

  var _isNumber3 = _interopRequireDefault(_isNumber2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _react2 = _interopRequireDefault(_react);

  var _i18n_helper2 = _interopRequireDefault(_i18n_helper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var wp = (0, _i18n_helper2.default)('javascript')('weekly_programme');

  function checkBook(url) {
    return !(0, _isEmpty3.default)(url) && url !== '#';
  }

  function checkPlaces(places) {
    return (0, _isNumber3.default)(places) && places === 0;
  }

  ;
});