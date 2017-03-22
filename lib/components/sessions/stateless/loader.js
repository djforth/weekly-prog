
import React from 'react';

export default function (props) {
  return React.createElement(
    "div",
    { className: "loading" },
    React.createElement(
      "span",
      { className: "hidden" },
      "Loading ",
      props.alt
    )
  );
};