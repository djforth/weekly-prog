const Ajax  = require('ajax-es6-module')
    , Moment = require('moment-strftime');

const _ = require('lodash/core')
     , includes = require('lodash/includes')
     , reject   = require('lodash/reject');

const ajaxManager = new Ajax();

let currentRequests = [];

function setApi(api, date){
  if (!_.isDate(date)) return api;

  let dateFmt = Moment(date);
  let path = dateFmt.strftime('/%Y/%m/%d[.json]');
  return api.replace(/.json/, path);
}

module.exports = function(api){
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
      ajaxManager.addUrl(setApi(api, date));

      return ajaxManager.fetch(progress)
        .then((data)=>{
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
