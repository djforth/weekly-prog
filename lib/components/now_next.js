"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    _ = require("lodash");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins,
    textMixins = require("morse-react-mixins").text_mixins,
    widthsMixins = require("morse-react-mixins").widths_mixins;

// Morse Libraies
var ViewportDetect = require("viewport-detection-es6");

//utiles
var process_nav = require("../utils/process_nav");

//Flux
var ColumnsActions = require("../actions/columns_actions"),
    ColumnsStore = require("../stores/columns_store"),
    SessionsActions = require("../actions/sessions_actions"),
    SessionsStore = require("../stores/sessions_store");

// Components
var DataHead = require("./data_head"),
    NowNextItems = require("./nownext_sessions"),
    TouchNav = require("touch-nav");

var NowNext = function (_React$Component) {
  _inherits(NowNext, _React$Component);

  function NowNext(props) {
    _classCallCheck(this, NowNext);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NowNext).call(this, props));

    var navitems = process_nav(_this.props.navitems, _this.props.title_tag);
    SessionsActions.setGroupby(_this.props.groupby);
    SessionsActions.setFacility(_.first(_this.props.navitems).id);
    _this.percent = 0;
    _this.state = { sessions: [], keys: [], visible: [], device: "desktop", navitems: navitems };
    return _this;
  }

  //React life cycle

  _createClass(NowNext, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      SessionsStore.addChangeListener("prerender", this._getSessions.bind(this));
      SessionsActions.prerenderData(this.props.sessions);
      ColumnsActions.addingColumns(this.props.columns);
      ColumnsActions.changeDevice(this.device);

      // this._getSessions();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.detect = new ViewportDetect();
      this.device = this.detect.getDevice();
      this.size = this.detect.windowSize();
      ColumnsActions.changeDevice(this.device);
      // this.setState({device:this.device});
      this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
      this.detect.trackSize(function (device, size) {
        if (this.device !== device) {
          this.device = device;
          ColumnsActions.changeDevice(device);
        }

        this.size = size;
      }.bind(this));

      SessionsStore.addChangeListener("api_set", this._fetchData.bind(this));
      SessionsActions.setApi(this.props.sessionsApi);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.detect.removeCallback(this.id);
      SessionsStore.removeChangeListener("prerender", this._getSessions);
    }
  }, {
    key: "_onDeviceChange",
    value: function _onDeviceChange(device, size) {
      if (this.device !== device) {
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size = size;
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      SessionsStore.removeChangeListener("api_set", this._fetchData);
      _.defer(function () {
        SessionsActions.fetchNowNext();
      });
    }
  }, {
    key: "_onClick",
    value: function _onClick(id) {
      // console.log("click", args)
      SessionsActions.setFacility(id);
    }
  }, {
    key: "_getSessions",
    value: function _getSessions() {
      var session = SessionsStore._getDate();
      if (!_.isEmpty(session)) {
        this.setState({ date: session.date, sessions: session.data });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "now-next" },
        React.createElement(TouchNav, { navitems: this.state.navitems, callback: this._onClick.bind(this) }),
        React.createElement(
          "div",
          { className: "table weekly-prog" },
          React.createElement(DataHead, { device: this.props.device, css: this.props.css, key: "head" }),
          React.createElement(
            "div",
            { className: "tbody" },
            React.createElement(NowNextItems, this.props)
          )
        )
      );
    }
  }]);

  return NowNext;
}(React.Component);

Object.assign(NowNext.prototype, cssMixins);
Object.assign(NowNext.prototype, textMixins);
Object.assign(NowNext.prototype, widthsMixins);

module.exports = NowNext;