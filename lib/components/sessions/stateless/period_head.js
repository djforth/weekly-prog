import React from 'react';

export default function (props) {
  return React.createElement(
    "header",
    { className: "section-header" },
    React.createElement(
      "h1",
      { className: "gg beta secondary" },
      props.title
    )
  );
};