
const _           = require("lodash");
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

  getTimePeriod(st, fn){
    // console.log(this.data)
    if(!this.data) return Immutable.fromJS([]);

    return this.data.filter((d)=>{
      let time = d.get(this.key);

      return this.checkInPeriod(time, st, fn);
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
