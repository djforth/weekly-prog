
import React from 'react';

import {manageTranslations as TranslationHelper} from '@morsedigital/i18n_helper';

let wp = TranslationHelper('javascript')('weekly_programme');

 const Cancelled = (props)=>{
  let title = `The session between ${props.time} is cancelled`;
  return (<span title={title}>{wp('additional.cancelled')}</span>);
};

export default Cancelled;
