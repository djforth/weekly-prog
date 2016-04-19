'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react');

var DataHead = require('./data_head'),
    DataExpander = require('./data_expander_item'),
    NoSessions = require('./stateless/no_sessions'),
    Paginate = require('./stateless/paginate'),
    PeriodHead = require('./stateless/period_head');

// Flux
var ColumnsStore = require('../../stores/columns_store'),
    SessionsStore = require('../../stores/sessions_store');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins,
    textMixins = require('morse-react-mixins').text_mixins;

var PeriodSessions = function (_React$Component) {
  _inherits(PeriodSessions, _React$Component);

  function PeriodSessions(props) {
    _classCallCheck(this, PeriodSessions);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PeriodSessions).call(this, props));

    var st = void 0,
        fn = void 0,
        sessions = void 0,
        hidden = void 0;
    st = _this.props.time.st;
    fn = _this.props.time.fn;
    sessions = _this.props.sessions.getTimePeriod(st, fn);

    hidden = sessions.size <= 100;
    _this.pagination = ['weekly-pagination', { hidden: hidden }];

    _this.state = {
      columns: [],
      data: sessions,
      keys: [],
      visible: [],
      device: 'desktop',
      paginate: 4,
      pagination_css: _this.getClasses(_this.pagination)
    };
    return _this;
  }

  _createClass(PeriodSessions, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ columns: ColumnsStore.getVisible() });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Data Changers
      ColumnsStore.addChangeListener('change', this._onChange.bind(this));
      SessionsStore.addChangeListener('changing_date', this._onLoaded.bind(this));
      SessionsStore.addChangeListener('fetched', this._onLoaded.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      SessionsStore.removeChangeListener('changing_date', this._onLoaded);
      SessionsStore.removeChangeListener('fetched', this._onLoaded);
      ColumnsStore.removeChangeListener('change', this._onChange);
    }
  }, {
    key: '_renderData',
    value: function _renderData() {
      if (this.state.data && this.state.data.size > 0) {
        return this._renderSessions();
      }
      return this._renderNoSessions();
    }
  }, {
    key: '_renderNoSessions',
    value: function _renderNoSessions() {
      return React.createElement(NoSessions, {
        no_session: this.props.no_sessions,
        title: this.props.title });
    }
  }, {
    key: '_renderSessions',
    value: function _renderSessions() {
      var _this2 = this;

      var data = this.state.data.slice(0, this.state.paginate);
      // console.log(data)
      return data.map(function (d) {
        return React.createElement(DataExpander, {
          css: _this2.props.css,
          data: d,
          key: _this2.createId('session', d.get('id')) });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'section',
        { key: 'items', className: this._setCss() },
        React.createElement(PeriodHead, { title: this.props.title }),
        React.createElement(
          'div',
          { className: 'table' },
          React.createElement(DataHead, { columns: this.state.columns, css: this.props.css }),
          React.createElement(
            'div',
            { className: 'tbody' },
            this._renderData(this.state.paginate)
          )
        ),
        React.createElement(Paginate, {
          css: this.state.pagination_css,
          onClick: this._paginate.bind(this)
        })
      );
    }
  }, {
    key: '_setCss',
    value: function _setCss() {
      return 'panel ' + this.props.title.toLowerCase();
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      var columns = ColumnsStore.getKeyAndTitle();
      this.setState({
        columns: columns
      });
    }
  }, {
    key: '_onLoaded',
    value: function _onLoaded() {
      var sessions = void 0,
          st = void 0,
          fn = void 0;
      st = this.props.time.st;
      fn = this.props.time.fn;
      sessions = SessionsStore._getDate().data;
      sessions = sessions.getTimePeriod(st, fn);
      this.pagination[1].hidden = sessions.size <= 100;
      this.setState({
        paginate: 100,
        pagination_css: this.getClasses(this.pagination),
        data: sessions
      });
    }
  }, {
    key: '_paginate',
    value: function _paginate(e) {
      e.preventDefault();
      var pag = this.state.paginate + 10;
      if (pag > this.state.data.size) {
        this.pagination = this.toggleCss(this.pagination);
      }

      this.setState({
        paginate: pag,
        pagination_css: this.getClasses(this.pagination)
      });
    }
  }]);

  return PeriodSessions;
}(React.Component);

Object.assign(PeriodSessions.prototype, cssMixins);
Object.assign(PeriodSessions.prototype, textMixins);

module.exports = PeriodSessions;
//# sourceMappingURL=period_sessions.js.map