
import _ from 'lodash';

import React from 'react';
import TestUtils from 'react-addons-test-utils';


import WeeklyProg from '../../src/components/weekly_prog';


xdescribe("WeeklyProg", function() {
  let weekly_prog;
  beforeEach(()=>{
    weekly_prog = TestUtils.renderIntoDocument(<WeeklyProg />);
  });

  it("should exist", function() {
    expect(weekly_prog).toBeDefined();
  });
});