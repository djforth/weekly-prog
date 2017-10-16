 import moment from 'moment-strftime';
 import _, {includes, partial} from 'lodash';

_.partial = partial;
_.includes = includes;

function getFormat(col){
  if (_.has(col, 'fmt')) return col.fmt;

  if (_.has(col, 'type') && col.type === 'dateTime'){
    return '%d/%m/%Y %H:%M';
  }

  return '%d/%m/%Y';
}

function displayData(data, col){
  if (!_.isDate(data))  return data;
  return moment(data).strftime(getFormat(col));
}

function getValue(item){
  let data = item;
  return function(keys){
    if (_.isUndefined(keys)) return null;
    if (_.isString(keys)) return data.get(keys);
    let values =  keys.map(function(key){
      return data.get(key);
    });

    return values;
  };
}

function concatValues(item, col){
  let concat = item([col.key, col.concat]);
  let val = _.map(concat, (d)=>{
    let data = displayData(d, col);

    return data;
  });

  return val.join(` ${col.split} `);
}

export default function(item){
  let value = getValue(item);

  return function(col){
    return (_.has(col, 'concat')) ? concatValues(value, col) : value(col.key);
  };
};
