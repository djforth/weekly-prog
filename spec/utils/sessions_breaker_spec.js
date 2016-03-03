const _         = require("lodash");

const Breaker = require("../../src/utils/sessions_breaker");

let json       = []
let with_dates = []
let i = 0;

function createSession(i, t){
  let time_str = (t === "morning") ? "09:00" : "18:00";
  let time     = (t === "morning") ? 9 : 18
  return {
    start_time:`2015-01-${18+i} ${time_str}`
  , title:`${t} session ${i}`
  , groupBy: new Date(2015, 0, 18+i, time)
  }
}

do{
  let morning = createSession(i, "morning");
  with_dates.push(morning);
  json.push(_.omit(morning, "groupBy"));

  let afternoon = createSession(i, "afternoon");
  with_dates.push(afternoon);
  json.push(_.omit(afternoon, "groupBy"));

  i++;
} while(i < 4);

// console.log("dates", with_dates.length)

describe('SessionsBreaker', function() {
  let breaker, spy, revert;

  describe('makeDates', function() {
    let df, make_dates, new_sessions;

    beforeEach(function() {
      // df = Breaker.__get__("Moment");
      // spyOn(df, "toDate").and.callThrough();

      make_dates   = Breaker.__get__("makeDates");
      new_sessions = make_dates(json, "start_time");
    });



    xit('should call date formatter', function() {
      let toDate = df.prototype.dfDate;
      expect(toDate).toHaveBeenCalled()

      expect(getDate.calls.count()).toEqual(json.length);

    });

    it('should add groupBy attribute', function() {
      let groupBy  = new_sessions[0].groupBy

      expect(_.isDate(groupBy)).toBeTruthy();
    });


  });

  describe('groupSessions', function() {
    let group_sessions, groups, checker, spy;

    beforeEach(function() {
      spy = jasmine.createSpy("checker").and.callFake((c, d)=>{
        return c.getDate() === d.getDate()
       });
      checker = Breaker.__set__("checker", spy);

      group_sessions = Breaker.__get__("groupSessions");
      groups         = group_sessions(with_dates);
    });

    afterEach(()=>{
      checker();
    })

    it('should return object', function() {
      expect(_.isObject(groups)).toBeTruthy();
    });

    it('should have keys that are dates', function() {
      let keys = _.keys(groups)
      expect(keys.length).toEqual(4);
      _.forEach(keys, (k)=>{
        expect(_.isString(k)).toBeTruthy();
        expect(k).toMatch(/\d*-\d*-\d*/)
      })
    });

    it('should add sessions', function() {
      let values = _.map(_.values(groups), "sessions")
      expect(values.length).toEqual(4);
      _.forEach(values, (v)=>{
        expect(_.isArray(v)).toBeTruthy();
        expect(v.length).toEqual(2);
      })
    });

    it('should add dates', function() {
      let values = _.map(_.values(groups), "date")
      expect(values.length).toEqual(4);
      _.forEach(values, (v)=>{
        expect(_.isDate(v)).toBeTruthy();
      })
    });
  });

  describe('api', function() {
    // let makeDates;
    let groupSpy, group_revert, fillGapsSpy, fillGapsRevert;
    beforeEach(()=>{
      //Stub make dates
      spy = jasmine.createSpy("makeDates").and.returnValue(with_dates);
      revert  = Breaker.__set__("makeDates", spy);

      //Stub group session
      groupSpy = jasmine.createSpy("groupSessions").and.returnValue("foo");
      group_revert  = Breaker.__set__("groupSessions", groupSpy);

      fillGapsSpy = jasmine.createSpy("fillGaps").and.returnValue("some dates");
      fillGapsRevert  = Breaker.__set__("fillGaps", fillGapsSpy);

      breaker = Breaker(json, "start_time");
    });

    afterEach(()=>{
      revert();
      fillGapsRevert();
      group_revert();
    })

    it('should call make dates', function() {
       expect(spy).toHaveBeenCalled();
       let calls = spy.calls.argsFor(0);
       expect(calls).toContain(json);
       expect(calls).toContain("start_time");
    });

    it('should call groupSessions', function() {
       expect(groupSpy).toHaveBeenCalled();
       let calls = groupSpy.calls.argsFor(0);
       expect(calls).toContain(with_dates);

       // //Check return
       // expect(breaker).toEqual("foo");
    });

    it('should call fillGaps', function() {
       expect(fillGapsSpy).toHaveBeenCalled();
       let calls = fillGapsSpy.calls.argsFor(0);
       expect(calls).toContain("foo");

       //Check return
       expect(breaker).toEqual("some dates");
    });


  });


});