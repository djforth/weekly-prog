require("babel-polyfill");

const _        = require("lodash/core")
    , React    = require("react")
    , ReactDom = require('react-dom');

let sessions = require("../../spec/data/sessions.js")
const WeeklyProg = require("../../src/components/weekly_prog")

function createColumns(){
  let columns = [{key:"id"}, {key:"cancelled"}];
  let additional = _.partial(addColumn, {show:true});
  let mobile     = _.partial(addColumn, {desktop:true, mobile:true, tablet:true, show:true});
  let tablet     = _.partial(addColumn, {desktop:true, mobile:false, tablet:true, show:true});
  let desktop    = _.partial(addColumn, {desktop:true, mobile:false, tablet:false, show:true});

  function addColumn(defaults, keys){
    return _.map(keys, (k)=>{
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
, start       : "col-lg-2 col-md-3 col-sm-4"
, session     : "col-lg-2 col-md-3 col-sm-6"
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
    no_sessions = "There are no activities this"
    print       = "/timetable/print/:date/timetable.pdf"
    sessionsApi = "/api/timetable.json"
    sessions    = {sessions(1, new Date())}
    timeperiod  = {timeperiod}
  />,
  document.getElementById('weekly-prog')
);