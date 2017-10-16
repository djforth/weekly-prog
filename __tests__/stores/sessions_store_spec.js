import _ from 'lodash';
import Immutable from 'immutable';

import SessionsStore from '../../src/stores/sessions_store';

import {storeHelpers as storeHelper} from '@djforth/react-jasmine-wp';
import {checkDefaults as defaultsHelper} from '@djforth/react-jasmine-wp';

function createSession(i, t){
  let time_str = (t === 'morning') ? '09:00' : '18:00';
  let time     = (t === 'morning') ? 9 : 18;
  return {
    start_time: `2015-01-${18+i} ${time_str}`
  , title: `${t} session ${i}`
  , groupBy: new Date(2015, 0, 18+i, time)
  };
}

let mockData    = {};
let unprocessed = [];
let processed   = [];

let i = 0;

do {
  let morning   = createSession(i, 'morning');
  let afternoon = createSession(i, 'afternoon');

  unprocessed.push(_.omit(morning, 'groupBy'));
  unprocessed.push(_.omit(afternoon, 'groupBy'));

  processed.push(morning);
  processed.push(afternoon);

  mockData[`2015-01-${18+i}`] = {
      date: new Date(2015, 0, 18)
    , sessions: [morning, afternoon]
  };
  i++;
} while (i < 4);

// console.log(mockData)

