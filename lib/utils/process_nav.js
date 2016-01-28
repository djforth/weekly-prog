"use strict";

var _ = require("lodash");

module.exports = function (items) {
  var txt = arguments.length <= 1 || arguments[1] === undefined ? "Sessions for " : arguments[1];

  return _.map(items, function (item, i) {
    item.name = _.clone(item.title);
    item.title = txt + " " + item.name;
    item.active = i === 0;
    return item;
  });
};
//# sourceMappingURL=process_nav.js.map