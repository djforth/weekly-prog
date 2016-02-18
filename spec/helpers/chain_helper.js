
const _ = require("lodash/core");

function add_spy(title, obj){
  if(_.isUndefined(obj)){
    return jasmine.createSpy(title)
  }

  return jasmine.createSpyObj(title, obj)
}

function manage_list(){
  let list = [];
  return {
    add:(title, spy)=>{
      list.push({title:title, spy:spy});
      return title
    }
    , getList:()=>list
    , getSpy:(title)=>{
      let f = _.find(list, (l)=>l.title === title);
      return (_.isUndefined(f)) ? null : f.spy
    }
  }
}

module.exports = function(start, methods){
  let list = manage_list();
  let current = list.add(start, add_spy(start, methods));

  let obj = {
    addChain:(title)=>{
      let  spy    = list.getSpy(current);
      let spyNext = add_spy(title, methods);
      current = list.add(title, spyNext);
      let chainer = {}
      chainer[title] = spyNext
      spy.and.returnValue(chainer);
      return obj;
    }
    , addReturn:(value)=>{
      list.getSpy(current).and.returnValue(value);
      return obj
    }
    , getList:()=>list.getList()

    , getSpy:(title)=>{
      return list.getSpy(title)
    }

  }


  return obj;
}
