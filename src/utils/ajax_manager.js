 const Ajax  = require("ajax-es6-module")
    ,  _     = require("lodash")
    , DateFormatter = require("date-formatter");

const ajaxManager = new Ajax();

function setApi(api, date){
  if(!_.isDate(date)) return api;

  let dateFmt = new DateFormatter(date);
  let path = dateFmt.formatDate("/%Y/%m/%d.json");
  return api.replace(/.json/, path)
}


module.exports = function(api){
  if(!api){
    throw new Error("api url required");
  }

  let progress, date;

  return {
    addProgress:(p)=>{
      progress = (_.isFunction(p)) ? p : null;
      return progress;
    }

    , addQuery:(d)=>{
      date = (_.isDate(d)) ? d : null;
      return date;
    }

    , fetch:()=>{
      ajaxManager.addUrl(setApi(api, date));
      return ajaxManager.fetch(progress).catch((err)=>{
        throw new Error(err);
      });
    }




  }


}
