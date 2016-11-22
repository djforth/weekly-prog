'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _I18n_helper = require('@djforth/I18n_helper');

var _I18n_helper2 = _interopRequireDefault(_I18n_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wp = (0, _I18n_helper2.default)('javascript')('weekly_programme');

var _default = function _default(item) {
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

exports.default = _default;
;
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(wp, 'wp', 'src/helpers/buttons_helper.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/helpers/buttons_helper.js');
}();

;