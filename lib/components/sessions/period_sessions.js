(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', './data_head', './data_expander_item', './stateless/no_sessions', './stateless/paginate', './stateless/period_head', '../../stores/columns_store', '../../stores/sessions_store', 'morse-react-mixins'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('./data_head'), require('./data_expander_item'), require('./stateless/no_sessions'), require('./stateless/paginate'), require('./stateless/period_head'), require('../../stores/columns_store'), require('../../stores/sessions_store'), require('morse-react-mixins'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.data_head, global.data_expander_item, global.no_sessions, global.paginate, global.period_head, global.columns_store, global.sessions_store, global.morseReactMixins);
    global.period_sessions = mod.exports;
  }
})(this, function (module, exports, _react, _data_head, _data_expander_item, _no_sessions, _paginate2, _period_head, _columns_store, _sessions_store, _morseReactMixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _data_head2 = _interopRequireDefault(_data_head);

  var _data_expander_item2 = _interopRequireDefault(_data_expander_item);

  var _no_sessions2 = _interopRequireDefault(_no_sessions);

  var _paginate3 = _interopRequireDefault(_paginate2);

  var _period_head2 = _interopRequireDefault(_period_head);

  var _columns_store2 = _interopRequireDefault(_columns_store);

  var _sessions_store2 = _interopRequireDefault(_sessions_store);

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

  var PeriodSessions = function (_React$Component) {
    _inherits(PeriodSessions, _React$Component);

    function PeriodSessions(props) {
      _classCallCheck(this, PeriodSessions);

      var _this = _possibleConstructorReturn(this, (PeriodSessions.__proto__ || Object.getPrototypeOf(PeriodSessions)).call(this, props));

      var st = void 0,
          fn = void 0,
          sessions = void 0,
          hidden = void 0;
      st = _this.props.time.st;
      fn = _this.props.time.fn;
      sessions = _this.props.sessions.getTimePeriod(st, fn);

      hidden = sessions.size <= 100;
      _this.pagination = ['weekly-pagination', { hidden: hidden }];

      _this.state = {
        columns: [],
        data: sessions,
        keys: [],
        visible: [],
        device: 'desktop',
        paginate: 4,
        pagination_css: _this.getClasses(_this.pagination)
      };
      return _this;
    }

    _createClass(PeriodSessions, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setState({ columns: _columns_store2.default.getVisible() });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // Data Changers
        _columns_store2.default.addChangeListener('change', this._onChange.bind(this));
        _sessions_store2.default.addChangeListener('changing_date', this._onLoaded.bind(this));
        _sessions_store2.default.addChangeListener('fetched', this._onLoaded.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _sessions_store2.default.removeChangeListener('changing_date', this._onLoaded);
        _sessions_store2.default.removeChangeListener('fetched', this._onLoaded);
        _columns_store2.default.removeChangeListener('change', this._onChange);
      }
    }, {
      key: '_renderData',
      value: function _renderData() {
        if (this.state.data && this.state.data.size > 0) {
          return this._renderSessions();
        }
        return this._renderNoSessions();
      }
    }, {
      key: '_renderNoSessions',
      value: function _renderNoSessions() {
        return _react2.default.createElement(_no_sessions2.default, {
          no_session: this.props.no_sessions,
          title: this.props.title });
      }
    }, {
      key: '_renderSessions',
      value: function _renderSessions() {
        var _this2 = this;

        var data = this.state.data.slice(0, this.state.paginate);
        return data.map(function (d) {
          return _react2.default.createElement(_data_expander_item2.default, {
            css: _this2.props.css,
            data: d,
            key: _this2.createId('session', d.get('id')) });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'section',
          { key: 'items', className: this._setCss() },
          _react2.default.createElement(_period_head2.default, { title: this.props.title }),
          _react2.default.createElement(
            'div',
            { className: 'table' },
            _react2.default.createElement(_data_head2.default, { columns: this.state.columns, css: this.props.css }),
            _react2.default.createElement(
              'div',
              { className: 'tbody' },
              this._renderData(this.state.paginate)
            )
          ),
          _react2.default.createElement(_paginate3.default, {
            css: this.state.pagination_css,
            onClick: this._paginate.bind(this)
          })
        );
      }
    }, {
      key: '_setCss',
      value: function _setCss() {
        return 'panel ' + this.props.title.toLowerCase();
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        var columns = _columns_store2.default.getKeyAndTitle();
        this.setState({
          columns: columns
        });
      }
    }, {
      key: '_onLoaded',
      value: function _onLoaded() {
        var sessions = void 0,
            st = void 0,
            fn = void 0;
        st = this.props.time.st;
        fn = this.props.time.fn;
        sessions = _sessions_store2.default._getDate().data;
        sessions = sessions.getTimePeriod(st, fn);
        this.pagination[1].hidden = sessions.size <= 100;
        this.setState({
          paginate: 100,
          pagination_css: this.getClasses(this.pagination),
          data: sessions
        });
      }
    }, {
      key: '_paginate',
      value: function _paginate(e) {
        e.preventDefault();
        var pag = this.state.paginate + 10;
        if (pag > this.state.data.size) {
          this.pagination = this.toggleCss(this.pagination);
        }

        this.setState({
          paginate: pag,
          pagination_css: this.getClasses(this.pagination)
        });
      }
    }]);

    return PeriodSessions;
  }(_react2.default.Component);

  Object.assign(PeriodSessions.prototype, _morseReactMixins.css_mixins);
  Object.assign(PeriodSessions.prototype, _morseReactMixins.text_mixins);

  exports.default = PeriodSessions;
  module.exports = exports['default'];
});