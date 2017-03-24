
import React from 'react';

import RichText from './richtext';

export default function (props) {
  return React.createElement(
    'div',
    { className: 'description' },
    React.createElement(RichText, { content: props.content })
  );
};
//# sourceMappingURL=description.js.map