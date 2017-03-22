require('babel-polyfill');

const _        = require('lodash/core')
    , React    = require('react')
    , ReactDom = require('react-dom');

import '../stylesheets/application.scss';

let sessions = require('../spec/data/sessions.js');
const WeeklyProg = require('./components/weekly_prog');

function createColumns(){
  let columns = [{key: 'id'}, {key: 'cancelled'}];
  let additional = _.partial(addColumn, {show: true});
  let mobile     = _.partial(addColumn, {desktop: true, mobile: true, tablet: true, show: true});
  let mobile_only = _.partial(addColumn, {desktop: false, mobile: true, tablet: false, show: false});
  let tablet     = _.partial(addColumn, {desktop: true, mobile: false, tablet: true, show: true});
  let tabletNoShow = _.partial(addColumn, {desktop: true, mobile: false, tablet: true, show: false});
  let desktop    = _.partial(addColumn, {desktop: true, mobile: false, tablet: false, show: true});
  let action = _.partial(addColumn, {desktop: true, mobile: false, tablet: true, show: false});

  function addColumn(defaults, keys){
    return _.map(keys, (k)=>{
      k = (_.isString(k)) ? {key: k} :  k;
      return _.defaults(k, defaults);
    });
  }

  let obj;

  obj = {
    additional: (keys)=>{
      columns = columns.concat(additional(keys));
      return obj;
    }
    , addMobile: (keys)=>{
      columns = columns.concat(mobile(keys));
      return obj;
    }
    , addMobileOnly: (keys)=>{
      columns = columns.concat(mobile_only(keys));
      return obj;
    }
    , addTablet: (keys)=>{
      columns = columns.concat(tablet(keys));
      return obj;
    }

    , addTabletNoShow: (keys)=>{
      columns = columns.concat(tabletNoShow(keys));
      return obj;
    }

    , addDesktop: (keys)=>{
      columns = columns.concat(desktop(keys));
      return obj;
    }

    , value: ()=>columns
  };

  return obj;
}

let cols = createColumns();
cols.addMobile([
  {
    key: 'start'
    , title: 'time'
    , concat: 'finish'
    , split: '- '
    , wrapper: 'pill-weekly mobile-time'
    , type: 'time'
    , fmt: '%H: %M'
  }
  , {key: 'session', wrapper: 'session-title'}
  , {key: 'expand', title: ''}
])
.addMobileOnly([{key: 'actions', title: ''}])
.addTabletNoShow(['location'])
.addDesktop(['instructor', 'activity'])
.addTabletNoShow([{key: 'actions', title: ''}])
.additional(['description']);

let css = {
  default: 'col-lg-2 col-md-3 col-sm-5'
  , places_left: 'col-lg-1'
  , activity: 'col-lg-1'
  , start: 'col-lg-2 col-md-3 mb mb-start'
  , session: 'col-lg-2 col-md-3 mb mb-session'
  , expand: 'col-lg-1 col-md-2 mb expander'
  , location: 'col-lg-2 col-md-2 mb mb-locations'
  , actions: 'col-lg-1 col-md-1 mb mb-actions center'
};

let timeperiod = [
  {title: 'Morning', time: {st: 0, fn: 11}}
  , {title: 'Afternoon', time: {st: 12, fn: 17}}
  , {title: 'Evening', time: {st: 18, fn: 23}}
];

ReactDom.render(
  <WeeklyProg
    columns     = {cols.value()}
    css         = {css}
    groupby     = "start"
    locales     = "en"
    no_sessions = "There are no activities this"
    print       = "/timetable/print/:date/timetable.pdf"
    sessionsApi = "/api/timetable.json"
    sessions    = {sessions(1, new Date())}
    timeperiod  = {timeperiod}
  />,
  document.getElementById('weekly-prog')
);
