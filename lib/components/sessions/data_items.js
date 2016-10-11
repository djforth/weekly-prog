'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react');

// Flux
var SessionsStore = require('../stores/sessions_store');

// Components
var DataExpander = require('./data_expander_item');

var DataItems = function (_React$Component) {
  _inherits(DataItems, _React$Component);

  function DataItems(props) {
    _classCallCheck(this, DataItems);

    var _this = _possibleConstructorReturn(this, (DataItems.__proto__ || Object.getPrototypeOf(DataItems)).call(this, props));

    _this.active = [{ active: false }];
    _this.state = {
      data: _this.props.sessions.data,
      keys: [],
      visible: [],
      device: 'desktop'
    };
    return _this;
  }

  _createClass(DataItems, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      SessionsStore.addChangeListener('prerender', this._onLoaded.bind(this));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      SessionsStore.addChangeListener('pagination', this._onPagination.bind(this));
      SessionsStore.addChangeListener('change', this._onChange.bind(this));
      SessionsStore.addChangeListener('fetched', this._onLoaded.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener('fetched', this._onLoaded);
      SessionsStore.removeChangeListener('change', this._onChange);
      SessionsStore.removeChangeListener('pagination', this._onPagination);
    }
  }, {
    key: 'renderData',
    value: function renderData() {
      if (this.state.data) {
        var items = this.state.data.map(function (k) {
          if (k) {
            console.log('data', k);
            return React.createElement(DataExpander, { css: this.props.css, data: k, key: k.get('id') });
          }
        }.bind(this));

        return items;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { key: 'items' },
        this.renderData()
      );
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({ data: SessionsStore.paginationData() });
    }
  }, {
    key: '_onPagination',
    value: function _onPagination() {
      this.setState({ data: SessionsStore.paginationData() });
    }
  }, {
    key: '_onSearch',
    value: function _onSearch() {
      this.setState({ data: SessionsStore.getSearchData() });
    }
  }, {
    key: '_onLoaded',
    value: function _onLoaded() {
      this.setState({
        data: SessionsStore.getAll(),
        keys: SessionsStore.getKeys()
      });
    }
  }]);

  return DataItems;
}(React.Component);

module.exports = DataItems;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DataItems, 'DataItems', 'src/components/sessions/data_items.js');
}();

;