(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/map', 'lodash/isEmpty', 'lodash/filter', 'lodash/reject', 'lodash/includes', 'react', '../../stores/columns_store', 'morse-react-mixins', '../../helpers/buttons_helper', './stateless/additional_content', './stateless/book_btn', './stateless/description', './stateless/richtext'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/map'), require('lodash/isEmpty'), require('lodash/filter'), require('lodash/reject'), require('lodash/includes'), require('react'), require('../../stores/columns_store'), require('morse-react-mixins'), require('../../helpers/buttons_helper'), require('./stateless/additional_content'), require('./stateless/book_btn'), require('./stateless/description'), require('./stateless/richtext'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.map, global.isEmpty, global.filter, global.reject, global.includes, global.react, global.columns_store, global.morseReactMixins, global.buttons_helper, global.additional_content, global.book_btn, global.description, global.richtext);
    global.additional = mod.exports;
  }
})(this, function (module, exports, _map2, _isEmpty2, _filter2, _reject2, _includes2, _react, _columns_store, _morseReactMixins, _buttons_helper, _additional_content, _book_btn, _description, _richtext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _map3 = _interopRequireDefault(_map2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _filter3 = _interopRequireDefault(_filter2);

  var _reject3 = _interopRequireDefault(_reject2);

  var _includes3 = _interopRequireDefault(_includes2);

  var _react2 = _interopRequireDefault(_react);

  var _columns_store2 = _interopRequireDefault(_columns_store);

  var _buttons_helper2 = _interopRequireDefault(_buttons_helper);

  var _additional_content2 = _interopRequireDefault(_additional_content);

  var _book_btn2 = _interopRequireDefault(_book_btn);

  var _description2 = _interopRequireDefault(_description);

  var _richtext2 = _interopRequireDefault(_richtext);

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

  _includes = _includes3.default;

  _reject = _reject3.default;

  // Mixins


  // Helpers

  // console.log('ButtonCheck', ButtonCheck)


  var Additional = function (_React$Component) {
    _inherits(Additional, _React$Component);

    function Additional(props) {
      _classCallCheck(this, Additional);

      var _this = _possibleConstructorReturn(this, (Additional.__proto__ || Object.getPrototypeOf(Additional)).call(this, props));

      _this.state = { columns: _columns_store2.default.getShowable() };
      return _this;
    }

    _createClass(Additional, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.mounted = true;
        this.setState({ columns: _columns_store2.default.getShowable() });
        _columns_store2.default.addChangeListener('change', this._onChange.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
        _columns_store2.default.removeChangeListener('change', this._onChange);
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        if (this.mounted) {
          this.setState({
            columns: _columns_store2.default.getShowable()
          });
        }
      }
    }, {
      key: '_checkButton',
      value: function _checkButton(item) {
        return item.has('buttons') && item.get('buttons').has('book');
      }
    }, {
      key: '_renderActions',
      value: function _renderActions() {
        var col = void 0,
            item = void 0,
            key = void 0,
            places = void 0;

        col = (0, _filter3.default)(this.state.columns, { key: 'actions' });
        if ((0, _isEmpty3.default)(col)) return '';

        item = this.props.data;

        places = item.get('places_left');

        key = this.createId(col.key, item.get('id'));

        var _ButtonCheck = (0, _buttons_helper2.default)(item),
            link = _ButtonCheck.link,
            title = _ButtonCheck.title,
            instruction = _ButtonCheck.instruction;

        return _react2.default.createElement(_book_btn2.default, {
          places: places,
          link: link,
          title: title,
          instruction: instruction,
          key: key
        });
      }
    }, {
      key: '_renderList',
      value: function _renderList() {
        var _this2 = this;

        var data = void 0,
            extra = void 0;
        data = this.props.data;
        extra = (0, _reject3.default)(this.state.columns, function (col) {
          return col.key === 'description' || col.key === 'actions';
        });

        if (data && extra) {
          var li = (0, _map3.default)(extra, function (col) {
            var key = _this2.createId(col.key, _this2.props.data.get('id'));
            return _react2.default.createElement(
              'li',
              { className: 'list-group-item col-md-4',
                key: key },
              _react2.default.createElement(
                'strong',
                null,
                col.title,
                ': '
              ),
              _react2.default.createElement(_additional_content2.default, {
                col: col,
                item: data
              })
            );
          });

          return li;
        }

        return '';
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'additional ' + this.props.active },
          _react2.default.createElement(
            'ul',
            { className: this.props.info },
            this._renderList()
          ),
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(_richtext2.default, { content: this.props.data.get('description') })
          ),
          this._renderActions()
        );
      }
    }]);

    return Additional;
  }(_react2.default.Component);

  Object.assign(Additional.prototype, _morseReactMixins.css_mixins);
  Object.assign(Additional.prototype, _morseReactMixins.text_mixins);

  exports.default = Additional;
  module.exports = exports['default'];
});