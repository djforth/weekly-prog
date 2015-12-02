const _        = require("lodash")
    , React    = require("react")
    , ReactDom = require('react-dom');

let sessions = require("../../spec/data/sessions.js")
// console.log(sessions(1))
const WeeklyProg = require("../../src/components/weekly_prog")

function createColumns(){
  let columns = [{key:"id"}]
  let additional = _.partial(addColumn, {show:true});
  let mobile     = _.partial(addColumn, {desktop:true, mobile:true, tablet:true, show:true});
  let tablet     = _.partial(addColumn, {desktop:true, mobile:false, tablet:true, show:true});
  let desktop    = _.partial(addColumn, {desktop:true, mobile:false, tablet:false, show:true});

  function addColumn(defaults, keys){
    return _.map(keys, (k)=>{
      // console.log(k)
      k = (_.isString(k)) ? {key:k} : k;
      return _.defaults(k, defaults);
    });
  }

  let obj

  obj = {
    additional:(keys)=>{
      columns = columns.concat(additional(keys));
      return obj;
    }
    , addMobile:(keys)=>{
      columns = columns.concat(mobile(keys));
      return obj;
    }
    , addTablet:(keys)=>{
      columns = columns.concat(tablet(keys));
      return obj;
    }

    , addDesktop:(keys)=>{
      columns = columns.concat(desktop(keys));
      return obj;
    }

    , value:()=>columns
  }

  return obj;
}

// rubocop:disable all

//rubocop:enable all
let cols = createColumns()
           .addMobile([
            {
               key:"start"
             , title:"time"
             , concat:"finish"
             , split:"- "
             , wrapper:"pill pill-secondary"
             , type:"time"
             , fmt:"%H:%M"
            }
          , {key:"session", wrapper:"bold-weight em"}
          , {key:"expand", title:""}
            ])
           .addTablet(["location"])
           .addDesktop(["instructor", "activity", {key:"places_left", wrapper:"places"}])
           .addTablet([{key:"actions", title:""}])
           .additional(["description"]).value()

let css = {
  default     : "col-lg-2 col-md-3 col-sm-5"
, places_left : "col-lg-1"
, activity    : "col-lg-1"
, session     : "col-lg-2 col-md-3 col-sm-5"
, expand      : "col-lg-1 col-md-2 col-sm-2 expander"
, actions     : "col-lg-1 col-md-1 col-sm-3"
}

let timeperiod = [
    {title:"Morning"  , time:{st:0, fn:11}}
  , {title:"Afternoon", time:{st:12, fn:17}}
  , {title:"Evening"  , time:{st:18, fn:23}}
]




// console.log(sessions(1, new Date()))

ReactDom.render(
  <WeeklyProg
    columns     = {cols}
    css         = {css}
    groupby     = "start"
    sessions    = {sessions(1, new Date())}
    sessionsApi = "/api/timetable.json"
    timeperiod  = {timeperiod}
  />,
  document.getElementById('weekly-prog')
);