const moment = require('moment-strftime')
    , _      = require("lodash/core");

_.partial = require("lodash/partial");


function getFormat(col){
  if(_.has(col, "fmt")) return col.fmt;

  if(_.has(col, "type") && col.type === "dateTime"){
    return "%d/%m/%Y %H:%M";
  }

  return "%d/%m/%Y";
}

function displayData(data, col){
  if(!_.isDate(data)) return data;
  return moment(data).strftime(getFormat(col));
}

function getValue(item, keys){
  if(_.isString(keys)) return item.get(keys);
  return _.map(keys, (key)=>{
    return item.get(key);
  })
}


function concatValues(item, col){
  let concat = item([col.key, col.concat]);
  return _.map(concat, (d)=>{
    return displayData(d, col);
  }).join(` ${col.split} `);
}



module.exports = function(item){
  let value = _.partial(getValue, item);

  return (col)=>{
    return (_.has(col, "concat")) ? concatValues(value, col) : value(col.key);
  }
}
