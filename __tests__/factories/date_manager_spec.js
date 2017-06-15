import _ from 'lodash';
import DateManager from '../../src/factories/date_manager';

let mockdata = ['sessions', 'sessions', 'sessions'];

let i = 0;

let dates = [];

do {
  let d = new Date(2015, 0, 18+i);
  dates.push({date: d, data: mockdata});
  i++;
} while (i < 4);


describe('DateManager', function(){
  let dateManager, spy, revert;
  describe('init', function(){
    beforeEach(()=>{
      dateManager = DateManager('start');
    });

    it('should return an object', function(){
      expect(_.isObject(dateManager)).toBeTruthy();
    });
  });


  describe('checkDates', function(){
    let checkDates, revert, spy, findDate;

    beforeEach(()=>{
      spy    = jasmine.createSpy('findDate');
      revert = DateManager.__set__('getDate', spy);
      // console.log(findDate)
      checkDates = DateManager.__get__('checkDates');
    });

    afterEach(()=>{
      revert();
    });

    it('should return true if date found', function(){
      spy.and.returnValue(true);
      let day1 = new Date(2015, 0, 18, 16, 44);

      expect(checkDates(dates, day1)).toBeTruthy();

      expect(spy).toHaveBeenCalled();
      let calls = spy.calls.argsFor(0);
      expect(calls).toContain(dates);
      expect(calls).toContain(day1);
    });

    it('should return false if do date found', function(){
      spy.and.returnValue(false);
      let day1 = new Date(2015, 0, 18, 16, 44);

      expect(checkDates(dates, day1)).toBeFalsy();

      expect(spy).toHaveBeenCalled();
      let calls = spy.calls.argsFor(0);
      expect(calls).toContain(dates);
      expect(calls).toContain(day1);
    });
  });

  // describe('when ', function() {

  // });

  describe('createWeek', function(){
    let dateUpdate, revert, spy, findDate;

    beforeEach(()=>{
      spy    = jasmine.createSpy('checker').and.callFake((ch, d)=>{
        return ch.getDate() === d.getDate();
      });
      revert = DateManager.__set__('checker', spy);
      // console.log(findDate)
      dateUpdate = DateManager.__get__('dateUpdate');
    });

    afterEach(()=>{
      revert();
    });

    xit("should update the date's data if found", function(){
      let day = new Date(2015, 0, 18);

      let new_dates = dateUpdate(dates, day, ['foo']);

      expect(new_dates[0].data).toEqual(['foo']);
    });

    let week;
    beforeEach(()=>{
      spy = jasmine.createSpy('createFcty').and.returnValue('foo');
      let createWeek = DateManager.__get__('createWeek');
      week = createWeek(spy);
    });

    it('should call factory 7 times', function(){
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toEqual(7);
    });

    it('should create week array', function(){
      expect(week.length).toEqual(7);
      _.forEach(week, (w)=>{
        expect(_.isDate(w.date)).toBeTruthy();
        expect(w.data).toEqual('foo');
      });
    });
  });


  describe('createFcty', function(){
     let createFactory, creator, spy, fcty;
      beforeEach(()=>{
        spy = jasmine.createSpyObj('fcty', ['constructor', 'setTimeKey']);
        let wrapper = function(...args){
          spy.constructor.apply(this, args);
        };
        wrapper.prototype.setTimeKey = function(...args){
          spy.setTimeKey.apply(this, args);
        };
        fcty = DateManager.__set__('SessionsFcty', wrapper);
        createFactory = DateManager.__get__('createFactory');
        creator = createFactory('bar');
      });

      afterEach(()=>{
        fcty();
      });

      it('should return a function', function(){
        expect(_.isFunction(creator)).toBeTruthy();
      });

      it('should create a new factory when called', function(){
        let f = creator(['foo']);
        expect(spy.constructor).toHaveBeenCalled();
        let calls = spy.constructor.calls.argsFor(0);
        expect(calls).toContain(['foo']);
        expect(spy.setTimeKey).toHaveBeenCalledWith('bar');
      });
  });


  describe('api functions', function(){
    let fcty, createWeek, createFcty, creator, cFcty, week;
    beforeEach(()=>{
      fcty = jasmine.createSpy('fcty').and.returnValue(['foo']);
      creator = jasmine.createSpy('creator').and.returnValue(fcty);

      createFcty = DateManager.__set__('createFactory', creator);

      week = jasmine.createSpy('createWeek').and.returnValue(dates);
      createWeek = DateManager.__set__('createWeek', week);

      dateManager = DateManager('start');
    });

    afterEach(()=>{
      createFcty();
      createWeek();
      creator.calls.reset();
      week.calls.reset();
    });

    describe('when data is sent', function(){
      beforeEach(function(){
        dateManager = DateManager('start', dates);
      });

      it('call createFcty ', function(){
        expect(creator).toHaveBeenCalledWith('start');
      });

      it('call not createWeek if data sent', function(){
        // expect(week).not.toHaveBeenCalled();
        expect(dateManager.getAll()).toEqual(dates);
      });
    });

    describe('when created should call the correct function', function(){
      it('call createFcty ', function(){
        expect(creator).toHaveBeenCalledWith('start');
      });

      it('call createWeek if no data sent', function(){
        expect(week).toHaveBeenCalledWith(fcty);
      });
    });

    describe('addDates', function(){
      let checkDate, dateUpdate, spyCD, spyFD;
      beforeEach(()=>{
        spyCD     = jasmine.createSpy('checkDate');
        checkDate = DateManager.__set__('checkDates', spyCD);

        let ds     = _.cloneDeep(dates);
        // console.log(dates.length, ds.length)
        ds[0].data = ['foo', 'bar'];

        spyFD   = jasmine.createSpy('dateUpdate').and.returnValue(ds);
        dateUpdate = DateManager.__set__('dateUpdate', spyFD);
      });

      afterEach(()=>{
        dateUpdate();
        checkDate();
        // fcty();
      });

      it('should add dates array if no date matched', function(){
         spyCD.and.returnValue(false);

         dateManager.addDate(new Date(2015, 1, 18), ['foo']);
         let d = dateManager.getAll();
         expect(d.length).toEqual(5);

         expect(fcty).toHaveBeenCalled();
         let calls  = fcty.calls.argsFor(0);
         expect(calls).toContain(['foo']);
      });

      it('should update dates array if date matched', function(){
         spyCD.and.returnValue(true);
         dateManager.addDate(new Date(2015, 1, 18), ['foo']);
         let d = dateManager.getAll();
         expect(d.length).toEqual(dates.length);
         expect(d[0].data).toEqual(['foo', 'bar']);
      });
    });

    describe('findDate', function(){
      let getDate, spy;
      beforeEach(()=>{
        let ds     = _.clone(dates[0]);
        ds.data = ['foo', 'bar'];

        spy   = jasmine.createSpy('getDate').and.returnValue(ds);
        getDate = DateManager.__set__('getDate', spy);
      });

      afterEach(()=>{
        getDate();
      });

      it('should add dates array if no date matched', function(){
         let d = dateManager.findDate(new Date(2015, 1, 18));
         expect(d.data).toEqual(['foo', 'bar']);

         expect(spy).toHaveBeenCalled();

         let calls = spy.calls.argsFor(0);
         expect(calls).toContain(dates);
         expect(calls).toContain(new Date(2015, 1, 18));
      });
    });

    describe('updateDate', function(){
      let dateUpdate, spy;
      beforeEach(()=>{
        let ds     = _.cloneDeep(dates);
        ds[0].data = ['foo', 'bar'];

        spy   = jasmine.createSpy('dateUpdate').and.returnValue(ds);
        dateUpdate = DateManager.__set__('dateUpdate', spy);
      });

      afterEach(()=>{
        dateUpdate();
      });

      it('should update dates', function(){
         let d = dateManager.updateDate(new Date(2015, 1, 18), ['foo', 'bar']);
         // expect(d.data).toEqual(["foo", "bar"]);

         expect(spy).toHaveBeenCalled();

         let calls = spy.calls.argsFor(0);
         expect(calls).toContain(dates);
         expect(calls).toContain(new Date(2015, 1, 18));
         expect(calls).toContain(['foo', 'bar']);
      });
    });
  });
});
