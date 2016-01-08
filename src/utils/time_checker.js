
const _       = require("lodash")
    , Moment  = require("moment");


function isNow(st, fn){
  let now = Moment();
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
  let times = _.pick(col, (v, k)=>{
    return _.includes(["key", "concat"], k);
  });
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
