
const _       = require("lodash/core")
    , Moment  = require("moment");


_.includes = require('lodash/includes')

function isNow(st, fn){
  let now = Moment();
  // if(now.isAfter(st) || now.isSame(st) || now.isBefore(fn) || now.isSame(fn)){
  //   // console.log(st, fn)
  //   // console.log((now.isAfter(st) || now.isSame(st)) && (now.isBefore(fn) || now.isSame(fn)))
  // }

  return (
        (now.isAfter(st) || now.isSame(st))
        && (now.isBefore(fn) || now.isSame(fn))
        );
}

function isPast(fn){
  let now = Moment();
  return now.isAfter(fn);
}

module.exports = function(item, col){

  let times = _.pick(col, ["key", "concat"]);
  var [stk, fnk] = _.values(times);
  var [st, fn]   = [item.get(stk), item.get(fnk)]



  return {
    isNow:()=>isNow(st, fn)
    , isPast:()=> isPast(fn)
    , setNowOrPast:(now, past="", fallback="")=>{
      if(!_.isNull(now) && isNow(st, fn)) return now;
      if(isPast(fn)) return past;
      return fallback;
    }

  }
}
