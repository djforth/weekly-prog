"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash");

// Flux
var ColumnsStore = require("../stores/columns_store");
var SessionsStore = require("../stores/sessions_store");

//Components
var DataItem = require("./data_item");

// Mixins
var cssMixins = require("morse-react-mixins").css_mixins;

var DataExpanderItem = (function (_DataItem) {
  _inherits(DataExpanderItem, _DataItem);

  function DataExpanderItem(props) {
    _classCallCheck(this, DataExpanderItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataExpanderItem).call(this, props));

    _this.active = [{ active: false }];
    _this.answer = ["collapse", { "in": false }];
    _this.chevron = ["glyphicon", { "glyphicon-chevron-up": false }, { "glyphicon-chevron-down": true }];
    _this.state = {
      acc_css: _this.getClasses(_this.answer),
      active: _this.getClasses(_this.active),
      chevron: _this.getClasses(_this.chevron),
      css: "col-md-1",
      device: "desktop",
      selected: false,
      show_additional: false
    };

    return _this;
  }

  _createClass(DataExpanderItem, [{
    key: "_onClick",
    value: function _onClick(e) {
      e.preventDefault();
      var show = this.state.show_additional ? false : true;

      this.active = this.toggleCss(this.active);
      this.answer = this.toggleCss(this.answer);
      this.chevron = this.toggleCss(this.chevron);
      this.setState({
        acc_css: this.getClasses(this.answer),
        active: this.getClasses(this.active),
        chevron: this.getClasses(this.chevron),
        show_additional: show
      });
    }
  }, {
    key: "_renderAll",
    value: function _renderAll(visible) {
      var _this2 = this;

      var data = this.props.data;

      if (data && visible) {

        var li = _.map(visible, function (col) {
          return _this2._renderItem(col, data);
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
          { className: "list-group " + this.state.acc_css, key: "additonal" + this.props.data.get("id") },
          this._renderAll(extra)
        ));
        additional.push(React.createElement(
          "div",
          { className: "description" },
          this._rawMarkup(this.props.data.get("description"))
        ));

        var action = _.where(visible, { key: "actions" });
        // console.log("action", action)
        if (!_.isEmpty(action)) {
          additional.push(this._actions(this.props.data, action));
        }
      } else {
        additional = "";
      }

      return additional;
    }
  }, {
    key: "_renderItem",
    value: function _renderItem(col, data) {
      // let title = _.find(visible, {key:key}).title
      return React.createElement(
        "li",
        { className: "list-group-item col-md-4", key: col.title + data.get("id") },
        React.createElement(
          "strong",
          null,
          col.title,
          ":"
        ),
        " ",
        this._displayData(data, col)
      );
    }
  }, {
    key: "_renderShowButton",
    value: function _renderShowButton() {
      var buttonText = undefined;

      if (this.state.active) {
        buttonText = "Less Information";
      } else {
        buttonText = "More Information";
      }

      return React.createElement(
        "div",
        { className: this.checkCss(this.props.css, "expand") },
        React.createElement(
          "a",
          { href: "#",
            onClick: this._onClick.bind(this),
            className: "icon icon-information",
            title: buttonText },
          React.createElement(
            "span",
            null,
            buttonText
          )
        )
      );
    }
  }, {
    key: "_renderTd",
    value: function _renderTd() {
      var item = this.props.data;
      if (item && this.state.columns) {
        return _.map(this.state.columns, (function (col) {
          return col.key === "expand" ? this._renderShowButton() : this._renderColumn(col, item);
        }).bind(this));
      }
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "tr " + this.state.active },
        React.createElement(
          "div",
          { className: "clearfix" },
          this._renderTd()
        ),
        React.createElement(
          "div",
          { className: "additional " + this.state.active },
          this._renderAdditional()
        )
      );
    }
  }]);

  return DataExpanderItem;
})(DataItem);

Object.assign(DataExpanderItem.prototype, cssMixins);

module.exports = DataExpanderItem;
//# sourceMappingURL=data_expander_item.js.map