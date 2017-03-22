import React from 'react';

export default function (props) {
  return React.createElement(
    "a",
    { href: props.url, target: "_blank", className: "print-prog" },
    React.createElement("i", { className: "print-prog-icon" }),
    React.createElement(
      "span",
      { className: "hidden" },
      "Print"
    )
  );
};