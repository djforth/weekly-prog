
import React from 'react';

import _ from 'lodash';

import TranslationHelper from '@morsedigital/i18n_helper';

let wp = TranslationHelper('javascript')('weekly_programme');

function checkBook(url){
  return !_.isEmpty(url) && url !== '#';
}

function checkPlaces(places){
  return _.isNumber(places) && places === 0;
}

export default function({instruction, link, places, title}){
  if (instruction){
    return (<span className="session-full">{instruction}</span>);
  }

  if (checkPlaces(places)){
    return (<span className="session-full">{wp('additional.session_full')}</span>);
  }

  if (checkBook(link)){
    return (<a className="button button-primary" href={link}>{title}</a>);
  }

  return (<span className="session-full">{wp('additional.no_booking')}</span>);
};
