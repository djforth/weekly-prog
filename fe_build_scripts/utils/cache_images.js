var _        = require('lodash')
 , store     = require("../config").image_store
 , es        = require('event-stream')
 , folder    = require('./folder_helpers')
 , fs        = require('fs')
 , path      = require('path')
 , Readwrite = require('./write_json') ;


var json = [];
readwrite = Readwrite(store);
readwrite.readJSON(function(data){
  // console.log("data", data);
  json = data;
}, function(){
  console.log("no json")
});

module.exports = {
  addJson:function(v, k){
    // If Key and value strings
    if(_.isString(k) && _.isString(v)) {
      json.push({key:k, value:v});
    }
    // If array of data
    else if (_.isArray(v)){
      json = _.compact(json.concat(v));
    }
    // Else if object with key and value
    else if(_.isObject(v)
        && _.includes(_.keys(v), "key", "value")){
      json.push(v)
    }

    // console.log(json);
  }

  , checkJson: function(key){
    var file = _.find(json, function(j){
       return (j.key === key)
    });
    // console.log()
    if(file) return file.value;

    return null;
  }

  , writeJson:function(cb){
    readwrite.writeJSON(json, function(){
      console.log("written")
    }, function(){
      console.log("failed")
    });
  }
}
