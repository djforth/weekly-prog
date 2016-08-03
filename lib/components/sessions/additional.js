'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react');
var _ = require('lodash/core');
_.includes = require('lodash/includes');
_.reject = require('lodash/reject');

var ColumnsStore = require('../../stores/columns_store');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins;
var textMixins = require('morse-react-mixins').text_mixins;

var AdditionalContent = require('./stateless/additional_content'),
    BookBtn = require('./stateless/book_btn'),
    Description = require('./stateless/description'),
    RichText = require('./stateless/richtext');

var Additional = function (_React$Component) {
  _inherits(Additional, _React$Component);

  function Additional(props) {
    _classCallCheck(this, Additional);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Additional).call(this, props));

    _this.state = { columns: ColumnsStore.getShowable() };
    return _this;
  }

  _createClass(Additional, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.mounted = true;
      this.setState({ columns: ColumnsStore.getShowable() });
      ColumnsStore.addChangeListener('change', this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      ColumnsStore.removeChangeListener('change', this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      if (this.mounted) {
        this.setState({
          columns: ColumnsStore.getShowable()
        });
      }
    }
  }, {
    key: '_checkButton',
    value: function _checkButton(item) {
      return item.has('buttons') && item.get('buttons').has('book');
    }
  }, {
    key: '_renderActions',
    value: function _renderActions() {
      var col = void 0,
          link = void 0,
          item = void 0,
          key = void 0,
          places = void 0;

      col = _.filter(this.state.columns, { key: 'actions' });
      if (_.isEmpty(col)) return '';

      item = this.props.data;
      places = item.get('places_left');
      link = this._checkButton(item) ? item.get('buttons').get('book') : null;
      key = this.createId(col.key, item.get('id'));

      return React.createElement(BookBtn, {
        places: places,
        link: link,
        key: key
      });
    }
  }, {
    key: '_renderList',
    value: function _renderList() {
      var _this2 = this;

      var data = void 0,
          extra = void 0;
      data = this.props.data;

      extra = _.reject(this.state.columns, { key: 'description' });
      extra = _.reject(extra, { key: 'actions' });
      if (data && extra) {
        var li = _.map(extra, function (col) {
          var key = _this2.createId(col.key, _this2.props.data.get('id'));
          return React.createElement(
            'li',
            { className: 'list-group-item col-md-4',
              key: key },
            React.createElement(
              'strong',
              null,
              col.title,
              ': '
            ),
            React.createElement(AdditionalContent, {
              col: col,
              item: data
            })
          );
        });

        return li;
      }

      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'additional ' + this.props.active },
        React.createElement(
          'ul',
          { className: this.props.info },
          this._renderList()
        ),
        React.createElement(
          'div',
          { className: 'description' },
          React.createElement(RichText, { content: this.props.data.get('description') })
        ),
        this._renderActions()
      );
    }
  }]);

  return Additional;
}(React.Component);

Object.assign(Additional.prototype, cssMixins);
Object.assign(Additional.prototype, textMixins);

module.exports = Additional;