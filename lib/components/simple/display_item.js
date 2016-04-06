"use strict";

var React = require("react"),
    _ = require("lodash/core");

var timeChecker = require("../utils/time_checker"),
    formatter = require("../utils/formatter");

var BookBtn = require('./simple/book_btn'),
    Time = require('./simple/time'),
    RichText = require('./simple/richtext');

function getBook(item) {
  var places = item.get("places_left");
  var link = item.has("buttons") && item.get("buttons").has("book") ? item.get("buttons").get("book") : null;

  return { places: places, link: link };
}

function actions(col) {
  var item = this.props.item;
  var places = item.get("places_left");
  var link = item.has("buttons") && item.get("buttons").has("book") ? item.get("buttons").get("book") : null;

  return React.createElement(BookBtn, { places: places, link: link });
}

function showContent(value) {
  return React.createElement(RichText, { content: value });
}

function showTime(value) {
  return React.createElement(Time, {
    cols: this.props.col,
    checker: timeChecker(this.props.item, this.props.col),
    time: value,
    cancelled: this.props.item.has('cancelled')

  });
}

module.exports = function (props) {
  var col = props.col;
  if (col.key === "actions") {
    var book = getBook(props.item);
    return React.createElement(BookBtn, {
      places: book.places,
      link: book.link
    });
  }

  var value = props.formatter(col);
  if (props.col.type !== "time") {
    return React.createElement(RichText, { content: value });
  }

  return React.createElement(Time, {
    cols: props.col,
    checker: timeChecker(props.item, props.col),
    time: value,
    cancelled: props.item.has('cancelled')
  });
};
//# sourceMappingURL=display_item.js.map