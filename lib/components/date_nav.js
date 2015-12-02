"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    _ = require("lodash"),
    DataManager = require("datamanager");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins,
    textMixins = require("morse-react-mixins").text_mixins,
    widthsMixins = require("morse-react-mixins").widths_mixins;

//Flux
var SessionsActions = require("../actions/sessions_actions"),
    SessionsStore = require("../stores/sessions_store");

var DateNav = (function (_React$Component) {
  _inherits(DateNav, _React$Component);

  function DateNav(props) {
    _classCallCheck(this, DateNav);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateNav).call(this, props));

    var dates = SessionsStore._getAllDates();
    var current = _.first(dates).date;
    // SessionsActions.setGroupby(this.props.groupby);

    _this.percent = 0;
    _this.state = { dates: SessionsStore._getAllDates(), current: current };
    return _this;
  }

  _createClass(DateNav, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      SessionsStore.addChangeListener("prerender", this._getDates.bind(this));
      SessionsStore.addChangeListener("fetched", this._getDates.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener("prerender", this._getDates);
      SessionsStore.removeChangeListener("fetched", this._getDates);
    }
  }, {
    key: "_click",
    value: function _click(date, e) {
      e.preventDefault();
      SessionsActions.changeDate(date);
      this.setState({ current: date });
    }
  }, {
    key: "_setActive",
    value: function _setActive(date) {
      return date.getTime() === this.state.current.getTime() ? "active" : "";
    }
  }, {
    key: "_getDates",
    value: function _getDates() {
      this.setState({ dates: SessionsStore._getAllDates() });
    }
  }, {
    key: "_renderDate",
    value: function _renderDate(d) {
      return React.createElement(
        "li",
        { role: "presentation", key: this.createId(d.title, d.date.getDate(), d.date.getMonth()) },
        React.createElement(
          "a",
          {
            role: "tab",
            href: "#",
            rel: "tab-0",
            "aria-controls": "sessions",
            "aria-selected": "true",
            title: d.alt,
            onClick: this._click.bind(this, d.date),
            className: this._setActive(d.date)
          },
          d.title
        )
      );
    }
  }, {
    key: "_renderToday",
    value: function _renderToday(d) {
      return React.createElement(
        "li",
        { role: "presentation", key: this.createId(d.title, d.date.getDate(), d.date.getMonth()) },
        React.createElement(
          "a",
          {
            role: "tab",
            href: "#",
            rel: "tab-0",
            "aria-controls": "sessions",
            "aria-selected": "true",
            title: d.alt,
            onClick: this._click.bind(this, d.date),
            className: this._setActive(d.date) },
          d.fmt.formatDate("Today %d")
        )
      );
    }
  }, {
    key: "_renderDates",
    value: function _renderDates() {
      var _this2 = this;

      if (this.state.dates.length) {
        return _.map(this.state.dates, function (d) {
          if (d.today) {
            return _this2._renderToday(d);
          }
          return _this2._renderDate(d);
        });
      }

      return [];
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "tabbed-content-nav", role: "tablist" },
        this._renderDates()
      );
    }
  }]);

  return DateNav;
})(React.Component);

Object.assign(DateNav.prototype, cssMixins);
Object.assign(DateNav.prototype, textMixins);
Object.assign(DateNav.prototype, widthsMixins);

module.exports = DateNav;
//# sourceMappingURL=date_nav.js.map