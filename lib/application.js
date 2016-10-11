'use strict';

require('../stylesheets/application.scss');

require('babel-polyfill');

var _ = require('lodash/core'),
    React = require('react'),
    ReactDom = require('react-dom');

var sessions = require('../spec/data/sessions.js');
var WeeklyProg = require('./components/weekly_prog');

function createColumns() {
  var columns = [{ key: 'id' }, { key: 'cancelled' }];
  var _additional = _.partial(addColumn, { show: true });
  var mobile = _.partial(addColumn, { desktop: true, mobile: true, tablet: true, show: true });
  var mobile_only = _.partial(addColumn, { desktop: false, mobile: true, tablet: false, show: false });
  var tablet = _.partial(addColumn, { desktop: true, mobile: false, tablet: true, show: true });
  var tabletNoShow = _.partial(addColumn, { desktop: true, mobile: false, tablet: true, show: false });
  var desktop = _.partial(addColumn, { desktop: true, mobile: false, tablet: false, show: true });
  var action = _.partial(addColumn, { desktop: true, mobile: false, tablet: true, show: false });

  function addColumn(defaults, keys) {
    return _.map(keys, function (k) {
      k = _.isString(k) ? { key: k } : k;
      return _.defaults(k, defaults);
    });
  }

  var obj = void 0;

  obj = {
    additional: function additional(keys) {
      columns = columns.concat(_additional(keys));
      return obj;
    },
    addMobile: function addMobile(keys) {
      columns = columns.concat(mobile(keys));
      return obj;
    },
    addMobileOnly: function addMobileOnly(keys) {
      columns = columns.concat(mobile_only(keys));
      return obj;
    },
    addTablet: function addTablet(keys) {
      columns = columns.concat(tablet(keys));
      return obj;
    },

    addTabletNoShow: function addTabletNoShow(keys) {
      columns = columns.concat(tabletNoShow(keys));
      return obj;
    },

    addDesktop: function addDesktop(keys) {
      columns = columns.concat(desktop(keys));
      return obj;
    },

    value: function value() {
      return columns;
    }
  };

  return obj;
}

var cols = createColumns();
cols.addMobile([{
  key: 'start',
  title: 'time',
  concat: 'finish',
  split: '- ',
  wrapper: 'pill-weekly mobile-time',
  type: 'time',
  fmt: '%H: %M'
}, { key: 'session', wrapper: 'session-title' }, { key: 'expand', title: '' }]).addMobileOnly([{ key: 'actions', title: '' }]).addTabletNoShow(['location']).addDesktop(['instructor', 'activity', { key: 'places_left', wrapper: 'places' }]).addTabletNoShow([{ key: 'actions', title: '' }]).additional(['description']);

var css = {
  default: 'col-lg-2 col-md-3 col-sm-5',
  places_left: 'col-lg-1',
  activity: 'col-lg-1',
  start: 'col-lg-2 col-md-3 mb mb-start',
  session: 'col-lg-2 col-md-3 mb mb-session',
  expand: 'col-lg-1 col-md-2 mb expander',
  location: 'col-lg-2 col-md-2 mb mb-locations',
  actions: 'col-lg-1 col-md-1 mb mb-actions center'
};

var timeperiod = [{ title: 'Morning', time: { st: 0, fn: 11 } }, { title: 'Afternoon', time: { st: 12, fn: 17 } }, { title: 'Evening', time: { st: 18, fn: 23 } }];

ReactDom.render(React.createElement(WeeklyProg, {
  columns: cols.value(),
  css: css,
  groupby: 'start',
  no_sessions: 'There are no activities this',
  print: '/timetable/print/:date/timetable.pdf',
  sessionsApi: '/api/timetable.json',
  sessions: sessions(1, new Date()),
  timeperiod: timeperiod
}), document.getElementById('weekly-prog'));
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createColumns, 'createColumns', 'src/application.js');

  __REACT_HOT_LOADER__.register(cols, 'cols', 'src/application.js');

  __REACT_HOT_LOADER__.register(css, 'css', 'src/application.js');

  __REACT_HOT_LOADER__.register(timeperiod, 'timeperiod', 'src/application.js');
}();

;