import _ from 'lodash';

export default function(items, txt = 'Sessions for '){
  return _.map(items, (item, i)=>{
    item.name  = _.clone(item.title);
    item.title = `${txt} ${item.name}`;
    item.active = (i === 0);
    return item;
  });
};
