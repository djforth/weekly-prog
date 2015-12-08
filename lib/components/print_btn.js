"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    _ = require("lodash"),
    Moment = require("moment");

//Flux
var SessionsStore = require("../stores/sessions_store");

var PrintBtn = (function (_React$Component) {
  _inherits(PrintBtn, _React$Component);

  function PrintBtn(props) {
    _classCallCheck(this, PrintBtn);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PrintBtn).call(this, props));

    _this.state = { print_url: _this._setUrl(Moment()) };
    return _this;
  }

  _createClass(PrintBtn, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      SessionsStore.addChangeListener("changing_date", this._changeDate.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener("changing_date", this._changeDate);
    }
  }, {
    key: "_setUrl",
    value: function _setUrl(date) {
      var date_str = date.format("YYYY/MM/DD");
      return this.props.print.replace(":date", date_str);
    }
  }, {
    key: "_changeDate",
    value: function _changeDate() {

      var date = SessionsStore._getCurrentDate();

      this.setState({ print_url: this._setUrl(Moment(date)) });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { href: this.state.print_url, target: "_blank", className: "print-prog" },
        React.createElement("i", { className: "print-prog-icon" }),
        React.createElement(
          "span",
          { className: "hidden" },
          "Print"
        )
      );
    }
  }]);

  return PrintBtn;
})(React.Component);

module.exports = PrintBtn;
//# sourceMappingURL=print_btn.js.map