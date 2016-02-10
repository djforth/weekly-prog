
const _           = require("lodash/core");
const DataManager = require("datamanager");
const Immutable   = require("immutable")

class SessionsFcty extends DataManager {

  checkInPeriod(time, st, fn){
    if(
        !(_.isNumber(st)
          && _.isNumber(fn)
          && _.isDate(time)
          )
      ) {
      return false;
    }

    return time.getHours() >= st
           && time.getHours() <= fn
  }

  checkFilter(filter, id){
    if(_.isArray(filter)) return _.includes(filter, id)

    return filter === id;
  }

  filter(key, id){
    if(!this.data) return Immutable.fromJS([]);

    return this.data.filter((d)=>{
      if(!d.has("filters")) return false;

      let filters = d.get("filters");
      if(!filters.has(key)) return false;

      return this.checkFilter(filters.get(key), id);
    })
  }

  getTimePeriod(st, fn){
    // console.log(this.data)
    if(!this.data) return Immutable.fromJS([]);

    return this.data.filter((d)=>{
      if(this.key && d.has(this.key)){
        let time = d.get(this.key);

        return this.checkInPeriod(time, st, fn);
      }
      return false;
    })
  }

  setTimeKey(key){
    this.key = key;
  }

  size(){
    return (this.data) ? this.data.size : 0
  }
}

module.exports = SessionsFcty;
