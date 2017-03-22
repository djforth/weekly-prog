
import _ from 'lodash';
import Moment from 'moment';
import Immutable from 'immutable';
import getStFn from './time_create';


// function getStFn(st, fn, amount='hours'){
//   var [type, time] = st;
//   st = Moment()[type](time, amount);

//   var [type, time] = fn;
//   fn = Moment()[type](time, amount);

//   return [st.toDate(), fn.toDate()]
// }

export default function(no){
  let i = 0;
  let sessions = []
  do{
    var [st, fn] = getStFn(['add', i], ['add', i+1]);
    let session = {
      title: `session ${i}`
      , start: st
      , finish: fn
      , id: i
      , filters: {
        foo: (i%2 === 0) ? 1 :2
        , bar: (i%2 === 0) ? [1, 2] : [3, 4]
      }
    }

    sessions.push(session);
    i++;
  } while(i < no)

  return sessions
}