const _ = require('lodash')
    , Moment  = require('moment')
    , Immutable = require("immutable");

var TimeChecker = require("../../src/utils/time_checker");


const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , checkMulti = require('@djforth/morse-jasmine/check_multiple_calls')
  , getMod     = require("@djforth/morse-jasmine/get_module")(TimeChecker)
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(TimeChecker)
  , getStFn = require('../helpers/time_create')

// function getStFn(st, fn, amount='hours'){
//   var [type, time] = st;
//   st = Moment()[type](time, amount);

//   var [type, time] = fn;
//   fn = Moment()[type](time, amount);

//   return [st.toDate(), fn.toDate()]
// }

var [st, fn] = getStFn(['subtract', 1], ['add', 1]);
let mockdata = {
  start: st
  , finish: fn
}

let dataIm = Immutable.fromJS(mockdata);

let col = {key:'start', concat:'finish'}

describe('time_checker', function() {
  describe('isNow', function() {
    let isNow;
    beforeEach(function() {
      isNow = getMod('isnow');
    });

    it('should return true if now is between start & finish', function() {
      var [st, fn] = getStFn(['subtract', 1], ['add', 1]);
      expect(isNow(st, fn)).toBeTruthy();
    });

    it('should return false if now is not between start & finish', function() {
      var [st, fn] = getStFn(['subtract', 2], ['subtract', 1]);
      expect(isNow(st, fn)).toBeFalsy();
    });
  });

  describe('isPast', function() {
    let isPast;
    beforeEach(function() {
      isPast = getMod('ispast');
    });

    it('should return true if time is in past', function() {
      var [st, fn] = getStFn(['subtract', 1], ['subtract', 1]);
      expect(isPast(fn)).toBeTruthy();
    });

    it('should return false if now is not between start & finish', function() {
      var [st, fn] = getStFn(['subtract', 2], ['add', 1]);
      expect(isPast(fn)).toBeFalsy();
    });
  });

  describe('main', function() {
    let n, p, tc;
    beforeEach(function() {
      stubs.addSpy(["ispast", "isnow"]);
      stubs.setSpies([
        {title:'isnow', func:"callFake", value:()=>n}
        ,  {title:'ispast', func:"callFake", value:()=>p}
      ]);

      tc = TimeChecker(dataIm, col);
    });

    afterEach(function () {
      stubs.revertAll();
    });

    describe('isNow && isPast', function() {

      let calls = {
        'isNow':[()=>{
            tc.isNow();
            return stubs.getSpy('isnow')
          }
        , ()=>[mockdata.start, mockdata.finish]
        ]
       , 'isPast':[()=>{
          tc.isPast();
          return stubs.getSpy('ispast')
        }
        , ()=>[mockdata.finish]
        ]
      }
      checkMulti(calls);
    });

    describe('setNowOrPast', function() {
      let now  = 'now text';
      let past = 'past text';
      let fb   = 'fallback';
      it('should return now text', function() {
        n = true;
        let txt = tc.setNowOrPast(now, past, fb);
        expect(txt).toEqual(now);
      });

      it('should return past text', function() {
        n = false;
        p = true;
        let txt = tc.setNowOrPast(now, past, fb);
        expect(txt).toEqual(past);
      });

      it('should return fallback text', function() {
        n = false;
        p = false;
        let txt = tc.setNowOrPast(now, past, fb);
        expect(txt).toEqual(fb);
      });
    });
  });
});