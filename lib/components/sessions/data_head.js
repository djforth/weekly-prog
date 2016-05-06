'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    _ = require('lodash/core');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins;
var textMixins = require('morse-react-mixins').text_mixins;

var Heading = require('./stateless/heading');

var DataHead = function (_React$Component) {
  _inherits(DataHead, _React$Component);

  function DataHead() {
    _classCallCheck(this, DataHead);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DataHead).apply(this, arguments));
  }

  _createClass(DataHead, [{
    key: 'renderTh',

    // constructor(props){
    //   super(props);
    // }

    value: function renderTh() {
      if (this.props.columns) {
        var th = _.map(this.props.columns, function (col) {
          return React.createElement(Heading, {
            css: this.checkCss(this.props.css, col.key),
            key: this.createId(col.key, this.props.title),
            title: col.title });
        }.bind(this));

        return th;
      }

      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'thead' },
        React.createElement(
          'div',
          { className: 'tr' },
          this.renderTh()
        )
      );
    }
  }]);

  return DataHead;
}(React.Component);

Object.assign(DataHead.prototype, cssMixins);
Object.assign(DataHead.prototype, textMixins);

module.exports = DataHead;