'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _I18n_helper = require('@djforth/I18n_helper');

var _I18n_helper2 = _interopRequireDefault(_I18n_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    _ = require('lodash/core');

var ColumnsStore = require('../../stores/columns_store');

var formatter = require('../../utils/formatter');

var wp = (0, _I18n_helper2.default)('javascript')('weekly_programme');

// Mixins
var mixins = require('morse-react-mixins');
var _ref = [mixins.css_mixins, mixins.text_mixins],
    cssMixins = _ref[0],
    textMixins = _ref[1];

// Components

var ColumnItem = require('./column_item'),
    ExpandBtn = require('./stateless/expand_btn');

var DataItem = function (_React$Component) {
  _inherits(DataItem, _React$Component);

  function DataItem(props) {
    _classCallCheck(this, DataItem);

    var _this = _possibleConstructorReturn(this, (DataItem.__proto__ || Object.getPrototypeOf(DataItem)).call(this, props));

    _this.active = [{ active: false }];
    // this._select.bind(this);
    _this.formatter = formatter(_this.props.data);
    _this.state = { data: _this.props.data, columns: [], datefield: [] };
    return _this;
  }

  _createClass(DataItem, [{
    key: '_createKey',
    value: function _createKey(keys) {
      return this.createId(keys, this.props.data.get('id'));
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.mounted = true;
      this.setState({ data: this.props.data, columns: ColumnsStore.getVisible() });
      ColumnsStore.addChangeListener('change', this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      ColumnsStore.removeChangeListener('change', this._onChange);
    }
  }, {
    key: '_expandTest',
    value: function _expandTest(col) {
      if (col.key !== 'expand') return false;
      var visible = _.map(ColumnsStore.getShowable(), 'key');
      return this.props.data.reduce(function (prev, curr, key) {
        if (_.includes(visible, key) && !_.isEmpty(curr)) {
          return true;
        }

        return prev;
      }, false);
    }
  }, {
    key: '_expander',
    value: function _expander() {
      var buttonText = wp('additional.more_info');
      //(this.state.active) ? 'Less ' : 'More ';
      // buttonText += 'Information';
      return React.createElement(ExpandBtn, {
        css: this.checkCss(this.props.css, 'expand'),
        expand: this.props.expand,
        key: this._createKey('expand'),
        text: buttonText
      });
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      if (this.mounted) {
        this.setState({
          columns: ColumnsStore.getVisible(),
          device: ColumnsStore.getDevice()
        });
      }
    }
  }, {
    key: '_renderTd',
    value: function _renderTd() {
      var item = this.props.data;
      if (item && this.state.columns) {
        var td = _.map(this.state.columns, function (col) {
          if (this._expandTest(col)) {
            return this._expander();
          }

          return React.createElement(ColumnItem, {
            css: this.props.css,
            col: col,
            item: item,
            key: this._createKey(col.key)
          });
        }.bind(this));

        return td;
      }
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'clearfix' },
        this._renderTd()
      );
    }
  }]);

  return DataItem;
}(React.Component);

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(wp, 'wp', 'src/components/sessions/data_item.js');

  __REACT_HOT_LOADER__.register(cssMixins, 'cssMixins', 'src/components/sessions/data_item.js');

  __REACT_HOT_LOADER__.register(textMixins, 'textMixins', 'src/components/sessions/data_item.js');

  __REACT_HOT_LOADER__.register(DataItem, 'DataItem', 'src/components/sessions/data_item.js');
}();

;