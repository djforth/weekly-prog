(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/reject', 'lodash/find', 'lodash/mapValues', 'lodash/take', 'lodash/map', 'lodash/first', 'lodash/clone', 'lodash/reduce', 'lodash/isEmpty', 'lodash/isDate', 'react', '../../utils/day_checker', 'morse-react-mixins', '../../actions/sessions_actions', '../../stores/sessions_store', '../../stores/columns_store', './stateless/arrow_left', './stateless/arrow_right', './stateless/nav_item', './stateless/today_nav_item'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/reject'), require('lodash/find'), require('lodash/mapValues'), require('lodash/take'), require('lodash/map'), require('lodash/first'), require('lodash/clone'), require('lodash/reduce'), require('lodash/isEmpty'), require('lodash/isDate'), require('react'), require('../../utils/day_checker'), require('morse-react-mixins'), require('../../actions/sessions_actions'), require('../../stores/sessions_store'), require('../../stores/columns_store'), require('./stateless/arrow_left'), require('./stateless/arrow_right'), require('./stateless/nav_item'), require('./stateless/today_nav_item'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.reject, global.find, global.mapValues, global.take, global.map, global.first, global.clone, global.reduce, global.isEmpty, global.isDate, global.react, global.day_checker, global.morseReactMixins, global.sessions_actions, global.sessions_store, global.columns_store, global.arrow_left, global.arrow_right, global.nav_item, global.today_nav_item);
    global.date_nav = mod.exports;
  }
})(this, function (module, exports, _reject2, _find2, _mapValues2, _take2, _map2, _first2, _clone2, _reduce2, _isEmpty2, _isDate2, _react, _day_checker, _morseReactMixins, _sessions_actions, _sessions_store, _columns_store, _arrow_left, _arrow_right, _nav_item, _today_nav_item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reject3 = _interopRequireDefault(_reject2);

  var _find3 = _interopRequireDefault(_find2);

  var _mapValues3 = _interopRequireDefault(_mapValues2);

  var _take3 = _interopRequireDefault(_take2);

  var _map3 = _interopRequireDefault(_map2);

  var _first3 = _interopRequireDefault(_first2);

  var _clone3 = _interopRequireDefault(_clone2);

  var _reduce3 = _interopRequireDefault(_reduce2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _react2 = _interopRequireDefault(_react);

  var _day_checker2 = _interopRequireDefault(_day_checker);

  var _sessions_actions2 = _interopRequireDefault(_sessions_actions);

  var _sessions_store2 = _interopRequireDefault(_sessions_store);

  var _columns_store2 = _interopRequireDefault(_columns_store);

  var _arrow_left2 = _interopRequireDefault(_arrow_left);

  var _arrow_right2 = _interopRequireDefault(_arrow_right);

  var _nav_item2 = _interopRequireDefault(_nav_item);

  var _today_nav_item2 = _interopRequireDefault(_today_nav_item);

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

  var DateNav = function (_React$Component) {
    _inherits(DateNav, _React$Component);

    function DateNav(props) {
      _classCallCheck(this, DateNav);

      var current = void 0,
          dates = void 0,
          today = void 0;

      var _this = _possibleConstructorReturn(this, (DateNav.__proto__ || Object.getPrototypeOf(DateNav)).call(this, props));

      dates = _this._splitDates();
      today = dates[0];
      current = today.date;
      _this.pos = 0;
      _this.state = {
        dates: dates[1],
        today: today,
        current: current,
        listWidth: 1000,
        listPos: 0
      };
      return _this;
    }

    _createClass(DateNav, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setState({ listWidth: this._setWidth() });
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var holderWidth = void 0,
            listWidth = void 0;
        holderWidth = document.querySelector('.list-holder').offsetWidth;
        listWidth = this._setWidth();
        if (listWidth === this.state.listWidth) {
          var widths = this.state.listWidth + this.state.listPos;

          if (holderWidth > widths) {
            _sessions_actions2.default.getMoreDays();
          }
        } else {
          this.setState({ listWidth: this._setWidth() });
        }
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        _sessions_store2.default.addChangeListener('fetched', this._getDates.bind(this));
        _sessions_store2.default.addChangeListener('changing_date', this._getDates.bind(this));
        _sessions_store2.default.addChangeListener('calendar_changing', this._reset.bind(this));
        _columns_store2.default.addChangeListener('change', this._deviceChange.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _sessions_store2.default.removeChangeListener('calendar_changing', this._reset);
        _sessions_store2.default.removeChangeListener('fetched', this._getDates);
        _sessions_store2.default.removeChangeListener('changing_date', this._getDates);
        _columns_store2.default.removeChangeListener('change', this._deviceChange);
      }
    }, {
      key: '_deviceChange',
      value: function _deviceChange() {
        this.setState({
          listWidth: this._setWidth(),
          device: _columns_store2.default.getDevice()
        });
      }
    }, {
      key: '_getDates',
      value: function _getDates() {
        var dates = void 0,
            today = void 0;
        dates = this._splitDates();
        today = dates[0];
        if (!(0, _isDate3.default)(today.date) || !(0, _isDate3.default)(_sessions_store2.default._getCurrentDate())) {
          alert(today.date + ' : ' + _sessions_store2.default._getCurrentDate());
        }
        this.setState({
          dates: dates[1],
          today: today,
          listWidth: this._setWidth(),
          current: _sessions_store2.default._getCurrentDate()
        });
      }
    }, {
      key: '_getDistance',
      value: function _getDistance(move) {
        if ((0, _isEmpty3.default)(move)) return 0;

        return (0, _reduce3.default)(move, function (prev, cur) {
          return prev + cur;
        });
      }
    }, {
      key: '_getPrevious',
      value: function _getPrevious(pos) {
        if (pos >= 0) {
          var firstDate = void 0,
              tomorrow = void 0;
          tomorrow = (0, _clone3.default)(this.state.today.date);
          tomorrow.setDate(tomorrow.getDate() + 1);
          firstDate = (0, _first3.default)(this.state.dates).date;
          if (!(0, _day_checker2.default)(tomorrow, firstDate)) {
            _sessions_actions2.default.getPreviousDays(firstDate);
          }
        }
      }
    }, {
      key: '_mover',
      value: function _mover(dir, e) {
        var elms = void 0,
            move = void 0,
            mover = void 0;
        e.preventDefault();
        elms = this.getAllWidths();
        if (dir === 'left' && this.pos > 0) {
          this.pos--;
        } else if (dir === 'right' && this.pos < elms.length) {
          this.pos++;
        }

        move = (0, _map3.default)((0, _take3.default)(elms, this.pos), 'width');
        mover = -this._getDistance(move);
        this.setState({ listPos: mover });
        this._getPrevious(mover);
      }
    }, {
      key: '_setCurrent',
      value: function _setCurrent(date, e) {
        e.preventDefault();
        _sessions_actions2.default.changeDate(date);
        this.setState({ current: date });
      }
    }, {
      key: '_setActive',
      value: function _setActive(date) {
        return (0, _day_checker2.default)(date, this.state.current) ? 'active' : '';
      }
    }, {
      key: '_setStyle',
      value: function _setStyle() {
        var styles = {
          width: this.state.listWidth,
          left: this.state.listPos
        };

        return (0, _mapValues3.default)(styles, function (v) {
          return v;
        });
      }
    }, {
      key: '_setWidth',
      value: function _setWidth() {
        this.convertDomlist(this.refs.datelist.querySelectorAll('li'));
        return Math.ceil(this.getWidths());
      }
    }, {
      key: '_splitDates',
      value: function _splitDates() {
        var dates = _sessions_store2.default._getAllDates();
        return [(0, _find3.default)(dates, function (d) {
          return d.today;
        }), (0, _reject3.default)(dates, function (d) {
          return d.today;
        })];
      }
    }, {
      key: '_reset',
      value: function _reset() {
        this.setState({ listPos: 0 });
      }
    }, {
      key: '_renderDates',
      value: function _renderDates() {
        var _this2 = this;

        if (this.state.dates.length) {
          return (0, _map3.default)(this.state.dates, function (d) {
            var key = _this2.createId(d.title, d.date.getDate(), d.date.getMonth());
            return _react2.default.createElement(_nav_item2.default, {
              key: key,
              nav_item: d,
              device: _this2.state.device,
              onClick: _this2._setCurrent.bind(_this2, d.date),
              active: _this2._setActive(d.date)
            });
          });
        }

        return [];
      }
    }, {
      key: '_renderToday',
      value: function _renderToday() {
        var key = void 0,
            today = void 0;
        today = this.state.today;
        key = this.createId(today.title, today.date.getDate(), today.date.getMonth());
        return _react2.default.createElement(_today_nav_item2.default, {
          key: key,
          nav_item: today,
          device: this.state.device,
          onClick: this._setCurrent.bind(this, today.date),
          active: this._setActive(today.date)
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'nav',
          { className: 'date-nav' },
          _react2.default.createElement(_arrow_left2.default, { onClick: this._mover.bind(this, 'left') }),
          this._renderToday(),
          _react2.default.createElement(
            'div',
            { className: 'list-holder' },
            _react2.default.createElement(
              'ul',
              { className: 'date-list',
                role: 'tablist',
                ref: 'datelist',
                style: this._setStyle() },
              this._renderDates()
            )
          ),
          _react2.default.createElement(_arrow_right2.default, { onClick: this._mover.bind(this, 'right') })
        );
      }
    }]);

    return DateNav;
  }(_react2.default.Component);

  Object.assign(DateNav.prototype, _morseReactMixins.css_mixins);
  Object.assign(DateNav.prototype, _morseReactMixins.text_mixins);
  Object.assign(DateNav.prototype, _morseReactMixins.widths_mixins);

  exports.default = DateNav;
  module.exports = exports['default'];
});