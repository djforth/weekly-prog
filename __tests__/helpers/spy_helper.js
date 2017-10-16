import _ from 'lodash/core';

function add_spy(title, obj){
  if(_.isUndefined(obj)){
    return jasmine.createSpy(title)
  }

  return jasmine.createSpyObj(title, obj)
}

function createSpies(list){
    if(_.isString(list)){
      return {spy:add_spy(list), title:list}
    }

    if(_.isArray(list)){
      return _.map(list, (title)=>{
        let spy = (_.isArray(list)) ? add_spy(title[0], title[1])
        return {spy:add_spy(title), title:title}
      });
    }

    if(_.isObject(list)){
      return {spy:add_spy(list.title, list.methods) title:list}
    }

}

export default function(){
  let list = [];
  let obj = {
    add:(title, spy)=>{
      list.push({title:title, spy:spy});
    }
    , create:()=>{

    }
    , getList:()=>list
    , getSpy:(title)=>{
      let f = _.find(list, (l)=>l.title === title);
      return (_.isUndefined(f)) ? null : f.spy
    }
    , remove:()=>{

    }
  }

  return obj
}