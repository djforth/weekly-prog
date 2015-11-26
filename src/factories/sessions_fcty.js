
const _           = require("lodash");
const DataManager = require("datamanager");

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
    // console.log(time.getHours())
    // console.log(st, fn);
    return time.getHours() >= st
           && time.getHours() <= fn
  }

  getTimePeriod(st, fn){
    return this.data.filter((d)=>{
      let time = d.get(this.key);
      // console.log(time, this.checkInPeriod(time, st, fn))
      return this.checkInPeriod(time, st, fn);
    })
  }

  setTimeKey(key){
    this.key = key;
  }
}

module.exports = SessionsFcty;
