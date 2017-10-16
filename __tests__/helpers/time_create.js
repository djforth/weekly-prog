import Moment from 'moment';

export default  function(st, fn, amount='hours'){
  var [type, time] = st;
  st = Moment()[type](time, amount);

  var [type, time] = fn;
  fn = Moment()[type](time, amount);

  return [st.toDate(), fn.toDate()];
}
;
