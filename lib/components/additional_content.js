"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash/core");
_.includes = require("lodash/includes");
_.reject = require("lodash/reject");

var ColumnsStore = require("../stores/columns_store");

// Mixins
var cssMixins = require("morse-react-mixins").css_mixins;
var textMixins = require("morse-react-mixins").text_mixins;

var Additional = require('./Additional'),
    Description = require('./simple/description');

var AdditionalContent = function (_React$Component) {
  _inherits(AdditionalContent, _React$Component);

  function AdditionalContent(props) {
    _classCallCheck(this, AdditionalContent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AdditionalContent).call(this, props));
  }

  _createClass(AdditionalContent, [{
    key: "_renderAll",
    value: function _renderAll(visible) {
      var data = this.props.data;

      if (data && visible) {
        var li = _.map(visible, function (col) {
          return React.createElement(Additional, {
            col: col,
            item: data
          });
        });

        return li;
      }

      return "";
    }
  }, {
    key: "_renderAdditional",
    value: function _renderAdditional() {
      var additional = [];

      var visible = ColumnsStore.getShowable();
      // console.log("visible", visible)
      var extra = _.reject(visible, { key: "description" });
      extra = _.reject(extra, { key: "actions" });

      if (this.state.show_additional) {
        additional.push(React.createElement(
          "ul",
          { className: "list-group " + this.state.acc_css, key: this._createKey("additional") },
          this._renderAll(extra)
        ));
        additional.push(React.createElement(
          "div",
          { className: "description", key: this._createKey("description") },
          this._rawMarkup(this.props.data.get("description"))
        ));

        var action = _.filter(visible, { key: "actions" });
        if (!_.isEmpty(action)) {
          additional.push(this._actions(this.props.data, action));
        }
      } else {
        additional = "";
      }

      return additional;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "additional " + this.props.active },
        this._renderAdditional()
      );
    }
  }]);

  return AdditionalContent;
}(React.Component);

Object.assign(Additional.prototype, cssMixins);

Object.assign(Additional.prototype, textMixins);

module.exports = Additional;
//# sourceMappingURL=additional_content.js.map