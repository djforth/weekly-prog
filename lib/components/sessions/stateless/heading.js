

import React from 'react';

export default function (props) {
  return React.createElement(
    'div',
    { className: props.css },
    props.title
  );
};