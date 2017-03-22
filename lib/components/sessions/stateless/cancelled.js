
import React from 'react';

import TranslationHelper from '@djforth/I18n_helper';

var wp = TranslationHelper('javascript')('weekly_programme');

export default function (props) {
  var title = 'The session between ' + props.time + ' is cancelled';
  return React.createElement(
    'span',
    { title: title },
    wp('additional.cancelled')
  );
};