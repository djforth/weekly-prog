const _ = require("lodash")
    , React = require("react")
    , TestUtils = require("react-addons-test-utils");

const WeeklyProg = require("../../src/components/weekly_prog");

xdescribe("WeeklyProg", function() {
  let weekly_prog;
  beforeEach(()=>{
    weekly_prog = TestUtils.renderIntoDocument(<WeeklyProg />);
  });

  it("should exist", function() {
    expect(weekly_prog).toBeDefined();
  });
});