describe('SessionsStore', function(){
  let options = [
     {
      func: '_setDate'
      , action: {
        type: 'CHANGE_DATE'
        , date: 1
      }
      , args: [1]
      , change: 'changing_date'
    }
    , {
      func: '_calendarChange'
      , action: {
        type: 'CALENDAR_CHANGE'
        , date: 1
      }
      , args: [1]
      , change: 'calendar_changing'
    }
    , {
      func: '_getMoreDays'
      , action: {
        type: 'MORE_DAYS'
      }
      , args: []
      , change: 'more_days'
    }
    , {
      func: '_fetchData'
      , action: {
        type: 'FETCH_DATA'
        , date: 1
      }
      , args: [1]
      , change: 'fetching'
    }
    , {
      func: '_addSessions'
      , action: {
        type: 'PRERENDER_DATA'
        , data: 'foo'
      }
      , args: 'foo'
      , change: 'prerender'
    }
    , {
      func: '_setGroups'
      , action: {
        type: 'SET_GROUPBY'
        , groupBy: 'foo'
      }
      , args: 'foo'
      , change: 'groupby'
    }
    , {
      func: '_setApi'
      , action: {
        type: 'SET_API'
        , url: 'foo'
      }
      , args: 'foo'
      , change: 'api_set'
    }
  ];

  storeHelper.checkDispatcher(SessionsStore, 'registeredCallback', options);


  storeHelper.checkChangeEvents(()=>{
    return SessionsStore.__get__('store');
  });

  describe('currentDate', function(){
    let currentDate;
    beforeEach(function(){
      currentDate = SessionsStore.__get__('currentDate');
    });

    it('should set date if date passed', function(){
      let d = new Date(2015, 0, 18);
      let cd = currentDate(d);
      expect(cd.getDate()).toEqual(d);
    });

     it('should set date if not date passed', function(){
      let cd = currentDate();
      expect(_.isDate(cd.getDate())).toBeTruthy();
    });

    it('should allow you to set date', function(){
      let d  = new Date(2015, 0, 18);
      let d2 = new Date(2013, 0, 28);
      let cd = currentDate(d);
      cd.setDate(d2);
      expect(cd.getDate()).toEqual(d2);
    });
  });

  describe('processData', function(){
    let  addDate, Breaker, DateManager, processData, sessions, spy, dmSpy, adSpy;
    beforeEach(function(){
      adSpy = jasmine.createSpy('addDate');
      dmSpy = jasmine.createSpy('DateManager').and.returnValue({
        addDate: adSpy
      });

      DateManager = SessionsStore.__set__('DateManager', dmSpy);

      spy = jasmine.createSpy('Breaker').and.returnValue(mockData);
      Breaker     = SessionsStore.__set__('Breaker', spy);

      processData = SessionsStore.__get__('processData');
      sessions = processData('start_time');
    });

    afterEach(()=>{
      Breaker();
      DateManager();
    });

    it('should set up sessions', function(){
      expect(dmSpy).toHaveBeenCalled();
    });

    xit('should call breaker', function(){
      sessions(unprocessed);
      expect(spy).toHaveBeenCalledWith(unprocessed, 'start_time');
    });

    it('should add dates', function(){
      sessions(unprocessed);
      expect(adSpy).toHaveBeenCalled();
      expect(adSpy.calls.count()).toEqual(4);

      let calls = adSpy.calls.argsFor(0);
      let data = mockData['2015-01-18'];
      expect(calls).toContain(data.date);
      expect(calls).toContain(data.sessions);
    });
  });

  describe('processDates', function(){
    let dates = [];
    let i = 0;
    let date = new Date();
    date.setDate(date.getDate()-2);
    do {
      let d = new Date(date.getTime());
      d.setDate(d.getDate()+i);
      dates.push({date: d});
      i++;
    } while (i < 7);

    let pDates;
    beforeEach(function(){
      pDates = SessionsStore.__get__('processDates');
    });

    it('should return array if empty', function(){
      let result = pDates([]);
      expect(result).toEqual([]);
    });

    it('should only return array with no past dates', function(){
      let result = pDates(dates);
      expect(result.length).toEqual(5);
    });
  });


  describe('store functions', function(){
    let processor, store, sessions, fcty, spy;
     beforeEach(()=>{
      store    = SessionsStore.__get__('store');
      });

    describe('_addSessions', function(){
      beforeEach(function(){
        spy       = jasmine.createSpy('sessions').and.returnValue(['sessions']);
        processor = SessionsStore.__set__('processor', spy);
        sessions  = SessionsStore.__get__('sessions');
        store._addSessions(unprocessed);
      });

      afterEach(function(){
        processor();
      });

      it('should call processor', function(){
        expect(spy).toHaveBeenCalledWith(unprocessed);
      });

      it('should set sessions', function(){
        expect(sessions).toEqual(['sessions']);
      });
    });

    describe('_calendarChange', function(){
      let date;
      beforeEach(function(){
        date = new Date();
        spyOn(store, '_setDate');
        spyOn(store, '_fetchData');
        store._calendarChange(date);
      });

      it('should call _setDate', function(){
        expect(store._setDate).toHaveBeenCalledWith(date);
      });

      it('should call _fetchData', function(){
        expect(store._fetchData).toHaveBeenCalledWith(date, true);
      });
    });

    describe('_setApi', function(){
      let AjaxManager, am, amSpy;
      beforeEach(function(){
        amSpy = jasmine.createSpy('AjaxManager').and.returnValue('ajax');
        AjaxManager = SessionsStore.__set__('AjaxManager', amSpy);
        am = SessionsStore.__get__('ajaxManager');
        store._setApi('http://astainforth.com');
      });

      afterEach(()=>{
         AjaxManager();
      });

      it('should call AjaxManger', function(){
        expect(amSpy).toHaveBeenCalledWith('http://astainforth.com');
      });

      it('should set ajaxManger', function(){
        expect(am).toEqual('ajax');
      });
    });

    describe('_setGroups', function(){
      let processData, processor, spy;
      beforeEach(function(){
        spy         = jasmine.createSpy('processData').and.returnValue('processor');
        processData = SessionsStore.__set__('processData', spy);
        processor   = SessionsStore.__get__('processor');
        store._setGroups('start_time');
      });

      afterEach(function(){
        processData();
      });

      it('should call AjaxManger', function(){
        expect(spy).toHaveBeenCalledWith('start_time');
      });

      it('should set ajaxManger', function(){
        expect(processor).toEqual('processor');
      });
    });

    describe('_fetchData', function(){
      let date;
      beforeEach(function(){
        date = new Date(2015, 0, 18);
      });

      it('should throw error if ajaxManager not set', function(){
        let ajax = SessionsStore.__set__('ajaxManager', undefined);
        expect(()=>{
          store._fetchData(date);
        }).toThrowError('please set API path');
      });

      describe('when ajaxManager set', function(){
        let ajax, processor, promise, pSpy, resolve, reject, sessions, spy, sessionsSpy, date;
        beforeEach(function(){
          spyOn(store, '_fetchRest');
          spyOn(store, 'emitChange');
          date = new Date(2015, 0, 18);
          spy    = jasmine.createSpyObj('ajaxManager', ['addQuery', 'fetch']);
          ajax   = SessionsStore.__set__('ajaxManager', spy);

          promise = new Promise((res, rej)=>{
            resolve = res;
            reject  = rej;
          });

          spy.fetch.and.returnValue(promise);
          sessionsSpy = jasmine.createSpyObj('Sessions', ['getAllDates']);
          sessionsSpy.getAllDates.and.returnValue('new date');
          pSpy = jasmine.createSpy('processor').and.returnValue(sessionsSpy);
          processor = SessionsStore.__set__('processor', pSpy);
          store._fetchData(date);
        });

        afterEach(()=>{
          ajax();
          processor();
        });

        it('should call addQuery', function(){
          expect(spy.addQuery).toHaveBeenCalledWith(date);
        });

        it('should call fetch', function(){
          expect(spy.fetch).toHaveBeenCalled();
        });

        it('should fetch data', function(done){
          spy.fetch().then((data)=>{
            sessions  = SessionsStore.__get__('sessions');
            expect(pSpy).toHaveBeenCalled();
            expect(sessionsSpy.getAllDates).toHaveBeenCalled();
            expect(sessions).toEqual(sessionsSpy);
            expect(store.emitChange).toHaveBeenCalledWith('fetched');
          }).then((data)=>{
            expect(store._fetchRest).toHaveBeenCalled();
          });

          resolve('success');

          setTimeout(function(){
              done();
            }, 100);
        });
      });
    });

    describe('_fetchNowNext', function(){
      let ajax, processor, promise, pSpy, resolve, reject, sessions, spy, sessionsSpy, date;
      beforeEach(function(){
        spyOn(store, 'emitChange');
        spy    = jasmine.createSpyObj('ajaxManager', ['fetch']);
        ajax   = SessionsStore.__set__('ajaxManager', spy);

        promise = new Promise((res, rej)=>{
          resolve = res;
          reject  = rej;
        });

        spy.fetch.and.returnValue(promise);
        pSpy = jasmine.createSpy('processor').and.returnValue(sessionsSpy);
        processor = SessionsStore.__set__('processor', pSpy);
        store._fetchNowNext();
      });

      afterEach(()=>{
        ajax();
        processor();
      });


      it('should call fetch', function(){
        expect(spy.fetch).toHaveBeenCalled();
      });

      it('should fetch data', function(done){
        spy.fetch().then((data)=>{
          sessions  = SessionsStore.__get__('sessions');
          expect(sessions).toEqual(sessionsSpy);
          expect(store.emitChange).toHaveBeenCalledWith('fetched');
          expect(pSpy).toHaveBeenCalled();
        });

        resolve('success');

        setTimeout(function(){
            done();
          }, 100);
      });
    });

    describe('_fetchrest', function(){
      let data;
      beforeEach(function(){
        spyOn(store, '_fetchData');
        data = [{date: new Date(2015, 1, 18), nosessions: false}
               , {date: new Date(2015, 1, 19), nosessions: true}
               , {date: new Date(2015, 1, 20), nosessions: true}
               , {date: new Date(2015, 1, 21), nosessions: true}
               , {date: new Date(2015, 1, 22), nosessions: false}
              ];
      });

      it('should call fetchData', function(){
        store._fetchRest(data);
        expect(store._fetchData).toHaveBeenCalledWith(new Date(2015, 1, 19));
      });

      it('should not call fetchData if all fetched', function(){
        data = _.map(data, (d)=>{
          d.nosessions = false;
          return d;
        });
        store._fetchRest(data);
        expect(store._fetchData).not.toHaveBeenCalled();
      });
    });

    describe('_getCurrentDate', function(){
      it('should call getDate', function(){
        let spy = jasmine.createSpyObj('current', ['getDate']);
        spy.getDate.and.returnValue('a date');
        store.current = spy;
        expect(store._getCurrentDate()).toEqual('a date');
        expect(spy.getDate).toHaveBeenCalled();
      });
    });

    describe('_getDate', function(){
      let processor, spy;

      let current, currentDate, date, sessions, cSpy, sSpy, cdSpy;
      beforeEach(function(){
        date = new Date(2015, 0, 18);
        cSpy = jasmine.createSpyObj('current', ['setDate', 'getDate']);
        cSpy.getDate.and.returnValue(date);
        cdSpy =  jasmine.createSpy('currentDate').and.returnValue(cSpy);
        currentDate = SessionsStore.__set__('currentDate', cdSpy);

        sSpy = jasmine.createSpyObj('sessions', ['findDate']);
        // sSpy.findDate.and.returnValue("foo");

        sessions = SessionsStore.__set__('sessions', sSpy);

        spyOn(store, '_fetchData');
        spyOn(store, 'emitChange');
      });

      it('should create current if not created', function(){
        store.current = undefined;
        store._getDate(date);
        expect(cdSpy).toHaveBeenCalledWith(date);
      });

      it('should call setDate', function(){
        store.current = cSpy;
        store._getDate(date);
        expect(cSpy.setDate).toHaveBeenCalledWith(date);
      });

      it('should return day data if available', function(){
        store.current = undefined;
        sSpy.findDate.and.returnValue('foo');
        // store.current = cSpy;
        let data = store._getDate(date);

        expect(cSpy.getDate).toHaveBeenCalled();
        expect(sSpy.findDate).toHaveBeenCalledWith(date);
        expect(data).toEqual('foo');

        expect(store._fetchData).not.toHaveBeenCalled();
        expect(store.emitChange).not.toHaveBeenCalled();
      });

      it('should fetch date if no date found', function(){
        store.fetched = false;
        store.current = undefined;
        sSpy.findDate.and.returnValue(null);
        // store.current = cSpy;
        let data = store._getDate(date);

        expect(cSpy.getDate).toHaveBeenCalled();
        expect(sSpy.findDate).toHaveBeenCalledWith(date);
        expect(data).toBeNull();

        expect(store._fetchData).toHaveBeenCalledWith(date);
        expect(store.emitChange).toHaveBeenCalledWith('fetching');
      });
    });

    describe('_getFacility', function(){
      let spyS, spyD, spyF, revert, revert2;
      beforeEach(()=>{
        spyF = jasmine.createSpy('filter');
        spyS = jasmine.createSpyObj('sessions', ['findDate']);
        spyS.findDate.and.returnValue({data: {filter: spyF}});
        revert  = SessionsStore.__set__('facility', 'foo');
        revert2 = SessionsStore.__set__('sessions', spyS);
        store._getFacility();
      });

      afterEach(function(){
        revert();
        revert2();
      });

      it('should call chained session functions', function(){
        expect(spyS.findDate).toHaveBeenCalled();
        let calls = spyS.findDate.calls.argsFor(0);
        expect(_.isDate(calls[0])).toBeTruthy();

        expect(spyF).toHaveBeenCalled();
        calls = spyF.calls.argsFor(0);
        expect(calls[0]).toEqual('facility');
        expect(calls[1]).toEqual('foo');
      });
    });

    describe('_getPreviousDays', function(){
      let revert, date, spy;
      beforeEach(function(){
        date = new Date(2015, 0, 18);
        spy = jasmine.createSpyObj('sessions', ['getPreviousDays']);

        revert = SessionsStore.__set__('sessions', spy);
        spyOn(store, '_fetchData');
      });

      afterEach(function(){
        revert();
      });

      it('should call getPreviousDays', function(){
        let d = new Date();
        store._getPreviousDays(d);
        expect(spy.getPreviousDays).toHaveBeenCalledWith(d);
        expect(store._fetchData).not.toHaveBeenCalled();
      });

      it('if returns date should fentch data', function(){
        spy.getPreviousDays.and.returnValue(date);
        let d = new Date();
        store._getPreviousDays(d);

        expect(spy.getPreviousDays).toHaveBeenCalledWith(d);
        expect(store._fetchData).toHaveBeenCalledWith(date);
      });
    });

    describe('_getAllDates', function(){
      let spy, revert;
      beforeEach(function(){
        spy    = jasmine.createSpy('processDates').and.returnValue(['dates']);
        revert = SessionsStore.__set__('processDates', spy);
      });

      afterEach(function(){
        revert();
      });

      it('should return array with date', function(){
        let r = SessionsStore.__set__('sessions', undefined);
        let d = store._getAllDates();
        expect(_.isDate(d[0])).toBeTruthy();
        expect(spy).not.toHaveBeenCalled();
        r();
      });

      it('should all dates', function(){
        let spy2 = jasmine.createSpyObj('sessions', ['getAllDates']);
        let r = SessionsStore.__set__('sessions', spy2);
        let d = store._getAllDates();
        expect(d).toEqual(['dates']);
        expect(spy).toHaveBeenCalled();
        expect(spy2.getAllDates).toHaveBeenCalled();
        r();
      });
    });

    describe('_setDate', function(){
      let spy, spy2, revert;
      beforeEach(function(){
        spy2 = jasmine.createSpyObj('current', ['setDate']);
        spy = jasmine.createSpy('currentDate').and.returnValue(spy2);
        revert = SessionsStore.__set__('currentDate', spy);
      });

      afterEach(function(){
        revert();
      });

        it("should call currentDate if current isn't set", function(){
          store.current = undefined;
          let d = new Date();
          store._setDate(d);
          expect(spy).toHaveBeenCalledWith(d);
          expect(store.current).toEqual(spy2);
          expect(spy2.setDate).toHaveBeenCalledWith(d);
        });

        it('should call not currentDate if current is set', function(){
          store.current = spy2;
          let d = new Date();
          store._setDate(d);
          expect(spy).not.toHaveBeenCalledWith(d);
          // expect(store.current).toEqual(spy2)
          expect(spy2.setDate).toHaveBeenCalledWith(d);
        });
    });

    describe('setting functions', function(){
      describe('_setFacility', function(){
        it('should set facility id', function(){
          store._setFacility(2);
          let fac = SessionsStore.__get__('facility');
          expect(fac).toEqual(2);
        });
      });


      describe('_setGroups', function(){
        let proc, procD, spy;
        beforeEach(function(){
          spy   = jasmine.createSpy('processData').and.returnValue('data');

          procD = SessionsStore.__set__('processData', spy);
        });

        afterEach(function(){
          procD();
        });

        it('should not call processData if not string', function(){
          store._setGroups(22);
          expect(spy).not.toHaveBeenCalled();
        });

        it('should call processData if not string', function(){
          store._setGroups('foo');
          expect(spy).toHaveBeenCalledWith('foo');
          proc  = SessionsStore.__get__('processor');
          expect(proc).toEqual('data');
        });
      });

      describe('_progress', function(){
        let spy;
        beforeEach(function(){
          spy = jasmine.createSpy('progress');
        });

        it('should not set progress if not function', function(){
          store._progress(null);
          expect(store.progress).toBeUndefined();
        });

        it('should set progress if function', function(){
          store._progress(spy);
          expect(store.progress).toEqual(spy);
        });
      });
    });
  });
});
