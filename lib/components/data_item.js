"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react"),
    _ = require("lodash");

var ColumnsStore = require("../stores/columns_store");

var timeChecker = require("../utils/time_checker"),
    formatter = require("../utils/formatter");

//Mixins
var mixins = require("morse-react-mixins");
var cssMixins = mixins.css_mixins;
var textMixins = mixins.text_mixins;

var DataItem = (function (_React$Component) {
  _inherits(DataItem, _React$Component);

  function DataItem(props) {
    _classCallCheck(this, DataItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataItem).call(this, props));

    _this.active = [{ active: false }];
    // this._select.bind(this);
    _this.formatter = formatter(_this.props.data);
    _this.state = { data: _this.props.data, columns: [], datefield: [] };

    return _this;
  }

  _createClass(DataItem, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.mounted = true;
      this.setState({ data: this.props.data, columns: ColumnsStore.getVisible() });
      ColumnsStore.addChangeListener("change", this._onChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      ColumnsStore.removeChangeListener("change", this._onChange);
    }
  }, {
    key: "_actions",
    value: function _actions(col) {
      var item = this.props.data;
      var places = item.get("places_left");
      if (_.isNumber(places) && places === 0) {
        return React.createElement(
          "span",
          { className: "session-full" },
          "Session full"
        );
      }

      if (item.has("buttons") && item.get("buttons").has("book")) {
        var link = item.get("buttons").get("book");
        return link === "#" || _.isEmpty(link) ? "" : React.createElement(
          "a",
          { className: "button button-secondary", href: link },
          "Book"
        );
      }

      return "";
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      if (this.mounted) {
        this.setState({
          columns: ColumnsStore.getVisible()
        });
      }
    }
  }, {
    key: "_rawMarkup",
    value: function _rawMarkup(data) {
      return React.createElement("span", { dangerouslySetInnerHTML: { __html: data } });
    }
  }, {
    key: "_renderColumn",
    value: function _renderColumn(col, item) {
      return React.createElement(
        "div",
        { className: this.checkCss(this.props.css, col.key), key: _.uniqueId("dataItem") },
        this._wrapper(item, col)
      );
    }
  }, {
    key: "_renderTd",
    value: function _renderTd() {
      var item = this.props.data;
      if (item && this.state.columns) {
        var td = _.map(this.state.columns, (function (col) {

          return this._renderColumn(col, item);
        }).bind(this));

        return td;
      }
      return "";
    }
  }, {
    key: "_setCss",
    value: function _setCss(item, col) {

      if (!col.type === "time" || _.isUndefined(col.concat)) return col.wrapper;

      var checker = timeChecker(item, col);
      return col.wrapper + " " + checker.setNowOrPast("now", "past");
    }
  }, {
    key: "_showValues",
    value: function _showValues(col) {
      if (col.key === "actions") return this._actions(col);

      var value = this.formatter(col);
      if (_.isString(value) && value.match(/<|>/g)) return this._rawMarkup(value);
      if (col.type !== "time") return value;
      var checker = timeChecker(this.props.data, col);
      return checker.setNowOrPast("Now", "Finished", value);
    }
  }, {
    key: "_wrapper",
    value: function _wrapper(item, col) {
      if (_.has(col, "wrapper")) {
        return React.createElement(
          "div",
          { className: this._setCss(item, col) },
          this._showValues(col)
        );
      }

      return this._showValues(col);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "row tr vPad5" },
        this._renderTd()
      );
    }
  }]);

  return DataItem;
})(React.Component);

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
//# sourceMappingURL=data_item.js.map