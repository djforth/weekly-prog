import _ from 'lodash/core';
import DataManager from 'datamanager';
import Immutable from 'immutable';

class SessionsFcty extends DataManager {

  checkInPeriod(time, st, fn){
    if (
        !(_.isNumber(st) &&
          _.isNumber(fn) &&
          _.isDate(time)
          )
      ){
      return false;
    }

    return time.getHours() >= st &&
      time.getHours() <= fn;
  }

  checkFilter(filter, id){
    if (_.isArray(filter)) return _.includes(filter, id);

    return filter === id;
  }

  filter(key, id){
    if (!this.data) return Immutable.fromJS([]);

    return this.data.filter((d)=>{
      if (!d.has('filters')) return false;

      let filters = d.get('filters');
      if (!filters.has(key)) return false;

      return this.checkFilter(filters.get(key), id);
    });
  }

  getTimePeriod(st, fn){
    if (!this.data) return Immutable.fromJS([]);

    if (!this.key) return this.data;

    return this.data.filter((d)=>{
      if (!d.has(this.key)) return false;

      let time = d.get(this.key);
      return this.checkInPeriod(time, st, fn);
    });
  }

  setTimeKey(key){
    this.key = key;
  }

  size(){
    return (this.data) ? this.data.size : 0;
  }
}

export default SessionsFcty;
