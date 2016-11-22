const React = require('react');

import TranslationHelper from '@djforth/I18n_helper';

let wp = TranslationHelper('javascript')('weekly_programme');

module.exports = function(props){
  let title = `The session between ${props.time} is cancelled`;
  return (<span title={title}>{wp('additional.cancelled')}</span>);
};
