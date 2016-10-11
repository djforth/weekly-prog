const _ = require('lodash')
    , React = require('react')
    , TestUtils = require('react-addons-test-utils');


const DateNav   = require('../../../src/components/nav/date_nav');

const jasmineReactHelpers = require('@djforth/react-jasmine-wp');

const storeListeners  = jasmineReactHelpers.checkListeners;
const componentHelper = jasmineReactHelpers.componentHelpers;

const checkCalls = require('@djforth/morse-jasmine-wp/check_calls')
  , checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , getMod     = require('@djforth/morse-jasmine-wp/get_module')(DateNav)
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(DateNav)
  , getStFn = require('../../helpers/time_create');

let device = 'mobile';

let colStubs = [
    {title:'addChangeListener'},
    {title:'removeChangeListener'},
    {title:'getDevice', returnValue:device}
  ]

let sesStubs = [
    {title:'addChangeListener'},
    {title:'removeChangeListener'},
    {title:'_getAllDates', returnValue:[{today:new Date()}]}
  ]

//Stub components
let spys = [
  {
    fn:function(){
      return  (<div>{this.props.get('title')}</div>);
    },
    title:'NavItem'
  }
  , {
    fn:function(){
      return  (<div>Today</div>);
    },
    title:'TodayItem'
  }
];

xdescribe('Datenav', function() {
  let date_nav, ColumnsStore, SessionsStore;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, DateNav);

  beforeEach(function() {
    ColumnsStore = getMod('ColumnsStore');
    SessionsStore = getMod('SessionsStore');
    storeListeners.stubStore(ColumnsStore, colStubs);
    storeListeners.stubStore(SessionsStore, sesStubs);
  });
});
