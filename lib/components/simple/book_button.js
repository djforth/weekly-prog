"use strict";

function checkBook(url) {
  return !_.isEmpty(url) || url !== "#";
}

function checkBook(places) {
  return _.isNumber(places) && places === 0;
}

module.exports = function (props) {
  if (checkBook(props.places)) {
    return React.createElement(
      "span",
      { className: "session-full" },
      "Session full"
    );
  }

  if (checkBook(props.link)) {
    return React.createElement(
      "a",
      { className: "button button-secondary", href: props.link },
      "Book"
    );
  }

  return React.createElement(
    "span",
    { className: "session-full" },
    "No booking required"
  );
};
//# sourceMappingURL=book_button.js.map