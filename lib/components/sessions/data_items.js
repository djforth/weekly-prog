(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '../stores/sessions_store', './data_expander_item'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('../stores/sessions_store'), require('./data_expander_item'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.sessions_store, global.data_expander_item);
    global.data_items = mod.exports;
  }
})(this, function (exports, _react, _sessions_store, _data_expander_item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _sessions_store2 = _interopRequireDefault(_sessions_store);

  var _data_expander_item2 = _interopRequireDefault(_data_expander_item);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

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
        _sessions_store2.default.addChangeListener('prerender', this._onLoaded.bind(this));
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _sessions_store2.default.addChangeListener('pagination', this._onPagination.bind(this));
        _sessions_store2.default.addChangeListener('change', this._onChange.bind(this));
        _sessions_store2.default.addChangeListener('fetched', this._onLoaded.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _sessions_store2.default.removeChangeListener('fetched', this._onLoaded);
        _sessions_store2.default.removeChangeListener('change', this._onChange);
        _sessions_store2.default.removeChangeListener('pagination', this._onPagination);
      }
    }, {
      key: 'renderData',
      value: function renderData() {
        if (this.state.data) {
          var items = this.state.data.map(function (k) {
            if (k) {
              console.log('data', k);
              return _react2.default.createElement(_data_expander_item2.default, { css: this.props.css, data: k, key: k.get('id') });
            }
          }.bind(this));

          return items;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { key: 'items' },
          this.renderData()
        );
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        this.setState({ data: _sessions_store2.default.paginationData() });
      }
    }, {
      key: '_onPagination',
      value: function _onPagination() {
        this.setState({ data: _sessions_store2.default.paginationData() });
      }
    }, {
      key: '_onSearch',
      value: function _onSearch() {
        this.setState({ data: _sessions_store2.default.getSearchData() });
      }
    }, {
      key: '_onLoaded',
      value: function _onLoaded() {
        this.setState({
          data: _sessions_store2.default.getAll(),
          keys: _sessions_store2.default.getKeys()
        });
      }
    }]);

    return DataItems;
  }(_react2.default.Component);

  exports.default = DataItems;
});