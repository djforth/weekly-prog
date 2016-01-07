"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react"),
    _ = require("lodash");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins,
    textMixins = require("morse-react-mixins").text_mixins;

//Flux
var SessionsActions = require("../actions/sessions_actions"),
    ColumnsStore = require("../stores/columns_store");

var DateNavItem = function (_React$Component) {
  _inherits(DateNavItem, _React$Component);

  function DateNavItem(props) {
    _classCallCheck(this, DateNavItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateNavItem).call(this, props));

    _this.listCss = ["date-nav-item", { "active": _this.props.active }];
    _this.linkCss = ["date-nav-item-link", { "loading-session": _this.props.nav_item.nosessions }];
    _this.state = { list: _this.getClasses(_this.listCss), link: _this.getClasses(_this.linkCss), device: ColumnsStore.getDevice() };
    return _this;
  }

  _createClass(DateNavItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      ColumnsStore.addChangeListener("change", this._setDevice.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      ColumnsStore.removeChangeListener("change", this._setDevice);
    }
  }, {
    key: "_setDevice",
    value: function _setDevice() {
      // console.log("WTF>>>>>>>>>>>>>>>> ITEM", ColumnsStore.getDevice())
      this.setState({ device: ColumnsStore.getDevice() });
    }
  }, {
    key: "_loader",
    value: function _loader() {
      if (!this.props.nav_item.nosessions) return "";
      return React.createElement(
        "div",
        { className: "loading" },
        React.createElement(
          "span",
          { className: "hidden" },
          "Loading ",
          this.props.nav_item.alt
        )
      );
    }
  }, {
    key: "_click",
    value: function _click(e) {
      e.preventDefault();
      var date = this.props.nav_item.date;
      var cb = this.props.callback;

      this.listCss = this.toggleCss(this.listCss);
      this.setState({ list: this.getClasses(this.listCss) });

      SessionsActions.changeDate(date);
      if (_.isFunction(cb)) {
        cb(date);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {

      this.listCss = _.map(this.listCss, function (li) {
        if (_.isObject(li) && _.has(li, "active")) {
          li.active = nextProps.active;
        }
        return li;
      });

      this.linkCss = _.map(this.linkCss, function (a) {
        if (_.isObject(a) && _.has(a, "loading-session")) {
          a["loading-session"] = nextProps.nav_item.nosessions;
        }
        return a;
      });

      this.setState({
        list: this.getClasses(this.listCss),
        link: this.getClasses(this.linkCss)
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.active !== this.props.active || nextProps.nav_item.nosessions !== this.props.nav_item.nosessions || this.state.device !== nextState.device;
    }
  }, {
    key: "_renderTitle",
    value: function _renderTitle() {
      var fmt = this.props.nav_item.fmt;
      // console.log("device",this.state.device)
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
            fmt.format("ddd")
          )
        );
      } else {
        return fmt.format("ddd Do");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.nav_item;
      return React.createElement(
        "li",
        { role: "presentation", className: this.state.list },
        this._loader(),
        React.createElement(
          "a",
          { href: "#",
            title: item.alt,
            onClick: this._click.bind(this),
            className: this.state.link
          },
          this._renderTitle()
        )
      );
    }
  }]);

  return DateNavItem;
}(React.Component);

Object.assign(DateNavItem.prototype, cssMixins);
Object.assign(DateNavItem.prototype, textMixins);

module.exports = DateNavItem;
//# sourceMappingURL=date_nav_item.js.map