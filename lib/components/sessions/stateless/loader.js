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
    global.loader = mod.exports;
  }
})(this, function (module, exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    return _react2.default.createElement(
      "div",
      { className: "loading" },
      _react2.default.createElement(
        "span",
        { className: "hidden" },
        "Loading ",
        props.alt
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