const _ = require("lodash")
    , Immutable = require("immutable")
    , React     = require("react")
    , ReactDOM  = require('react-dom')
    , TestUtils = require("react-addons-test-utils");

const DataExpander   = require("../../src/components/data_expander_item");


const componentHelper = require("react-jasmine").componentHelpers
    , storeListeners = require("react-jasmine").checkListeners;

describe("DataExpander", function() {
  let dataexpander, cssMixins, spy, revert, ColumnsStore;;
  let data = Immutable.fromJS({foo:"Phil", bar:"Collins"})
  let keys = ["foo", "bar"];
  let css  = {foo:"class1", default:"class2"}
  let columns = [
    {key:"foo", title:"Foooo"},
    {key:"Bar", title:"Baaaaar"}
  ]
  let colStubs = [
    {title:"addChangeListener"},
    {title:"removeChangeListener"},
    {title:"getKeyAndTitle", returnValue:columns},
    {title:"getShowable", returnValue:[columns[0]]}
  ]
  beforeEach(() => {

    //Spy on Store
    ColumnsStore = DataExpander.__get__("ColumnsStore");
    storeListeners.stubStore(ColumnsStore, colStubs);

    dataexpander = TestUtils.renderIntoDocument(<DataExpander data={data} css={css} keys={keys} /> );

    spyOn(dataexpander, "checkCss").and.callThrough();


    dataexpander.forceUpdate();
  });

  afterEach(function() {
    dataexpander.checkCss.calls.reset();
  });

  it("renders", () => {
    expect(dataexpander).toBeTruthy();
  });

  describe("props and state defaults", function() {
    var propsDefaults = {
        css  : css,
        keys : keys,
        data : data
      };

    var stateDefaults = {
        acc_css : "collapse",
        active  : "",
        chevron :"glyphicon glyphicon-chevron-down",
        css: "col-md-1",
        data    : data,
        device: "desktop",
        selected: false,
        show_additional: false
      };

    componentHelper.checkPropsAndState(()=>{
      return dataexpander;
    }, propsDefaults, stateDefaults);
  });

  describe('expander', function() {
    // componentHelper.checkEvent(
    //   ()=>{
    //     return dataexpander;
    //   },
    //   {type:"tag", identifier:"a"},
    //   "_onClick",
    //   "click"
    // );

    describe("check _onClick function", function() {

      beforeEach(()=>{
        spy = jasmine.createSpyObj("e", ["preventDefault"]);
        dataexpander.active = [{active:false}]
        spyOn(dataexpander, "setState").and.callFake((state)=>{
          dataexpander.state = state;
        });
        dataexpander._onClick(spy);


      });

      it("should call set state", function() {
        expect(dataexpander.setState).toHaveBeenCalled();
      });

      it("should call preventDefault", function() {
        expect(spy.preventDefault).toHaveBeenCalled();
      });

      it("should set active and state", function() {
        expect(dataexpander.active).toEqual([{active:true}]);
        expect(dataexpander.state.active).toEqual("active");
      });

      it("should set active and state", function() {
        expect(dataexpander.active).toEqual([{active:true}]);
        expect(dataexpander.state.active).toEqual("active");
      });

      it("should set answer and state", function() {
        expect(dataexpander.answer).toEqual(["collapse", {"in": true}]);
        expect(dataexpander.state.acc_css).toEqual("collapse in");
      });

      it("should set chevron and state", function() {
        expect(dataexpander.chevron).toEqual(["glyphicon", {"glyphicon-chevron-up": true}, {"glyphicon-chevron-down": false}]);
        expect(dataexpander.state.chevron).toEqual("glyphicon glyphicon-chevron-up");
      });

      it("should set show_additional", function() {
        expect(dataexpander.state.show_additional).toBeTruthy();
      });

  });
  });

  describe('render functions', function() {

    describe('renderAll', function() {

      xit("should return empty string if no data", function() {
        dataexpander.props.data = null;
        let a = dataexpander._renderAll();
        expect(a).toEqual("");
      });

      xit("should be defined", function() {
        spyOn(dataexpander, "_renderItem").and.callFake((c, i)=>{
          return i.get(c.key);
        });

        let a = dataexpander._renderAll();
        expect(a).toEqual(["Phil"]);
      });

    });

    xdescribe('renderAdditional', function() {
      describe('when state.show_additional is false', function() {
        it("should return empty string", function() {
          expect(dataexpander._renderAdditional()).toEqual("");
        });
      });

      describe('when state.show_additional is true', function() {
        let item, node
        beforeEach(function() {

          dataexpander.state.show_additional = true;
          spyOn(dataexpander, "_renderAll").and.returnValue(
            <li>Phil</li>
          );

          let c = React.cloneElement(dataexpander._renderAdditional());

          item   = ReactDOM.findDOMNode(c);
          // node = item.getDOMNode();
        });

        it("should be defined", function() {
          expect(item).toBeDefined();
        });

        it("call renderAll", function() {
          expect(dataexpander._renderAll).toHaveBeenCalled();
        });

        componentHelper.checkAttrbutes(()=>{
          return item;
        }, [{key:"class", value:"list-group collapse"}]);

        componentHelper.checkText(()=>{
          return item.querySelector("li");
        }, "Phil");
      });


    });

    xdescribe('renderDate', function() {
      let item
      beforeEach(function() {
        spyOn(dataexpander, "_displayData").and.returnValue("Phil");

        let c = React.cloneElement(dataexpander._renderItem(columns[0], data));
        item   = TestUtils.renderIntoDocument(c);
        // console.log("col", col.getDOMNode());
      });

      it("should be defined", function() {
        expect(item).toBeDefined();
      });

      componentHelper.checkText(()=>{
        return item;
      }, "Foooo: Phil");
    });


    describe('renderButton', function() {
        describe('when active', function() {
          let item, node;
          beforeEach(function() {
            dataexpander.state.active = false;
            let c = React.cloneElement(dataexpander._renderButton());
            item   = TestUtils.renderIntoDocument(c);
            node = item.getDOMNode();
          });

          it("should be defined", function() {
            expect(item).toBeDefined();
          });


          componentHelper.checkAttrbutes(()=>{
            return node;
          }, [{key:"class", value:"class2"}]);

          componentHelper.checkText(()=>{
            return node.querySelector("a").firstChild;
          }, "More Information");

          // it("should have contain the text More", function() {
          //   let elm = node.querySelector("a").firstChild;

          //   // elm.querySelector("i"));
          //   console.log(elm, elm.textContent.replace(" ", ""));
          //   expect(elm.textContent).toEqual("More");
          // });

        });

      });

  });


});