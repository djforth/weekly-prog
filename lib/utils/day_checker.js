import _ from 'lodash';
var checkers = ['getDate', 'getMonth', 'getFullYear'];

export default function (check, checkee) {
  var test = false;

  _.forEach(checkers, function (checker) {
    test = check[checker]() === checkee[checker]();
    return test;
  });

  return test;
};