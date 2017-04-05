import _ from 'lodash/core';

export default function (items) {
  var txt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Sessions for ';

  return _.map(items, function (item, i) {
    item.name = _.clone(item.title);
    item.title = txt + ' ' + item.name;
    item.active = i === 0;
    return item;
  });
};