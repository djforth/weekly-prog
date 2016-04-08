const _ = require("lodash")
    , Immutable = require("immutable");

const formatter  = require("../../src/utils/formatter")
    , reverter   = require("../helpers/reverts")(formatter)
    , chainHelper = require("../helpers/chain_helper")
    , getter     =  require("../helpers/getter")(formatter)

describe('formatter', function() {

  describe('getFormat', function() {
    let getFormat = getter('getFormat')

    it('should return fmt if there is one', function() {
      let fmt = getFormat({fmt:"%d"})
      expect(fmt).toEqual("%d")
    });

    it('should return fmt if type is dateTime', function() {
      let fmt = getFormat({type:"dateTime"})
      expect(fmt).toEqual("%d/%m/%Y %H:%M")
    });

    it('should return fmt if type is date', function() {
      let fmt = getFormat({type:"date"})
      expect(fmt).toEqual("%d/%m/%Y")
    });
  });

  describe('displayData', function() {
    let displayData = getter('displayData');
    let spy, spyF;
    beforeEach(function() {
      spy = chainHelper("moment").addChain("strftime").addReturn("Mon")
      spyF   = jasmine.createSpy("getFormat").and.returnValue("Foo");

    });

    reverter('getFormat', ()=>spyF);
    reverter('moment', ()=>spy.getSpy("moment"));

    it('should return data if not a date', function() {
      expect(displayData("phil")).toEqual("phil");
    });

    it('should call moment if date', function() {
      let d = new Date();
      expect(displayData(d, "foo")).toEqual("Mon");
      expect(spy.getSpy("moment")).toHaveBeenCalledWith(d)
      expect(spyF).toHaveBeenCalledWith("foo");
      expect(spy.getSpy("strftime")).toHaveBeenCalledWith("Foo")

    });
  });

  describe('getValue', function() {
    let getValue = getter('getValue');
    let data,  value;
    beforeEach(function() {
      data = {foo:"bar", bar:2}
      value = getValue(Immutable.fromJS(data));
    });

    it('should return value of key if string', function() {
      expect(value("foo")).toEqual("bar")
      expect(value("bar")).toEqual(2)
    });

    it('should return an array of value of keys array sent', function() {
      expect(value(["foo", "bar"])).toEqual(["bar", 2])

    });
  });

  describe('when ', function() {

  });

});