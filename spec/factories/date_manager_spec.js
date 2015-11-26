const _         = require("lodash");

const DateManager = require("../../src/factories/date_manager");

let mockdata = ["sessions", "sessions", "sessions"];

var i = 0;

let dates = []

do{
  let d = new Date(2015, 0, 18+i);
  dates.push({date:d, data:mockdata})
  i++;
} while(i < 4);


describe('DateManager', function() {
  let dateManager, spy, revert;

  beforeEach(()=>{
    dateManager = DateManager("start", dates);
  });

  it('should return an object', function() {
    expect(_.isObject(dateManager)).toBeTruthy()
  });

  describe('checkDates', function() {
    let checkDates, revert, spy, findDate;

    beforeEach(()=>{
      spy    = jasmine.createSpy("findDate");
      revert = DateManager.__set__("getDate", spy);
      // console.log(findDate)
      checkDates = DateManager.__get__("checkDates");

    });

    afterEach(()=>{
      revert();
    })

    it('should return true if date found', function() {
      spy.and.returnValue(true);
      let day1 = new Date(2015, 0, 18, 16, 44);

      expect(checkDates(dates, day1)).toBeTruthy();

      expect(spy).toHaveBeenCalled();
      let calls = spy.calls.argsFor(0);
      expect(calls).toContain(dates);
      expect(calls).toContain(day1);
    });

    it('should return false if do date found', function() {
      spy.and.returnValue(false);
      let day1 = new Date(2015, 0, 18, 16, 44);

      expect(checkDates(dates, day1)).toBeFalsy();

      expect(spy).toHaveBeenCalled();
      let calls = spy.calls.argsFor(0);
      expect(calls).toContain(dates);
      expect(calls).toContain(day1);
    });
  });

  describe('dateUpdate', function() {
    let dateUpdate, revert, spy, findDate;

    beforeEach(()=>{
      spy    = jasmine.createSpy("checker").and.callFake((ch, d)=>{
        return ch.getDate() === d.getDate()
      });
      revert = DateManager.__set__("checker", spy);
      // console.log(findDate)
      dateUpdate = DateManager.__get__("dateUpdate");


    });

    afterEach(()=>{
      revert();
    })

    it("should update the date's data if found", function() {
      let day = new Date(2015, 0, 18)
      let new_dates = dateUpdate(dates, day, ["foo"]);

      expect(new_dates[0].data).toEqual(["foo"])
    });
  });


  describe('api functions', function() {
    beforeEach(()=>{
      dateManager = DateManager("start", dates);
    });

    describe('addDates', function() {
      let checkDate, dateUpdate, spyCD, spyFD, fcty, spyF;
      beforeEach(()=>{
        spyF = jasmine.createSpyObj("fcty", ["constructor", "setTimeKey"]);
        let wrapper = function(...args){
          spyF.constructor.apply(this, args);
        }

        wrapper.prototype.setTimeKey = function(...args) {
          spyF.setTimeKey.apply(this, args);
        };

        fcty = DateManager.__set__("SessionsFcty", wrapper);


        spyCD     = jasmine.createSpy("checkDate");
        checkDate = DateManager.__set__("checkDates", spyCD);

        let ds     = _.cloneDeep(dates);
        // console.log(dates.length, ds.length)
        ds[0].data = ["foo", "bar"];

        spyFD   = jasmine.createSpy("dateUpdate").and.returnValue(ds);
        dateUpdate = DateManager.__set__("dateUpdate", spyFD);

      })

      afterEach(()=>{
        dateUpdate();
        checkDate();
        fcty();
      });

      it('should add dates array if no date matched', function() {
         spyCD.and.returnValue(false);

         dateManager.addDate(new Date(2015,1,18), ["foo"]);
         let d = dateManager.getAll();
         expect(d.length).toEqual(5);

         expect(spyF.constructor).toHaveBeenCalled();
         let calls = spyF.constructor.calls.argsFor(0);
         expect(calls).toContain(["foo"]);

        expect(spyF.setTimeKey).toHaveBeenCalledWith("start");


      });

      it('should update dates array if date matched', function() {
         spyCD.and.returnValue(true);
         dateManager.addDate(new Date(2015,1,18), ["foo"]);
         let d = dateManager.getAll();
         expect(d.length).toEqual(dates.length);
         expect(d[0].data).toEqual(["foo", "bar"]);
      });
    });

    describe('findDate', function() {
      let getDate, spy;
      beforeEach(()=>{
        let ds     = _.clone(dates[0]);
        ds.data = ["foo", "bar"];

        spy   = jasmine.createSpy("getDate").and.returnValue(ds);
        getDate = DateManager.__set__("getDate", spy);

      })

      afterEach(()=>{
        getDate();
      });

      it('should add dates array if no date matched', function() {
         let d = dateManager.findDate(new Date(2015,1,18));
         expect(d.data).toEqual(["foo", "bar"]);

         expect(spy).toHaveBeenCalled();

         let calls = spy.calls.argsFor(0);
         expect(calls).toContain(dates);
         expect(calls).toContain(new Date(2015,1,18));
      });
    });

    describe('updateDate', function() {
      let dateUpdate, spy;
      beforeEach(()=>{
        let ds     = _.cloneDeep(dates);
        ds[0].data = ["foo", "bar"];

        spy   = jasmine.createSpy("dateUpdate").and.returnValue(ds);
        dateUpdate = DateManager.__set__("dateUpdate", spy);

      })

      afterEach(()=>{
        dateUpdate();
      });

      it('should update dates', function() {
         let d = dateManager.updateDate(new Date(2015,1,18), ["foo", "bar"]);
         // expect(d.data).toEqual(["foo", "bar"]);

         expect(spy).toHaveBeenCalled();

         let calls = spy.calls.argsFor(0);
         expect(calls).toContain(dates);
         expect(calls).toContain(new Date(2015,1,18));
         expect(calls).toContain(["foo", "bar"]);
      });
    });
  });



});