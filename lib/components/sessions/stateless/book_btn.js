
import React from 'react';

import _ from 'lodash/core';

import TranslationHelper from '@morsedigital/i18n_helper';

var wp = TranslationHelper('javascript')('weekly_programme');

function checkBook(url) {
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places) {
  return _.isNumber(places) && places === 0;
}

export default function (_ref) {
  var instruction = _ref.instruction,
      link = _ref.link,
      places = _ref.places,
      title = _ref.title;

  if (instruction) {
    return React.createElement(
      'span',
      { className: 'session-full' },
      instruction
    );
  }

  if (checkPlaces(places)) {
    return React.createElement(
      'span',
      { className: 'session-full' },
      wp('additional.session_full')
    );
  }

  if (checkBook(link)) {
    return React.createElement(
      'a',
      { className: 'button button-primary', href: link },
      title
    );
  }

  return React.createElement(
    'span',
    { className: 'session-full' },
    wp('additional.no_booking')
  );
};