const _ = require("lodash");

const React = require("react");
const ReactDom = require('react-dom')

const WeeklyProg = require("../../src/components/weekly_prog")

console.log("hello", WeeklyProg )



ReactDom.render(
  <WeeklyProg />,
  document.getElementById('weekly-prog')
);