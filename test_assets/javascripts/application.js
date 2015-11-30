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


let config = {"columns":[{"key":"id"},{"key":"start","title":"time","concat":"finish","split":"- ","wrapper":"pill pill-secondary","type":"time","fmt":"%H:%M","desktop":true,"mobile":true,"tablet":true,"show":true},{"key":"session","wrapper":"bold-weight em","desktop":true,"mobile":true,"tablet":true,"show":true},{"key":"expand","title":"","desktop":true,"mobile":true,"tablet":true,"show":true},{"key":"location","desktop":true,"mobile":false,"tablet":true,"show":true},{"key":"instructor","desktop":true,"mobile":false,"tablet":false,"show":true},{"key":"activity","desktop":true,"mobile":false,"tablet":false,"show":true},{"key":"places_left","wrapper":"places","desktop":true,"mobile":false,"tablet":false,"show":true},{"key":"actions","title":"","desktop":true,"mobile":false,"tablet":true,"show":true},{"key":"description","show":true}],"css":{"default":"col-lg-2 col-md-3 col-sm-5","places_left":"col-lg-1","activity":"col-lg-1","session":"col-lg-2 col-md-3 col-sm-5","expand":"col-lg-1 col-md-2 col-sm-2 expander","actions":"col-lg-1 col-md-1 col-sm-3"},"feed":"api_path","groupby":"start","sessions":[{"id":1907253,"start":"2015-12-01 09:30","finish":"2015-12-01 10:25","session":"Dance Aerobics","location":"Dance Studio","instructor":"Alida","activity":"Dance Aerobics","places_left":0,"buttons":{"book":"#"}},{"id":1907355,"start":"2015-12-01 10:30","finish":"2015-12-01 11:25","session":"Ab Blast","location":"Dance Studio","instructor":"Alida","activity":"Ab Blast","places_left":0,"buttons":{"book":"#"}},{"id":1907457,"start":"2015-12-02 10:00","finish":"2015-12-02 10:55","session":"Cardio Blast","location":"Dance Studio","instructor":"Richard","activity":"Cardio Blast","places_left":0,"buttons":{"book":"#"}},{"id":1907559,"start":"2015-12-02 19:00","finish":"2015-12-02 19:55","session":"Fitness Balls","location":"Dance Studio","instructor":"Alida ","activity":"Fitness Balls","places_left":0,"buttons":{"book":"#"}},{"id":1992158,"start":"2015-12-04 10:00","finish":"2015-12-04 11:00","session":"Bums, Tums \u0026 Thighs","location":"Dance Studio","instructor":"Natasha","activity":"Bums, Tums \u0026 Thighs","places_left":0,"buttons":{"book":"#"}},{"id":1992673,"start":"2015-12-05 11:00","finish":"2015-12-05 12:00","session":"Bootcamp","location":"Dance Studio","instructor":"Michal","activity":"Bootcamp","places_left":0,"buttons":{"book":"#"}},{"id":2143004,"start":"2015-11-30 18:00","finish":"2015-11-30 19:00","session":"Power Pump","location":"Dance Studio","instructor":"Alida","activity":"Power Pump","places_left":0,"buttons":{"book":"#"}},{"id":2143265,"start":"2015-11-30 20:00","finish":"2015-11-30 21:00","session":"Yoga","location":"Dance Studio","instructor":"Linda","activity":"Yoga","places_left":0,"buttons":{"book":"#"}},{"id":2143527,"start":"2015-12-01 18:00","finish":"2015-12-01 19:00","session":"Step \u0026 Sculpt","location":"Dance Studio","instructor":"Alida","activity":"Step \u0026 Sculpt","places_left":0,"buttons":{"book":"#"}},{"id":2144049,"start":"2015-12-03 18:00","finish":"2015-12-03 19:00","session":"Step","location":"Dance Studio","instructor":"Alida","activity":"Step","places_left":0,"buttons":{"book":"#"}},{"id":2144310,"start":"2015-12-03 19:00","finish":"2015-12-03 20:00","session":"Bums, Tums \u0026 Thighs","location":"Dance Studio","instructor":"Alida","activity":"Bums, Tums \u0026 Thighs","places_left":0,"buttons":{"book":"#"}},{"id":2144571,"start":"2015-12-06 10:30","finish":"2015-12-06 11:30","session":"Body Conditioning","location":"Dance Studio","instructor":"Helen","activity":"Body Conditioning","places_left":0,"buttons":{"book":"#"}},{"id":2689219,"start":"2015-11-30 10:00","finish":"2015-11-30 11:00","session":"Body Conditioning","location":"Dance Studio","instructor":"Georgina","activity":"Body Conditioning","places_left":0,"buttons":{"book":"#"}},{"id":2689480,"start":"2015-12-02 11:00","finish":"2015-12-02 12:00","session":"Yoga","location":"Dance Studio","instructor":"Marcus","activity":"Yoga","places_left":0,"buttons":{"book":"#"}},{"id":2751906,"start":"2015-12-04 14:00","finish":"2015-12-04 14:55","session":"Yoga","location":"Dance Studio","instructor":"Marcus","activity":"Yoga","places_left":0,"buttons":{"book":"#"}},{"id":2752167,"start":"2015-12-04 13:00","finish":"2015-12-04 13:55","session":"Yoga","location":"Dance Studio","instructor":"Marcus","activity":"Yoga","places_left":0,"buttons":{"book":"#"}},{"id":4058288,"start":"2015-12-06 12:30","finish":"2015-12-06 13:00","session":"Circuit Training","location":"Sports Hall","instructor":"Junayed","activity":"Circuit Training","places_left":0,"buttons":{"book":"#"}},{"id":4179466,"start":"2015-11-30 12:00","finish":"2015-11-30 12:45","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Charles","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":4179570,"start":"2015-12-01 19:00","finish":"2015-12-01 19:45","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Alida","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":4179674,"start":"2015-12-02 18:00","finish":"2015-12-02 18:45","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Alida","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":4179778,"start":"2015-12-02 09:15","finish":"2015-12-02 10:00","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Richard","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":4179882,"start":"2015-12-06 11:30","finish":"2015-12-06 12:15","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Charles","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":4180084,"start":"2015-12-01 14:30","finish":"2015-12-01 15:00","session":"Functional Circuits","location":"X-Cube ","instructor":"Charles or Junayed","activity":"Functional Circuits","places_left":0,"buttons":{"book":"#"}},{"id":4180188,"start":"2015-12-02 12:00","finish":"2015-12-02 12:30","session":"X-Cube","location":"X-Cube ","instructor":"Charles or Junayed","activity":"X-Cube","places_left":0,"buttons":{"book":"#"}},{"id":4180292,"start":"2015-12-04 17:30","finish":"2015-12-04 18:00","session":"X-Cube","location":"X-Cube ","instructor":"Charles or Junayed","activity":"X-Cube","places_left":0,"buttons":{"book":"#"}},{"id":4314827,"start":"2015-12-05 10:00","finish":"2015-12-05 11:00","session":"Cardio Circuits","location":"Dance Studio","instructor":"Charles","activity":"Cardio Circuits","places_left":0,"buttons":{"book":"#"}},{"id":4327477,"start":"2015-12-03 10:30","finish":"2015-12-03 11:30","session":"Brazilian Dance","location":"Dance Studio","instructor":"Anna","activity":"Brazilian Dance","places_left":0,"buttons":{"book":"#"}},{"id":4428859,"start":"2015-12-02 15:45","finish":"2015-12-02 16:45","session":"Football","location":"Sports Hall","instructor":"Abdul","activity":"Football","places_left":0,"buttons":{"book":"#"}},{"id":4428962,"start":"2015-12-02 16:45","finish":"2015-12-02 17:45","session":"Football","location":"Sports Hall","instructor":"Abdul","activity":"Football","places_left":0,"buttons":{"book":"#"}},{"id":4429069,"start":"2015-12-03 18:00","finish":"2015-12-03 19:00","session":"Judo","location":"Sports Hall","instructor":"Leon","activity":"Judo","places_left":0,"buttons":{"book":"#"}},{"id":4429174,"start":"2015-12-03 19:00","finish":"2015-12-03 20:00","session":"Judo","location":"Sports Hall","instructor":"Leon","activity":"Judo","places_left":0,"buttons":{"book":"#"}},{"id":4429278,"start":"2015-12-03 16:00","finish":"2015-12-03 17:00","session":"Mixed Tennis","location":"Outdoor Tennis Courts","instructor":"Alex","activity":"Mixed Tennis","places_left":0,"buttons":{"book":"#"}},{"id":4429382,"start":"2015-12-03 17:00","finish":"2015-12-03 18:00","session":"Mixed Tennis","location":"Outdoor Tennis Courts","instructor":"Alex","activity":"Mixed Tennis","places_left":0,"buttons":{"book":"#"}},{"id":4429488,"start":"2015-12-03 18:00","finish":"2015-12-03 19:00","session":"Mixed Tennis","location":"Tennis Courts","instructor":"Alex","activity":"Mixed Tennis","places_left":0,"buttons":{"book":"#"}},{"id":4429593,"start":"2015-12-02 17:00","finish":"2015-12-02 19:00","session":"Badminton","location":"Sports Hall","instructor":"Norbert","activity":"Badminton","places_left":0,"buttons":{"book":"#"}},{"id":4619185,"start":"2015-12-03 20:00","finish":"2015-12-03 21:00","session":"Pilates","location":"Dance Studio","instructor":"Liz","activity":"Pilates","places_left":0,"buttons":{"book":"#"}},{"id":4619391,"start":"2015-11-30 15:30","finish":"2015-11-30 16:00","session":"Junior Fitness","location":"Dance Studio","instructor":"Charles","activity":"Junior Fitness","places_left":0,"buttons":{"book":"#"}},{"id":4962895,"start":"2015-11-30 09:00","finish":"2015-11-30 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962896,"start":"2015-12-01 09:00","finish":"2015-12-01 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962897,"start":"2015-12-02 09:00","finish":"2015-12-02 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962898,"start":"2015-12-04 09:00","finish":"2015-12-04 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962899,"start":"2015-12-03 09:00","finish":"2015-12-03 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962900,"start":"2015-12-05 09:00","finish":"2015-12-05 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":4962901,"start":"2015-12-06 09:00","finish":"2015-12-06 21:00","session":"Tennis for £1","location":"Tennis Courts","instructor":null,"activity":"Tennis for £1","places_left":0,"buttons":{"book":"#"}},{"id":5508778,"start":"2015-12-03 17:15","finish":"2015-12-03 18:00","session":"Group Cycle","location":"Group Cycle Studio","instructor":"Charles","activity":"Group Cycle","places_left":0,"buttons":{"book":"#"}},{"id":6070882,"start":"2015-12-01 16:00","finish":"2015-12-01 16:30","session":"Ballet","location":"Dance Studio","instructor":"Joe ","activity":"Ballet","places_left":0,"buttons":{"book":"#"}},{"id":6071196,"start":"2015-12-01 16:30","finish":"2015-12-01 17:00","session":"Ballet","location":"Dance Studio","instructor":"Joe","activity":"Ballet","places_left":0,"buttons":{"book":"#"}}],"timeperiod":[{"title":"Morning","time":{"st":0,"fn":11}},{"title":"Afternoon","time":{"st":12,"fn":17}},{"title":"Evening","time":{"st":18,"fn":23}}]}


// console.log(sessions(1, new Date()))

ReactDom.render(
  <WeeklyProg
    columns    = {config.columns}
    css        = {config.css}
    groupby    = {config.groupby}
    sessions   = {config.sessions} //{sessions(1, new Date())}
    timeperiod = {config.timeperiod}
  />,
  document.getElementById('weekly-prog')
);