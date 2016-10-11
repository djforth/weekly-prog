'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    Moment = require('moment');

var SessionsStore = require('../../stores/sessions_store');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins;
var textMixins = require('morse-react-mixins').text_mixins;

var Calendar = require('./calendar'),
    PrintBtn = require('./stateless/print_btn');

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

module.exports = TopBar;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(cssMixins, 'cssMixins', 'src/components/topbar/top_bar.js');

  __REACT_HOT_LOADER__.register(textMixins, 'textMixins', 'src/components/topbar/top_bar.js');

  __REACT_HOT_LOADER__.register(TopBar, 'TopBar', 'src/components/topbar/top_bar.js');
}();

;