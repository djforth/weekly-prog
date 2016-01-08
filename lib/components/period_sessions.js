"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    _ = require("lodash");

var DataHead = require("./data_head"),
    DataItems = require("./data_items"),
    DataExpander = require("./data_expander_item");

// Flux
var SessionsStore = require("../stores/sessions_store");

// Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var PeriodSessions = function (_DataItems) {
  _inherits(PeriodSessions, _DataItems);

  function PeriodSessions(props) {
    _classCallCheck(this, PeriodSessions);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PeriodSessions).call(this, props));

    var sessions = _this.props.sessions.getTimePeriod(_this.props.time.st, _this.props.time.fn);
    _this.pagination = ["weekly-pagination", { "hidden": sessions.size <= 4 }];

    _this.state = {
      data: sessions,
      keys: [],
      visible: [],
      device: "desktop",
      paginate: 4,
      pagination_css: _this.getClasses(_this.pagination) };
    return _this;
  }

  _createClass(PeriodSessions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //Data Changers
      SessionsStore.addChangeListener("changing_date", this._onLoaded.bind(this));
      SessionsStore.addChangeListener("fetched", this._onLoaded.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener("changing_date", this._onLoaded);
      SessionsStore.removeChangeListener("fetched", this._onLoaded);
    }
  }, {
    key: "_renderData",
    value: function _renderData() {
      var _this2 = this;

      if (this.state.data && this.state.data.size > 0) {
        var _ret = function () {
          var data = _this2.state.data.slice(0, _this2.state.paginate);
          var items = [];
          data.forEach(function (k) {
            if (k) {
              items.push(React.createElement(DataExpander, { css: this.props.css, data: k, key: k.get("id") }));
            }
          }.bind(_this2));

          return {
            v: items
          };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      } else {
        return React.createElement(
          "div",
          { className: "cols-lg-12", key: this.props.title.toLowerCase() + "-nosessions" },
          React.createElement(
            "h5",
            { className: "no-sessions" },
            "There are no sessions this ",
            this.props.title
          )
        );
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        { key: "items", className: "clearfix " + this.props.title.toLowerCase() },
        React.createElement(
          "header",
          { className: "section-header" },
          React.createElement(
            "h1",
            { className: "gg beta secondary" },
            this.props.title
          )
        ),
        React.createElement(
          "div",
          { className: "table" },
          React.createElement(DataHead, { device: this.props.device, css: this.props.css, key: this.props.title.toLowerCase() + "head" }),
          React.createElement(
            "div",
            { className: "tbody" },
            this._renderData(this.state.paginate)
          )
        ),
        React.createElement(
          "div",
          { className: this.state.pagination_css },
          React.createElement(
            "a",
            { href: "#", onClick: this._paginate.bind(this), className: "button button-pagination" },
            "Load More"
          )
        )
      );
    }
  }, {
    key: "_onLoaded",
    value: function _onLoaded() {

      var sessions = SessionsStore._getDate().data.getTimePeriod(this.props.time.st, this.props.time.fn);

      this.pagination[1]["hide"] = sessions.size <= 4;

      this.setState({ paginate: 4, pagination_css: this.getClasses(this.pagination), data: sessions });
    }
  }, {
    key: "_paginate",
    value: function _paginate(e) {
      e.preventDefault();
      var pag = this.state.paginate + 4;
      if (pag > this.state.data.size) {

        this.pagination = this.toggleCss(this.pagination);
      }
      this.setState({ paginate: pag, pagination_css: this.getClasses(this.pagination) });
    }
  }]);

  return PeriodSessions;
}(DataItems);

Object.assign(PeriodSessions.prototype, cssMixins);

module.exports = PeriodSessions;
//# sourceMappingURL=period_sessions.js.map