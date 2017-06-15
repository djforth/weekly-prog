(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react);
    global.period_head = mod.exports;
  }
})(this, function (module, exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    return _react2.default.createElement(
      "header",
      { className: "section-header" },
      _react2.default.createElement(
        "h1",
        { className: "gg beta secondary" },
        props.title
      )
    );
  };

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports["default"];
});