const _ = require("lodash")
    , React = require("react")
    , ReactDOM  = require('react-dom')
    , TestUtils = require("react-addons-test-utils");

const DataItem   = require("../../src/components/sessions/data_item");

const Immutable = require("immutable");

// Test Helpers
const componentHelper = require("react-jasmine").componentHelpers;
const storeListeners = require("react-jasmine").checkListeners


xdescribe("DataItem", function() {
  let dateFmtSpy = jasmine.createSpy("dateFmt").and.returnValue("1/1/2015");

  let DateFmt = function(){}
  DateFmt.prototype.formatDate = dateFmtSpy;

  let dataitem, cssMixins, spy, revert, ColumnsStore;
  let data = Immutable.fromJS({foo:"Phil", bar:"Collins", date:new Date(2015,0,18), dateDf:new DateFmt()})
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", date:"date",  default:"class2"}
  let columns = [
    {key:"foo" , title:"Foooo"},
    {key:"bar" , title:"Baaaaar"},
    {key:"date", title:"Date"}
  ]
  let colStubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"getKeyAndTitle", returnValue:columns},
    {title:"getVisible", returnValue:columns}
  ]

  beforeEach(() => {

    //Spy on Store
    ColumnsStore = DataItem.__get__("ColumnsStore");
    storeListeners.stubStore(ColumnsStore, colStubs);

    dataitem = TestUtils.renderIntoDocument(<DataItem data={data} css={css} keys={keys} /> );

    spyOn(dataitem, "checkCss").and.callThrough();


    dataitem.forceUpdate();
  });

  afterEach(function() {
    dataitem.checkCss.calls.reset();
    // revert();
  });

  it("renders", () => {
    expect(dataitem).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        css  : css,
        keys : keys,
        data : data
      };

    var stateDefaults = {
        data : data
      };

    componentHelper.checkPropsAndState(()=>{
      return dataitem;
    }, propsDefaults, stateDefaults);
  });

  describe("check componentDidMount spies called", function() {
    it("should set mount", function() {
      expect(dataitem.mounted).toBeTruthy();
    });

    let stateDefaults = {
        data : data,
        columns: columns
      };

    componentHelper.checkState(()=>{
      return dataitem;
    },  stateDefaults);

    it("should call addChangeListener on mounting", function() {
      let events =["change"];
      storeListeners.checkListeners(ColumnsStore, "addChangeListener", events );
    });
  });

  describe("check componentWillUnmmont spies", function() {
    beforeEach(function() {
      dataitem.componentWillUnmount();
    });
    it("should set mount", function() {
      expect(dataitem.mounted).toBeFalsy();
    });

    it("should call addRemoveListener on unmounting", function() {
      let events =["change"];
      storeListeners.checkListeners(ColumnsStore, "removeChangeListener", events );
    });
  });

  describe('getFmt', function() {
    it("should return formatting if set", function() {
      let fmt = dataitem._getFmt({fmt:"foo"});
      expect(fmt).toEqual("foo");
    });

    it("should return formatting if type dateTime", function() {
      let fmt = dataitem._getFmt({type:"dateTime"});
      expect(fmt).toEqual("%d/%m/%Y %H:%M");
    });

    it("should return formatting if type date", function() {
      let fmt = dataitem._getFmt({type:"date"});
      expect(fmt).toEqual("%d/%m/%Y");
    });

    it("should return formatting if nothing set", function() {
      let fmt = dataitem._getFmt();

      expect(fmt).toEqual("%d/%m/%Y");
    });
  });

  describe('_onChange', function() {
    beforeEach(()=>{
      spyOn(dataitem, "setState");
    });

    it("should not call set state if not mounted", function() {
      dataitem.mounted = false;
      dataitem._onChange();
      expect(dataitem.setState).not.toHaveBeenCalled();

    });

    it("should not call set state if not mounted", function() {

      dataitem._onChange();
      expect(dataitem.setState).toHaveBeenCalledWith({columns:columns});

    });
  });

  describe('_displayData', function() {
    let dateSpy
    beforeEach(()=>{
      spyOn(dataitem, "_getFmt").and.returnValue("%d/%m/%Y");
      spyOn(dataitem, "_rawMarkup").and.callFake((d)=>{
        return d
      })
    })

    it("should return data in key if string", function() {

      let dd = dataitem._displayData(data, {key:"foo"});
      expect(dd).toEqual("Phil");

    });

    it("should return data in key if date", function() {
      let dd = dataitem._displayData(data, {key:"date"});
      expect(dataitem._getFmt).toHaveBeenCalledWith({key:"date"});
      expect(dateFmtSpy).toHaveBeenCalledWith("%d/%m/%Y");
      expect(dd).toEqual("1/1/2015");
    });
  });

  describe('render functions', function() {
    describe('renderTd with no data or columns', function() {
      xit("should return empty string if no data", function() {
        dataitem.props.data = null;
        expect(dataitem._renderTd()).toEqual("");
      });

      it("should return empty string if no columns", function() {
        dataitem.state.columns = null;
        expect(dataitem._renderTd()).toEqual("");
      });
    });

    describe('renderTd with if data and columns', function() {
      let td;
      beforeEach(()=>{
        spyOn(dataitem, "_renderColumn").and.callFake((c, i)=>{
          return i.get(c.key);
        });
      });

      it("should return the correct columns", function() {
        let tds =  dataitem._renderTd();
        console.log('tds', tds);
        expect(tds).toEqual(['Phil', 'Collins', new Date(2015,0,18)]);
      });

    });


    describe('renderColumn', function() {
      let col
      beforeEach(function() {
        // spyOn(dataitem, "checkCss").and.returnValue("foo");
        spyOn(dataitem, "_wrapper").and.returnValue("Phil");

        let c = React.cloneElement(dataitem._renderColumn(columns[0], data));
        col   = TestUtils.renderIntoDocument(c);
        // console.log("col", col.getDOMNode());
      });

      it("should be defined", function() {
        expect(col).toBeDefined();
      });

      componentHelper.checkText(()=>{
        // console.log("EH", col)
        return col;
      }, "Phil");
    });
  });



  describe("Name of the group", function() {
    let td;
    beforeEach(()=>{

      td = TestUtils.findRenderedDOMComponentWithClass(dataitem, "tr");
      // console.log("td", td)
    });

    componentHelper.checkRender(
      ()=>{
        return td;
      },
      {type:"class", className:"class1"},
      {
        attributes:[
          {key:"class", value:"class1"}
        ],
        textNode:"Phil"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return td;
      },
      {type:"class", className:"class2"},
      {
        attributes:[
          {key:"class", value:"class2"}
        ],
        textNode:"Collins"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return td;
      },
      {type:"class", className:"date"},
      {
        attributes:[
          {key:"class", value:"date"}
        ],
        textNode:"1/1/2015"
      }
    );

    it("should have called checkCss & capitalize", function() {
      expect(dataitem.checkCss.calls.count()).toEqual(3);
    });
  });



});