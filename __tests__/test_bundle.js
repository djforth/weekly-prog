// require('babel-polyfill')
let testsContext = require.context('.', true, /_spec$/);
testsContext.keys().forEach(testsContext);
