 import Fetch from '@djforth/ajax-es6-fp/fetch';
 import Moment from 'moment';

 import _ from 'lodash';
 import includes from 'lodash/includes';
 import reject from 'lodash/reject';

let currentRequests = [];

function setApi(api, date){
  if (!_.isDate(date)) return api;

  let dateFmt = Moment(date);
  let path = dateFmt.format('/YYYY/MM/DD[.json]');
  return api.replace(/.json/, path);
}

export default function(api){
  if (!api){
    throw new Error('api url required');
  }

  let progress, date;

  return {
    addProgress: (p)=>{
      progress = (_.isFunction(p)) ? p : null;
      return progress;
    }

    , addQuery: (d)=>{
      date = (_.isDate(d)) ? d : null;
      return date;
    }

    , fetch: ()=>{
      let url = setApi(api, date);
      if (includes(currentRequests, url)) return null;
      currentRequests.push(url);
      const fetch = Fetch(setApi(api, date));
      console.log('Fetch', Fetch);
      console.log('fetch', fetch);
      return fetch().then((data)=>{
          currentRequests = reject(currentRequests, (cr)=>cr === url);
          // console.log(currentRequests)
          return data;
        })
        .catch((err)=>{
          throw new Error(err);
        });
    }
  };
};
