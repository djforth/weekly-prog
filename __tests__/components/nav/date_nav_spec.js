
import _ from 'lodash';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import DateNav from '../../../src/components/nav/date_nav';

import jasmineReactHelpers from '@djforth/react-jasmine-wp';

const storeListeners  = jasmineReactHelpers.checkListeners;
const componentHelper = jasmineReactHelpers.componentHelpers;

import checkCalls from '@djforth/morse-jasmine-wp/check_calls';

import checkMulti from '@djforth/morse-jasmine-wp/check_multiple_calls';

import GetMod from '@djforth/morse-jasmine-wp/get_module';
const getMod = GetMod(DateNav);
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();
import Stubs from '@djforth/morse-jasmine-wp/stub_inner';
const stubs = Stubs(DateNav);
import getStFn from '../../helpers/time_create';


let device = 'mobile';

let colStubs = [
    {title: 'addChangeListener'}
    , {title: 'removeChangeListener'}
    , {title: 'getDevice', returnValue: device}
  ];

let sesStubs = [
    {title: 'addChangeListener'}
    , {title: 'removeChangeListener'}
    , {title: '_getAllDates', returnValue: [{today: new Date()}]}
  ];

// Stub components
let spys = [
  {
    fn: function(){
      return  (<div>{this.props.get('title')}</div>);
    }
    , title: 'NavItem'
  }
  , {
    fn: function(){
      return  (<div>Today</div>);
    }
    , title: 'TodayItem'
  }
];

xdescribe('Datenav', function(){
  let date_nav, ColumnsStore, SessionsStore;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, DateNav);

  beforeEach(function(){
    ColumnsStore = getMod('ColumnsStore');
    SessionsStore = getMod('SessionsStore');
    storeListeners.stubStore(ColumnsStore, colStubs);
    storeListeners.stubStore(SessionsStore, sesStubs);
  });
});
