import React from 'react';

var info_styles = {
  fill: 'none',
  stroke: '#e14e00',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2
};

export default function (props) {

  return React.createElement(
    'div',
    { className: props.css },
    React.createElement(
      'a',
      { href: '#',
        onClick: props.expand,
        className: 'svg-information',
        title: props.text },
      React.createElement(
        'svg',
        { id: 'icons', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 42 42', width: '35', height: '35' },
        React.createElement(
          'title',
          null,
          props.text
        ),
        React.createElement('circle', { style: info_styles, cx: '21', cy: '21', r: '20' }),
        React.createElement('line', { style: info_styles, x1: '21', y1: '17.4', x2: '21', y2: '31.2' }),
        React.createElement('ellipse', { style: info_styles, cx: '21', cy: '11.2', rx: '0.6', ry: '0.4' })
      )
    )
  );
};