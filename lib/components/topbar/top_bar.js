var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Moment from 'moment';
import SessionsStore from '../../stores/sessions_store';

// Mixins
import { css_mixins as cssMixins } from 'morse-react-mixins';
import { text_mixins as textMixins } from 'morse-react-mixins';

import Calendar from './calendar';

import PrintBtn from './stateless/print_btn';

var TopBar = function (_React$Component) {
  _inherits(TopBar, _React$Component);

  function TopBar(props) {
    _classCallCheck(this, TopBar);

    var _this = _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this, props));

    _this.state = { current: Moment() };
    return _this;
  }

  _createClass(TopBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      SessionsStore.addChangeListener('changing_date', this._changeDate.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener('changing_date', this._changeDate);
    }
  }, {
    key: '_changeDate',
    value: function _changeDate() {
      var date = SessionsStore._getCurrentDate();
      this.setState({ current: Moment(date) });
    }
  }, {
    key: '_setUrl',
    value: function _setUrl() {
      var date_str = this.state.current.format('YYYY/MM/DD');
      return this.props.print.replace(':date', date_str);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'clearfix calendar-bar' },
        React.createElement(Calendar, {
          device: this.props.device,
          current: this.state.current
        }),
        React.createElement(PrintBtn, {
          print: this.props.print,
          url: this._setUrl()
        })
      );
    }
  }]);

  return TopBar;
}(React.Component);

Object.assign(TopBar.prototype, cssMixins);
Object.assign(TopBar.prototype, textMixins);

export default TopBar;
//# sourceMappingURL=top_bar.js.map