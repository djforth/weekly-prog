const _         = require('lodash/core')
    , checkers = ['getDate', 'getMonth', 'getFullYear'];

module.exports = function(check, checkee){
  let test = false;

  _.forEach(checkers, (checker)=>{
    test = check[checker]() === checkee[checker]()
    return test;
  });

  return test

}