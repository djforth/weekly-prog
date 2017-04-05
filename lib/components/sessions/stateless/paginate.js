import React from 'react';

export default function (props) {
  return React.createElement(
    "div",
    { className: props.css },
    React.createElement(
      "a",
      { href: "#", onClick: props.onClick, className: "button button-pagination" },
      "Load More"
    )
  );
};