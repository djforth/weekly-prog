const React = require('react');

import TranslationHelper from '@djforth/I18n_helper';

let wp = TranslationHelper('javascript')('weekly_programme');

module.exports = function(props){
  let fmt = props.date;
  if (props.device === 'mobile'){
    return (
      <span>
        <span className="nav-date">{fmt.format('DD')}</span>
        <span className="nav-day">{wp('time_periods.today')}</span>
      </span>
    );
  }
  return <span>{`${wp('time_periods.today')} ${fmt.format('Do')}`}</span>;
};
