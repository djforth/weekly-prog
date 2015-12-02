"use strict";

var _ = require("lodash"),
    React = require("react"),
    ReactDOM = require('react-dom'),
    TestUtils = require("react-addons-test-utils");

var DataItem = require("../../src/components/data_item");

var Immutable = require("immutable");

// Test Helpers
var componentHelper = require("react-jasmine").componentHelpers;
var storeListeners = require("react-jasmine").checkListeners;

describe("DataItem", function () {
  var dateFmtSpy = jasmine.createSpy("dateFmt").and.returnValue("1/1/2015");

  var DateFmt = function DateFmt() {};
  DateFmt.prototype.formatDate = dateFmtSpy;

  var dataitem = undefined,
      cssMixins = undefined,
      spy = undefined,
      revert = undefined,
      ColumnsStore = undefined;
  var data = Immutable.fromJS({ foo: "Phil", bar: "Collins", date: new Date(2015, 0, 18), dateDf: new DateFmt() });
  var keys = ["foo", "bar"];
  var css = { foo: "class1", date: "date", default: "class2" };
  var columns = [{ key: "foo", title: "Foooo" }, { key: "bar", title: "Baaaaar" }, { key: "date", title: "Date" }];
  var colStubs = [{ title: "addChangeListener" }, { title: "removeChangeListener" }, { title: "getKeyAndTitle", returnValue: columns }, { title: "getVisible", returnValue: columns }];

  beforeEach(function () {

    //Spy on Store
    ColumnsStore = DataItem.__get__("ColumnsStore");
    storeListeners.stubStore(ColumnsStore, colStubs);

    dataitem = TestUtils.renderIntoDocument(React.createElement(DataItem, { data: data, css: css, keys: keys }));

    spyOn(dataitem, "checkCss").and.callThrough();

    dataitem.forceUpdate();
  });

  afterEach(function () {
    dataitem.checkCss.calls.reset();
    // revert();
  });

  it("renders", function () {
    expect(dataitem).toBeTruthy();
  });

  describe("props and state defaults", function () {
    var propsDefaults = {
      css: css,
      keys: keys,
      data: data
    };

    var stateDefaults = {
      data: data
    };

    componentHelper.checkPropsAndState(function () {
      return dataitem;
    }, propsDefaults, stateDefaults);
  });

  describe("check componentDidMount spies called", function () {
    it("should set mount", function () {
      expect(dataitem.mounted).toBeTruthy();
    });

    var stateDefaults = {
      data: data,
      columns: columns
    };

    componentHelper.checkState(function () {
      return dataitem;
    }, stateDefaults);

    it("should call addChangeListener on mounting", function () {
      var events = ["change"];
      storeListeners.checkListeners(ColumnsStore, "addChangeListener", events);
    });
  });

  describe("check componentWillUnmmont spies", function () {
    beforeEach(function () {
      dataitem.componentWillUnmount();
    });
    it("should set mount", function () {
      expect(dataitem.mounted).toBeFalsy();
    });

    it("should call addRemoveListener on unmounting", function () {
      var events = ["change"];
      storeListeners.checkListeners(ColumnsStore, "removeChangeListener", events);
    });
  });

  describe('getFmt', function () {
    it("should return formatting if set", function () {
      var fmt = dataitem._getFmt({ fmt: "foo" });
      expect(fmt).toEqual("foo");
    });

    it("should return formatting if type dateTime", function () {
      var fmt = dataitem._getFmt({ type: "dateTime" });
      expect(fmt).toEqual("%d/%m/%Y %H:%M");
    });

    it("should return formatting if type date", function () {
      var fmt = dataitem._getFmt({ type: "date" });
      expect(fmt).toEqual("%d/%m/%Y");
    });

    it("should return formatting if nothing set", function () {
      var fmt = dataitem._getFmt();

      expect(fmt).toEqual("%d/%m/%Y");
    });
  });

  describe('_onChange', function () {
    beforeEach(function () {
      spyOn(dataitem, "setState");
    });

    it("should not call set state if not mounted", function () {
      dataitem.mounted = false;
      dataitem._onChange();
      expect(dataitem.setState).not.toHaveBeenCalled();
    });

    it("should not call set state if not mounted", function () {

      dataitem._onChange();
      expect(dataitem.setState).toHaveBeenCalledWith({ columns: columns });
    });
  });

  describe('_displayData', function () {
    var dateSpy = undefined;
    beforeEach(function () {
      spyOn(dataitem, "_getFmt").and.returnValue("%d/%m/%Y");
      spyOn(dataitem, "_rawMarkup").and.callFake(function (d) {
        return d;
      });
    });

    it("should return data in key if string", function () {

      var dd = dataitem._displayData(data, { key: "foo" });
      expect(dd).toEqual("Phil");
    });

    it("should return data in key if date", function () {
      var dd = dataitem._displayData(data, { key: "date" });
      expect(dataitem._getFmt).toHaveBeenCalledWith({ key: "date" });
      expect(dateFmtSpy).toHaveBeenCalledWith("%d/%m/%Y");
      expect(dd).toEqual("1/1/2015");
    });
  });

  describe('render functions', function () {
    describe('renderTd with no data or columns', function () {
      xit("should return empty string if no data", function () {
        dataitem.props.data = null;
        expect(dataitem._renderTd()).toEqual("");
      });

      it("should return empty string if no columns", function () {
        dataitem.state.columns = null;
        expect(dataitem._renderTd()).toEqual("");
      });
    });

    describe('renderTd with if data and columns', function () {
      var td = undefined;
      beforeEach(function () {
        spyOn(dataitem, "_renderColumn").and.callFake(function (c, i) {
          return i.get(c.key);
        });
      });

      it("should return the correct columns", function () {
        var tds = dataitem._renderTd();
        console.log('tds', tds);
        expect(tds).toEqual(['Phil', 'Collins', new Date(2015, 0, 18)]);
      });
    });

    describe('renderColumn', function () {
      var col = undefined;
      beforeEach(function () {
        // spyOn(dataitem, "checkCss").and.returnValue("foo");
        spyOn(dataitem, "_wrapper").and.returnValue("Phil");

        var c = React.cloneElement(dataitem._renderColumn(columns[0], data));
        col = TestUtils.renderIntoDocument(c);
        // console.log("col", col.getDOMNode());
      });

      it("should be defined", function () {
        expect(col).toBeDefined();
      });

      componentHelper.checkText(function () {
        // console.log("EH", col)
        return col;
      }, "Phil");
    });
  });

  describe("Name of the group", function () {
    var td = undefined;
    beforeEach(function () {

      td = TestUtils.findRenderedDOMComponentWithClass(dataitem, "tr");
      // console.log("td", td)
    });

    componentHelper.checkRender(function () {
      return td;
    }, { type: "class", className: "class1" }, {
      attributes: [{ key: "class", value: "class1" }],
      textNode: "Phil"
    });

    componentHelper.checkRender(function () {
      return td;
    }, { type: "class", className: "class2" }, {
      attributes: [{ key: "class", value: "class2" }],
      textNode: "Collins"
    });

    componentHelper.checkRender(function () {
      return td;
    }, { type: "class", className: "date" }, {
      attributes: [{ key: "class", value: "date" }],
      textNode: "1/1/2015"
    });

    it("should have called checkCss & capitalize", function () {
      expect(dataitem.checkCss.calls.count()).toEqual(3);
    });
  });
});
//# sourceMappingURL=data_item_spec.js.map