
import React from 'react';

import TranslationHelper from '@djforth/I18n_helper';

var wp = TranslationHelper('javascript')('weekly_programme');

export default function (props) {
  var fmt = props.date;
  if (props.device === 'mobile') {
    return React.createElement(
      'span',
      null,
      React.createElement(
        'span',
        { className: 'nav-date' },
        fmt.format('DD')
      ),
      React.createElement(
        'span',
        { className: 'nav-day' },
        wp('time_periods.today')
      )
    );
  }
  return React.createElement(
    'span',
    null,
    wp('time_periods.today') + ' ' + fmt.format('Do')
  );
};
//# sourceMappingURL=today_display.js.map