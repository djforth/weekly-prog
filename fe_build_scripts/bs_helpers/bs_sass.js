var _        = require("lodash")
  , bs        = require("./bs_helper")
  , configuration = require("../config")
  , folder    = require('../utils/folder_helpers')
  , sassBuild = require('../css_helpers/sass_multi');

var  config   = configuration.stylesheets
  , css_ext  = config.ext


module.exports = function(watch){
  watch = (_.isBoolean(watch)) ? watch : false;
  // console.log('watch >>>>>', watch);
  folder.clearFolder(
      config.output
    , config.ext
    , function(){
      console.log("cleared " + config.output);
      sass();
    }
  );

  function sass(){
    sassBuild(bs(), watch);
  }
}
