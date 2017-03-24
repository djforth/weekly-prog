import React from 'react';

var arrowStyles = {
  fill: 'none',
  stroke: '#cfcfcf',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: 10
};

export default (function (_ref) {
  var onClick = _ref.onClick;

  return React.createElement(
    'a',
    { href: '#',
      className: 'nav-mover move-right svg-arrow-right',
      onClick: onClick },
    React.createElement(
      'div',
      { className: 'svg-arrow' },
      React.createElement(
        'svg',
        { viewBox: '0 0 15 25', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement('path', { style: arrowStyles, d: 'M1.8 23.2L13.9 13C9.9 9.4 5.8 5.8 1.8 2.2' })
      )
    )
  );
});
//# sourceMappingURL=arrow_right.js.map