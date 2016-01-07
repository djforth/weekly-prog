
require("babel-polyfill");

const _        = require("lodash")
    , React    = require("react")
    , ReactDom = require('react-dom')
    , Moment   = require("moment");

let sessions = require("../../spec/data/sessions.js")
// console.log(sessions(1))
const NowNext = require("../../src/components/now_next")

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


let ses = sessions(1, new Date(), {facility:0})
// console.log(ses)
let s = _.map(ses.slice(0,2), (s, i)=>{
  s.places_left = "-";
  let d = Moment().startOf('hour');
  if(i>0) d.add(i, "h");
  s.start = d.format("YYYY-MM-DD HH:mm");
  d.add(1, "h");
  s.finish = d.format("YYYY-MM-DD HH:mm");
  return s
});

var i = 0;
var nav_items = []
do{
  let nav = {
      title : `Facility ${i}`
    , id    : i
  }

  i++;
  nav_items.push(nav);
} while(i < 10);

console.log(JSON.stringify(s))
console.log(JSON.stringify(nav_items))

ReactDom.render(
  <NowNext
    columns     = {cols}
    css         = {css}
    groupby     = "start"
    navitems    = {nav_items}
    title_tag   = "Sessions for"
    sessions    = {s}
    sessionsApi = "/api/nownext/index.json"
  />,
  document.getElementById('weekly-prog')
);



let json = []
i = 1
do{
  let ses = sessions(1, new Date(), {facility:i})
  // console.log(ses)
  let s = _.map(ses.slice(0,2), (s, i)=>{

    let d = Moment().startOf('hour');
    if(i>0) d.add(i, "h");
    s.start = d.format("YYYY-MM-DD HH:mm");
    d.add(1, "h");
    s.finish = d.format("YYYY-MM-DD HH:mm");
    return s
  });

  json = json.concat(s);
  i++;
} while(i < 10);

console.log(json)
console.log(JSON.stringify(json))
