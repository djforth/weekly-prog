const _         = require("lodash");
const Immutable = require("immutable");

const SessionsStore = require("../../src/stores/sessions_store");

const storeHelper    = require("react-jasmine").storeHelpers;
const defaultsHelper = require("react-jasmine").checkDefaults;

function createSession(i, t){
  let time_str = (t === "morning") ? "09:00" : "18:00";
  let time     = (t === "morning") ? 9 : 18
  return {
    start_time:`2015-01-${18+i} ${time_str}`
  , title:`${t} session ${i}`
  , groupBy: new Date(2015, 0, 18+i, time)
  }
}

let mockData    = {};
let unprocessed = [];
let processed   = [];

let i = 0;

do{
  let morning   = createSession(i, "morning");
  let afternoon = createSession(i, "afternoon");

  unprocessed.push(_.omit(morning, "groupBy"));
  unprocessed.push(_.omit(afternoon, "groupBy"));

  processed.push(morning);
  processed.push(afternoon);

  mockData[`2015-01-${18+i}`] = {
      date:new Date(2015, 0, 18)
    , sessions:[morning, afternoon]
  };
  i++;
} while(i < 4);

// console.log(mockData)

describe("SessionsStore", function() {
  let options = [
     {
      func:"_setDate",
      action:{
        type:"CHANGE_DATE",
        date:1
      },
      args:[1],
      change:"changing_date"
    },
    {
      func:"_calendarChange",
      action:{
        type:"CALENDAR_CHANGE",
        date:1
      },
      args:[1],
      change:"calendar_changing"
    },
    {
      func:"_getMoreDays",
      action:{
        type:"MORE_DAYS"
      },
      args:[],
      change:"more_days"
    },
    // {
    //   func:"_getPreviousDays",
    //   action:{
    //     type:"PREVIOUS_DAYS",
    //     date:1
    //   },
    //   args:[1],
    //   change:"previous_days"
    // },
    {
      func:"_fetchData",
      action:{
        type:"FETCH_DATA",
        date:1
      },
      args:[1],
      change:"fetching"
    },
    {
      func:"_addSessions",
      action:{
        type:"PRERENDER_DATA",
        data:"foo"
      },
      args:"foo",
      change:"prerender"
    },
    {
      func:"_setGroups",
      action:{
        type:"SET_GROUPBY",
        groupBy:"foo"
      },
      args:"foo",
      change:"groupby"
    },
    {
      func:"_setApi",
      action:{
        type:"SET_API",
        url:"foo"
      },
      args:"foo",
      change:"api_set"
    }
  ];

  storeHelper.checkDispatcher(SessionsStore, "registeredCallback", options);


  storeHelper.checkChangeEvents(()=>{
    return SessionsStore.__get__("store");
  });

  describe('currentDate', function() {
    let currentDate;
    beforeEach(function() {
      currentDate = SessionsStore.__get__("currentDate");
    });

    it('should set date if date passed', function() {
      let d = new Date(2015, 0, 18);
      let cd = currentDate(d);
      expect(cd.getDate()).toEqual(d);
    });

     it('should set date if not date passed', function() {

      let cd = currentDate();
      expect(_.isDate(cd.getDate())).toBeTruthy();
    });

    it('should allow you to set date', function() {
      let d  = new Date(2015, 0, 18);
      let d2 = new Date(2013, 0, 28);
      let cd = currentDate(d);
      cd.setDate(d2);
      expect(cd.getDate()).toEqual(d2);
    });
  });

  describe('processData', function() {
    let  addDate, Breaker, DateManager, processData, sessions, spy, dmSpy, adSpy;
    beforeEach(function() {
      adSpy = jasmine.createSpy("addDate");
      dmSpy = jasmine.createSpy("DateManager").and.returnValue({
        addDate:adSpy
      });

      DateManager = SessionsStore.__set__("DateManager", dmSpy);

      spy = jasmine.createSpy("Breaker").and.returnValue(mockData);
      Breaker     = SessionsStore.__set__("Breaker", spy);

      processData = SessionsStore.__get__("processData");
      sessions = processData("start_time")
    });

    afterEach(()=>{
      Breaker();
      DateManager();
    });

    it('should set up sessions', function() {
      expect(dmSpy).toHaveBeenCalled()
    });

    it('should call breaker', function() {
      sessions(unprocessed);
      expect(spy).toHaveBeenCalledWith(unprocessed, "start_time");
    });

    it('should add dates', function() {
      sessions(unprocessed);
      expect(adSpy).toHaveBeenCalled();
      expect(adSpy.calls.count()).toEqual(4);

      let calls = adSpy.calls.argsFor(0);
      let data = mockData["2015-01-18"];
      expect(calls).toContain(data.date);
      expect(calls).toContain(data.sessions);
    });
  });


  describe("store functions", function() {
    let processor, store, sessions, fcty, spy;
     beforeEach(()=>{
      store    = SessionsStore.__get__("store");
      });

    describe('_addSessions', function() {
      beforeEach(function() {
        spy       = jasmine.createSpy("sessions").and.returnValue(["sessions"]);
        processor = SessionsStore.__set__("processor", spy);
        sessions  = SessionsStore.__get__("sessions");
        store._addSessions(unprocessed);
      });

      afterEach(function() {
        processor()
      });

      it('should call processor', function() {
        expect(spy).toHaveBeenCalledWith(unprocessed);
      });

      it('should set sessions', function() {
        expect(sessions).toEqual(["sessions"]);
      });
    });

    describe('_setApi', function() {
      let AjaxManager, am, amSpy;
      beforeEach(function() {
        amSpy = jasmine.createSpy("AjaxManager").and.returnValue("ajax");
        AjaxManager = SessionsStore.__set__("AjaxManager", amSpy);
        am = SessionsStore.__get__("ajaxManager");
        store._setApi("http://astainforth.com")
      });

      afterEach(()=>{
         AjaxManager();
      })

      it('should call AjaxManger', function() {
        expect(amSpy).toHaveBeenCalledWith("http://astainforth.com");
      });

      it('should set ajaxManger', function() {
        expect(am).toEqual("ajax");
      });
    });

    describe('_setGroups', function() {
      let processData, processor, spy;
      beforeEach(function() {
        spy         = jasmine.createSpy("processData").and.returnValue("processor");
        processData = SessionsStore.__set__("processData", spy);
        processor   = SessionsStore.__get__("processor");
        store._setGroups("start_time");
      });

      afterEach(function() {
        processData();
      });

      it('should call AjaxManger', function() {
        expect(spy).toHaveBeenCalledWith("start_time");
      });

      it('should set ajaxManger', function() {
        expect(processor).toEqual("processor");
      });
    });

    describe('_fetchData', function() {
      let date;
      beforeEach(function() {
        date = new Date(2015, 0, 18);

      });


      it('should throw error if ajaxManager not set', function() {
        let ajax = SessionsStore.__set__("ajaxManager", undefined);
        expect(()=>{
          store._fetchData(date)
        }).toThrowError("please set API path");
      });
    });

    describe('when ajaxManager set', function() {
      let ajax, processor, promise, pSpy, resolve, reject, sessions, spy, sessionsSpy, date;
      beforeEach(function() {
        date = new Date(2015, 0, 18);
        spy    = jasmine.createSpyObj("ajaxManager", ["addQuery", "fetch"])
        ajax   = SessionsStore.__set__("ajaxManager", spy);

        promise = new Promise((res, rej)=>{
          resolve = res;
          reject  = rej;
        });

        spy.fetch.and.returnValue(promise);
        sessionsSpy = jasmine.createSpyObj("Sessions", ["getAllDates"]);
        sessionsSpy.getAllDates.and.returnValue("new date")
        pSpy = jasmine.createSpy("processor").and.returnValue(sessionsSpy)
        processor = SessionsStore.__set__("processor", pSpy);


        spyOn(store, "emitChange");
        store._fetchData(date);
        spyOn(store, "_fetchRest")
      });

      afterEach(()=>{
        ajax();
        processor();
      });

      it('should call addQuery', function() {
        expect(spy.addQuery).toHaveBeenCalledWith(date)
      });

      it('should call fetch', function() {
        expect(spy.fetch).toHaveBeenCalled();
      });

      it("should fetch data", function(done) {
        spy.fetch().then((data)=>{
          sessions  = SessionsStore.__get__("sessions");
          expect(pSpy).toHaveBeenCalledWith("success", false);

          expect(sessionsSpy.getAllDates).toHaveBeenCalled();
          expect(sessions).toEqual(sessionsSpy);
          expect(store.emitChange).toHaveBeenCalledWith("fetched");
        });

        resolve("success");

        setTimeout(function() {
            done();
          }, 100);

      });
    });



  });


  describe('_getDate', function() {
   let processor, store, spy;
   beforeEach(()=>{
    store    = SessionsStore.__get__("store");
    });
    let current, currentDate, date, sessions, cSpy, sSpy, cdSpy;
    beforeEach(function() {
      date = new Date(2015, 0, 18);
      cSpy = jasmine.createSpyObj("current", ["setDate", "getDate"]);
      cSpy.getDate.and.returnValue(date);
      cdSpy =  jasmine.createSpy("currentDate").and.returnValue(cSpy)
      currentDate = SessionsStore.__set__("currentDate", cdSpy);

      sSpy = jasmine.createSpyObj("sessions", ["findDate"]);
      // sSpy.findDate.and.returnValue("foo");

      sessions = SessionsStore.__set__("sessions", sSpy);

      spyOn(store, "_fetchData");
      spyOn(store, "emitChange");
    });

    it('should create current if not created', function() {
      store.current = undefined;
      store._getDate(date);
      expect(cdSpy).toHaveBeenCalledWith(date);
    });

    it('should call setDate', function() {
      store.current = cSpy;
      store._getDate(date);
      expect(cSpy.setDate).toHaveBeenCalledWith(date);
    });

    it('should return day data if available', function() {
      store.current = undefined;
      sSpy.findDate.and.returnValue("foo");
      // store.current = cSpy;
      let data = store._getDate(date);

      expect(cSpy.getDate).toHaveBeenCalled();
      expect(sSpy.findDate).toHaveBeenCalledWith(date);
      expect(data).toEqual("foo");

      expect(store._fetchData).not.toHaveBeenCalled();
      expect(store.emitChange).not.toHaveBeenCalled();
    });

    it('should fetch date if no date found', function() {
      store.fetched = false;
      store.current = undefined;
      sSpy.findDate.and.returnValue(null);
      // store.current = cSpy;
      let data = store._getDate(date);

      expect(cSpy.getDate).toHaveBeenCalled();
      expect(sSpy.findDate).toHaveBeenCalledWith(date);
      expect(data).toBeNull();

      expect(store._fetchData).toHaveBeenCalledWith(date);
      expect(store.emitChange).toHaveBeenCalledWith("fetching");
    });
  });





  // fdescribe('_getDate', function() {
  //     let current, currentDate, date, sessions, cSpy, sSpy, cdSpy;
  //     beforeEach(function() {
  //       date = new Date(2015, 0, 18);
  //       cSpy = jasmine.createSpyObj("current", ["setDate", "getDate"]);
  //       cSpy.getDate.and.returnValue(date);
  //       cdSpy =  jasmine.createSpy("currentDate").and.returnValue(cSpy)
  //       currentDate = SessionsStore.__set__("currentDate", cdSpy);

  //       sSpy = jasmine.createSpyObj("sessions", ["findDate"]);
  //       // sSpy.findDate.and.returnValue("foo");

  //       sessions = SessionsStore.__set__("sessions", sSpy);

  //       spyOn(store, "_fetchData");
  //       spyOn(store, "emitChange");
  //     });

  //     it('should create current if not created', function() {
  //       store.current = undefined;
  //       store._getDate(date);
  //       expect(cdSpy).toHaveBeenCalledWith(date);
  //     });

  //     it('should call setDate', function() {
  //       store.current = cSpy;
  //       store._getDate(date);
  //       expect(cSpy.setDate).toHaveBeenCalledWith(date);
  //     });

  //     it('should return day data if available', function() {
  //       store.current = undefined;
  //       sSpy.findDate.and.returnValue("foo");
  //       // store.current = cSpy;
  //       let data = store._getDate(date);

  //       expect(cSpy.getDate).toHaveBeenCalled();
  //       expect(sSpy.findDate).toHaveBeenCalledWith(date);
  //       expect(data).toEqual("foo");

  //       expect(store._fetchData).not.toHaveBeenCalled();
  //       expect(store.emitChange).not.toHaveBeenCalled();
  //     });

  //     it('should fetch date if no date found', function() {
  //       store.current = undefined;
  //       sSpy.findDate.and.returnValue(null);
  //       // store.current = cSpy;
  //       let data = store._getDate(date);

  //       expect(cSpy.getDate).toHaveBeenCalled();
  //       expect(sSpy.findDate).toHaveBeenCalledWith(date);
  //       expect(data).toBeNull();

  //       expect(store._fetchData).toHaveBeenCalledWith(date);
  //       expect(store.emitChange).toHaveBeenCalledWith("fetching");
  //     });
  //   });


})