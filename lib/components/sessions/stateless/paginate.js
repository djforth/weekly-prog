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
    global.paginate = mod.exports;
  }
})(this, function (module, exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    return _react2.default.createElement(
      "div",
      { className: props.css },
      _react2.default.createElement(
        "a",
        { href: "#", onClick: props.onClick, className: "button button-pagination" },
        "Load More"
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