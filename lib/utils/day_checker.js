'use strict';

var _ = require('lodash/core');
var checkers = ['getDate', 'getMonth', 'getFullYear'];

module.exports = function (check, checkee) {
  var test = false;

  _.forEach(checkers, function (checker) {
    test = check[checker]() === checkee[checker]();
    return test;
  });

  return test;
};
//# sourceMappingURL=day_checker.js.map