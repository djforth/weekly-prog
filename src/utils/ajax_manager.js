 const Ajax  = require("ajax-es6-module")
    ,  _     = require("lodash");

const ajaxManager = new Ajax();

function setApi(api, date){
  return (_.isString(date)) ? `${api}?date=${date}` : api;
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
      date = (_.isDate(d)) ? d.toJSON() : null;
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
