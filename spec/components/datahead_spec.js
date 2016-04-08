const _ = require("lodash")
    , React = require("react")
    , TestUtils = require("react-addons-test-utils");

const DataHead   = require("../../src/components/sessions/data_head");

const jasmineReactHelpers = require("react-jasmine");

const storeListeners  = jasmineReactHelpers.checkListeners
const componentHelper = jasmineReactHelpers.componentHelpers;



xdescribe('DataHead', function() {
  let datahead, cssMixins, textMixins, ColumnsStore;
  let columns = [
    {key:"foo", title:"Foooo"},
    {key:"Bar", title:"Baaaaar"}
  ]
  let stubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"getKeyAndTitle", returnValue:columns}
  ]
  let css  = {foo:"class1", default:"class2"}
  beforeEach(() => {
    //Spy on Store
    ColumnsStore = DataHead.__get__("ColumnsStore");
    storeListeners.stubStore(ColumnsStore, stubs);
    datahead = TestUtils.renderIntoDocument(<DataHead css={css} /> );

    spyOn(datahead, "checkCss").and.callThrough();
    spyOn(datahead, "capitalize").and.callFake((c)=>{
      return c;
    });

    datahead.forceUpdate();
  });

  afterEach(function() {
    datahead.checkCss.calls.reset();
    datahead.capitalize.calls.reset();
  });

  it("renders", () => {


    expect(datahead).toBeTruthy();
  });

  describe('props defaults', function() {
    var propsDefaults = {
        css  : css
      };

    componentHelper.checkProps(()=>{
      return datahead;
    }, propsDefaults);
  });

  describe('check componentDidMount spies called', function() {


    it("should call addChangeListener on mounting", function() {
      let events =["change"];
      storeListeners.checkListeners(ColumnsStore, "addChangeListener", events );
    });
  });

   describe("check componentWillUnmmont spies", function() {
    it("should call addRemoveListener on unmounting", function() {
      datahead.componentWillUnmount();
      let events =["change"];
      storeListeners.checkListeners(ColumnsStore, "removeChangeListener", events );
    });
  });

  describe("check event functions", function() {
    let events = [
      {fn:"_onChange" , spy:"getKeyAndTitle", state:{columns:columns}}
    ];

    storeListeners.checkAllEvents(()=>{
      return {comp:datahead, store:ColumnsStore}
    }, events);
  });



  describe("Name of the group", function() {
    let tr;
    beforeEach(()=>{
      //force render with data
      datahead._onChange();
      let th = TestUtils.findRenderedDOMComponentWithClass(datahead, "thead");
      tr = th.querySelector(".tr")
    });

    componentHelper.checkRender(
      ()=>{
        return tr;
      },
      {type:"class", className:"class1"},
      {
        attributes:[
          {key:"class", value:"class1"}
        ],
        textNode:"Foooo"
      }
    );

    componentHelper.checkRender(
      ()=>{
        return tr;
      },
      {type:"class", className:"class2"},
      {
        attributes:[
          {key:"class", value:"class2"}
        ],
        textNode:"Baaaaar"
      }
    );

    it("should have called checkCss & capitalize", function() {
      expect(datahead.checkCss.calls.count()).toEqual(2);
      // expect(datahead.capitalize.calls.count()).toEqual(2);
    });
  });
});