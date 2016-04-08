"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react"),
    ReactDOM = require('react-dom'),
    _ = require("lodash/core");
_.take = require("lodash/take");
_.mapValues = require("lodash/mapValues");
_.reject = require("lodash/reject");

// Utils
var checker = require("../utils/day_checker");

//Mixins
var cssMixins = require("morse-react-mixins").css_mixins,
    textMixins = require("morse-react-mixins").text_mixins,
    widthsMixins = require("morse-react-mixins").widths_mixins;

//Flux
var SessionsActions = require("../actions/sessions_actions"),
    SessionsStore = require("../stores/sessions_store"),
    ColumnsStore = require("../stores/columns_store");

var NavItem = require("./simple/nav_item"),
    TodayItem = require('./simple/today_nav_item');
// , TodayItem   = require("./today_nav_item")

var DateNav = function (_React$Component) {
  _inherits(DateNav, _React$Component);

  function DateNav(props) {
    _classCallCheck(this, DateNav);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateNav).call(this, props));

    var dates = _this._splitDates();
    var today = dates[0];
    var current = today.date;
    _this.pos = 0;
    _this.state = { dates: dates[1], today: today, current: current, listWidth: 1000, listPos: 0 };

    return _this;
  }

  _createClass(DateNav, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log(this._setWidth())
      this.setState({ listWidth: this._setWidth() });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var holderWidth = document.querySelector(".list-holder").offsetWidth;
      var listWidth = this._setWidth();
      if (listWidth !== this.state.listWidth) {
        this.setState({ listWidth: this._setWidth() });
      } else {
        var widths = this.state.listWidth + this.state.listPos;

        if (holderWidth > widths) {
          SessionsActions.getMoreDays();
        }
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      SessionsStore.addChangeListener("fetched", this._getDates.bind(this));
      SessionsStore.addChangeListener("changing_date", this._getDates.bind(this));
      SessionsStore.addChangeListener("calendar_changing", this._reset.bind(this));
      ColumnsStore.addChangeListener("change", this._deviceChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener("calendar_changing", this._reset);
      SessionsStore.removeChangeListener("fetched", this._getDates);
      SessionsStore.removeChangeListener("changing_date", this._getDates);
      ColumnsStore.removeChangeListener("change", this._deviceChange);
    }
  }, {
    key: "_deviceChange",
    value: function _deviceChange() {
      console.log("WTF>>>>>>>>>>>>>>>> ITEM", ColumnsStore.getDevice());
      this.setState({ listWidth: this._setWidth(), device: ColumnsStore.getDevice() });
    }
  }, {
    key: "_getDates",
    value: function _getDates() {
      var dates = this._splitDates();
      var today = dates[0];
      if (!_.isDate(today.date) || !_.isDate(SessionsStore._getCurrentDate())) {
        alert(today.date + " : " + SessionsStore._getCurrentDate());
      }
      this.setState({
        dates: dates[1],
        today: today,
        listWidth: this._setWidth(),
        current: SessionsStore._getCurrentDate()
      });
    }
  }, {
    key: "_getDistance",
    value: function _getDistance(move) {
      if (_.isEmpty(move)) return 0;

      return _.reduce(move, function (prev, cur) {
        return prev + cur;
      });
    }
  }, {
    key: "_getPrevious",
    value: function _getPrevious(pos) {
      if (pos >= 0) {
        var tomorrow = _.clone(this.state.today.date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        var firstDate = _.first(this.state.dates).date;
        if (!checker(tomorrow, firstDate)) {
          SessionsActions.getPreviousDays(firstDate);
        }
      }
    }
  }, {
    key: "_mover",
    value: function _mover(dir, e) {
      e.preventDefault();
      var elms = this.getAllWidths();
      if (dir === "left" && this.pos > 0) {
        this.pos--;
      } else if (dir === "right" && this.pos < elms.length) {
        this.pos++;
      }

      var move = _.map(_.take(elms, this.pos), "width");
      var mover = -this._getDistance(move);
      this.setState({ listPos: mover });
      this._getPrevious(mover);
    }
  }, {
    key: "_setCurrent",
    value: function _setCurrent(date, e) {
      e.preventDefault();
      console.log("date", date);
      SessionsActions.changeDate(date);
      this.setState({ current: date });
    }
  }, {
    key: "_setActive",
    value: function _setActive(date) {
      return checker(date, this.state.current) ? 'active' : '';
    }
  }, {
    key: "_setStyle",
    value: function _setStyle() {

      var styles = { "width": this.state.listWidth, left: this.state.listPos };
      return _.mapValues(styles, function (v) {
        return v.toString();
      });
    }
  }, {
    key: "_setWidth",
    value: function _setWidth() {
      this.convertDomlist(this.refs.datelist.querySelectorAll("li"));
      return Math.ceil(this.getWidths());
    }
  }, {
    key: "_splitDates",
    value: function _splitDates() {
      var dates = SessionsStore._getAllDates();
      return [_.find(dates, function (d) {
        return d.today;
      }), _.reject(dates, function (d) {
        return d.today;
      })];
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.setState({ listPos: 0 });
    }
  }, {
    key: "_renderDates",
    value: function _renderDates() {
      var _this2 = this;

      if (this.state.dates.length) {
        return _.map(this.state.dates, function (d) {
          var key = _this2.createId(d.title, d.date.getDate(), d.date.getMonth());
          return React.createElement(NavItem, {
            key: key,
            nav_item: d,
            device: _this2.state.device,
            onClick: _this2._setCurrent.bind(_this2, d.date),
            active: _this2._setActive(d.date)
          });
        });
      }

      return [];
    }
  }, {
    key: "_renderToday",
    value: function _renderToday() {
      var today = this.state.today;
      var key = this.createId(today.title, today.date.getDate(), today.date.getMonth());
      return React.createElement(TodayItem, {
        key: key,
        nav_item: today,
        device: this.state.device,
        onClick: this._setCurrent.bind(this, today.date),
        active: this._setActive(today.date)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        { className: "date-nav" },
        React.createElement(
          "a",
          { href: "#", className: "nav-mover move-left", onClick: this._mover.bind(this, "left") },
          React.createElement(
            "span",
            { className: "hidden" },
            "left"
          )
        ),
        this._renderToday(),
        React.createElement(
          "div",
          { className: "list-holder" },
          React.createElement(
            "ul",
            { className: "date-list", role: "tablist", ref: "datelist", style: this._setStyle() },
            this._renderDates()
          )
        ),
        React.createElement(
          "a",
          { href: "#", className: "nav-mover move-right", onClick: this._mover.bind(this, "right") },
          React.createElement(
            "span",
            { className: "hidden" },
            "right"
          )
        )
      );
    }
  }]);

  return DateNav;
}(React.Component);

Object.assign(DateNav.prototype, cssMixins);
Object.assign(DateNav.prototype, textMixins);
Object.assign(DateNav.prototype, widthsMixins);

module.exports = DateNav;
//# sourceMappingURL=date_nav.js.map