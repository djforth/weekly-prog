'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react');
var _ = require('lodash/core');
_.includes = require('lodash/includes');
_.reject = require('lodash/reject');

// Flux
var ColumnsStore = require('../../stores/columns_store');

// Components
var Additional = require('./additional'),
    DataItem = require('./data_item');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins;
var textMixins = require('morse-react-mixins').text_mixins;

var DataExpanderItem = function (_React$Component) {
  _inherits(DataExpanderItem, _React$Component);

  function DataExpanderItem(props) {
    _classCallCheck(this, DataExpanderItem);

    var _this = _possibleConstructorReturn(this, (DataExpanderItem.__proto__ || Object.getPrototypeOf(DataExpanderItem)).call(this, props));

    _this.active = [{ active: false }];
    _this.info = ['list-group', 'collapse', { in: false }];
    _this.state = {
      info: _this.getClasses(_this.info),
      active: _this.getClasses(_this.active),
      css: 'col-md-1',
      device: 'desktop',
      selected: false,
      show_additional: false
    };
    return _this;
  }

  _createClass(DataExpanderItem, [{
    key: '_onClick',
    value: function _onClick(e) {
      e.preventDefault();
      var show = !this.state.show_additional;

      this.active = this.toggleCss(this.active);
      this.info = this.toggleCss(this.info);
      this.setState({
        info: this.getClasses(this.info),
        active: this.getClasses(this.active),
        show_additional: show
      });
    }
  }, {
    key: '_expandTest',
    value: function _expandTest() {
      var visible = _.map(ColumnsStore.getShowable(), 'key');
      return this.props.data.reduce(function (p, v, k) {
        var t = _.isBoolean(p) ? p : false;
        return t ? t : _.includes(visible, k);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tr ' + this.state.active },
        React.createElement(DataItem, {
          css: this.props.css,
          data: this.props.data,
          expand: this._onClick.bind(this)
        }),
        React.createElement(Additional, {
          data: this.props.data,
          active: this.state.active,
          info: this.state.info
        })
      );
    }
  }]);

  return DataExpanderItem;
}(React.Component);

Object.assign(DataExpanderItem.prototype, cssMixins);
Object.assign(DataExpanderItem.prototype, textMixins);

module.exports = DataExpanderItem;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(cssMixins, 'cssMixins', 'src/components/sessions/data_expander_item.js');

  __REACT_HOT_LOADER__.register(textMixins, 'textMixins', 'src/components/sessions/data_expander_item.js');

  __REACT_HOT_LOADER__.register(DataExpanderItem, 'DataExpanderItem', 'src/components/sessions/data_expander_item.js');
}();

;