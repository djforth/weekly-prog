"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    _ = require("lodash");

var DateNavItem = require("./date_nav_item");

//Flux
var SessionsActions = require("../actions/sessions_actions"),
    ColumnsStore = require("../stores/columns_store");

var TodayItem = (function (_DateNavItem) {
  _inherits(TodayItem, _DateNavItem);

  function TodayItem(props) {
    _classCallCheck(this, TodayItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodayItem).call(this, props));

    _this.listCss = ["date-nav-item", "today-nav", { "active": _this.props.active }];
    _this.state = { list: _this.getClasses(_this.listCss), device: "desktop" };
    return _this;
  }

  _createClass(TodayItem, [{
    key: "_renderToday",
    value: function _renderToday() {
      var fmt = this.props.nav_item.fmt;

      if (this.state.device === "mobile") {
        return React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            { className: "nav-date" },
            fmt.format("DD")
          ),
          React.createElement(
            "span",
            { className: "nav-day" },
            "Today"
          )
        );
      } else {
        return "Today " + fmt.format("Do");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.nav_item;
      return React.createElement(
        "div",
        { role: "presentation", className: this.state.list },
        React.createElement(
          "a",
          { href: "#",
            title: item.alt,
            onClick: this._click.bind(this),
            className: "date-nav-item-link"
          },
          this._renderToday(this.state.device)
        )
      );
    }
  }]);

  return TodayItem;
})(DateNavItem);

module.exports = TodayItem;
//# sourceMappingURL=today_nav_item.js.map