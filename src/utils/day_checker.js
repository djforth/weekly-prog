import _ from 'lodash/core';
let checkers = ['getDate', 'getMonth', 'getFullYear'];

export default function(check, checkee){
  let test = false;

  _.forEach(checkers, (checker)=>{
    test = check[checker]() === checkee[checker]();
    return test;
  });

  return test;
};
