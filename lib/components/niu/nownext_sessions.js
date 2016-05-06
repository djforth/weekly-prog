'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require('react'),
    _ = require('lodash/core');

var DataHead = require('./data_head'),
    DataItems = require('./data_items'),
    DataExpander = require('./data_expander_item');

// Flux
var SessionsStore = require('../stores/sessions_store');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins;

var NowNextSessions = function (_DataItems) {
  _inherits(NowNextSessions, _DataItems);

  function NowNextSessions(props) {
    _classCallCheck(this, NowNextSessions);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NowNextSessions).call(this, props));

    _this.state = {
      keys: [],
      visible: [],
      device: 'desktop'
    };
    return _this;
  }

  _createClass(NowNextSessions, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //Data Changers
      SessionsStore.addChangeListener('fetched', this._getSessions.bind(this));
      SessionsStore.addChangeListener('set_facility', this._getSessions.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener('fetched', this._getSessions);
      SessionsStore.removeChangeListener('set_facility', this._getSessions);
    }
  }, {
    key: '_renderData',
    value: function _renderData() {
      if (this.state.data && this.state.data.size > 0) {
        var data = this.state.data;
        // let items = []
        var items = data.map(function (k) {
          if (k) {
            return React.createElement(DataExpander, { css: this.props.css, data: k, key: k.get('id') });
          }
        }.bind(this));

        return items;
      } else {
        return React.createElement(
          'div',
          { className: 'cols-lg-12' },
          React.createElement(
            'h5',
            { className: 'no-sessions' },
            'There is no sessions currently'
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'tbody' },
        this._renderData(this.state.paginate)
      );
    }
  }, {
    key: '_getSessions',
    value: function _getSessions() {
      var sessions = SessionsStore._getFacility();
      this.setState({ data: sessions });
    }
  }]);

  return NowNextSessions;
}(DataItems);

Object.assign(NowNextSessions.prototype, cssMixins);

module.exports = NowNextSessions;