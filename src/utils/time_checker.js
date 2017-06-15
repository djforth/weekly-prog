
import _ from 'lodash';
import Moment from 'moment';

function isnow(st, fn){
  let now = Moment();
  return (
        (now.isAfter(st) || now.isSame(st)) &&
        (now.isBefore(fn) || now.isSame(fn))
        );
}

function ispast(fn){
  let now = Moment();
  return now.isAfter(fn);
}

export default function(item, col){
  let times = _.pick(col, ['key', 'concat']);
  let [stk, fnk] = _.values(times);
  let [st, fn]   = [item.get(stk), item.get(fnk)];

  return {
    isNow: ()=>isnow(st, fn)
    , isPast: ()=>ispast(fn)
    , setNowOrPast: (now, past = '', fallback = '')=>{
      if (!_.isNull(now) && isnow(st, fn)) return now;
      if (ispast(fn)) return past;
      return fallback;
    }
  };
};
