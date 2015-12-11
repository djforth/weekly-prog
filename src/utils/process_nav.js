const _     = require("lodash");


module.exports = function(items, txt="Sessions for "){
  return _.map(items, (item, i)=>{
    item.name  = _.clone(item.title);
    item.title = `${txt} ${item.name}`
    item.active = (i === 0);
    return item
  })
}