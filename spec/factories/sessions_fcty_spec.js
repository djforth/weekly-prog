// const sinon     = require("sinon");
const _         = require("lodash");
const Immutable = require("immutable");

const SessionsFcty  = require("../../src/factories/sessions_fcty");

var md = require('../helpers/data_helper')
  , getStFn = require('../helpers/time_create');

var mockdata = md(10)

describe('SessionsFcty', function() {
  let sessions;

  beforeEach(()=>{
    sessions = new SessionsFcty();
    sessions.add(mockdata);
    sessions.setTimeKey('start')
  })

  describe('set time key', function() {
    it('should set time key ', function() {
      sessions.setTimeKey('foo');
      expect(sessions.key).toEqual('foo')
    });
  });

  describe('size', function() {
    it('should return size', function() {
      expect(sessions.size()).toEqual(10)
    });

    it('should return 0 if no data', function() {
      let s = new SessionsFcty();
      expect(s.size()).toEqual(0)
    });
  });

  describe('checkInPeriod', function() {
    let date = new Date(2013, 0, 28, 2);

    it('should return false if st if not a number', function() {
      expect(sessions.checkInPeriod(new Date(), "foo", 2)).toBeFalsy()
    });

    it('should return false if fn if not a number', function() {
      expect(sessions.checkInPeriod(new Date(), 1, "foo")).toBeFalsy()
    });

    it('should return false if time if not a date object', function() {
      expect(sessions.checkInPeriod('foo', 1, 2)).toBeFalsy()
    });

    it('should return false is hours not between time ', function() {
      expect(sessions.checkInPeriod(date, 3, 4)).toBeFalsy()
    });

    it('should return true if hours are between time ', function() {
      expect(sessions.checkInPeriod(date, 1, 3)).toBeTruthy();
    });
  });

  describe('checkFilters', function() {
    it('should return true if id is in filter array', function() {
      expect(sessions.checkFilter([1,2], 1)).toBeTruthy()
    });

    it('should return false if id is not in filter array', function() {
      expect(sessions.checkFilter([1,2], 3)).toBeFalsy()
    });

    it('should return true if id matches filter', function() {
      expect(sessions.checkFilter(1, 1)).toBeTruthy()
    });

    it('should return false if id does not match filter array', function() {
      expect(sessions.checkFilter([1,2], 3)).toBeFalsy()
    });
  });

  describe('filter', function() {
    beforeEach(function() {
      spyOn(sessions, "checkFilter").and.callThrough();
    });

    it('should return empty data object if no data', function() {
      let s = new SessionsFcty();
      expect(s.data).toBeNull();
      let data = s.filter('foo', 1);
      expect(data.size).toEqual(0);
      expect(sessions.checkFilter).not.toHaveBeenCalled();
    });

    it('should return empty array if no filters', function() {
      let s    = new SessionsFcty();
      s.add(_.map(mockdata, (d)=>{
        return _.omit(d, 'filters');
      }));

      let data = s.filter('foo', 1);
      expect(data.size).toEqual(0)
      expect(sessions.checkFilter).not.toHaveBeenCalled()
    });

    it('should return empty data if no filter', function() {
      let data = sessions.filter('phil', 1);
      expect(data.size).toEqual(0)
      expect(sessions.checkFilter).not.toHaveBeenCalled()
    });

    it('should return data if matches filter', function() {
      let data = sessions.filter('foo', 1);
      expect(data.size).toEqual(5)
      expect(sessions.checkFilter).toHaveBeenCalled()
      expect(sessions.checkFilter.calls.count()).toEqual(10)
    });
  });

  describe('getTimePeriod', function() {
    let st, fn;
    beforeEach(function() {
      var i = 0
      spyOn(sessions, "checkInPeriod").and.callFake((t,s,f)=>{
        i++;
        if(s <= i && f>=i){
          return true;
        }

        if(i > 10) i = 0;

        return false;
      })
      st = 0;
      fn = 5;
      sessions.key = 'start';
    });

    it('should return empty data object if no data', function() {
      let s    = new SessionsFcty()
      expect(s.data).toBeNull()
      let data = s.getTimePeriod(st, fn);
      expect(data.size).toEqual(0)
      expect(sessions.checkInPeriod).not.toHaveBeenCalled()
    });

    it('should return all data if no key', function() {
      sessions.key = null;
      let data = sessions.getTimePeriod(st, fn);
      expect(data.size).toEqual(10)
      expect(sessions.checkInPeriod).not.toHaveBeenCalled()
    });

    it('should return no data if data does not have key', function() {
      sessions.key = 'foo';
      let data = sessions.getTimePeriod(st, fn);
      expect(data.size).toEqual(0)
      expect(sessions.checkInPeriod).not.toHaveBeenCalled()
    });

    it('should return data within period', function() {
      let data = sessions.getTimePeriod(st, fn);
      expect(data.size).toEqual(5)
      expect(sessions.checkInPeriod).toHaveBeenCalled();
      expect(sessions.checkInPeriod.calls.count()).toEqual(10)
    });
  });
});