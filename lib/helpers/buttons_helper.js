(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@morsedigital/i18n_helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@morsedigital/i18n_helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.i18n_helper);
    global.buttons_helper = mod.exports;
  }
})(this, function (module, exports, _i18n_helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (item) {
    var no_link = { link: null, title: null, instruction: null };
    if (item.has('booking_instruction')) {
      return Object.assign(no_link, {
        instruction: item.get('booking_instruction')
      });
    }

    if (item.hasIn(['buttons', 'buy'])) {
      return Object.assign(no_link, {
        title: wp('additional.buy'),
        link: item.getIn(['buttons', 'buy'])
      });
    }

    if (item.hasIn(['buttons', 'book'])) {
      return Object.assign(no_link, {
        title: wp('additional.book'),
        link: item.getIn(['buttons', 'book'])
      });
    }

    return no_link;
  };

  var _i18n_helper2 = _interopRequireDefault(_i18n_helper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var wp = (0, _i18n_helper2.default)('javascript')('weekly_programme');

  ;
  module.exports = exports['default'];
});