
import moment from 'moment-strftime';
import _ from 'lodash';
import partial from 'lodash/partial';
_.partial = partial;
import includes from 'lodash/includes';
_.includes = includes;

function getFormat(col) {
  if (_.has(col, 'fmt')) return col.fmt;

  if (_.has(col, 'type') && col.type === 'dateTime') {
    return '%d/%m/%Y %H:%M';
  }

  return '%d/%m/%Y';
}

function displayData(data, col) {
  if (!_.isDate(data)) return data;
  return moment(data).strftime(getFormat(col));
}

function getValue(item) {
  var data = item;
  return function (keys) {
    if (_.isUndefined(keys)) return null;
    if (_.isString(keys)) return data.get(keys);
    var values = keys.map(function (key) {
      return data.get(key);
    });

    return values;
  };
}

function concatValues(item, col) {
  var concat = item([col.key, col.concat]);
  var val = _.map(concat, function (d) {
    var data = displayData(d, col);

    return data;
  });

  return val.join(' ' + col.split + ' ');
}

export default function (item) {
  var value = getValue(item);

  return function (col) {
    return _.has(col, 'concat') ? concatValues(value, col) : value(col.key);
  };
};