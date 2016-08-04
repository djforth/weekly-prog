
module.exports = function(item){
  let no_link = {link: null, title: null, instruction: null};
  if (item.has('booking_instruction')){
    return Object.assign(no_link, {
      instruction: item.get('booking_instruction')
    });
  }

  if (item.hasIn(['buttons', 'buy'])){
    return Object.assign(no_link, {
      title: 'Buy'
      , link: item.getIn(['buttons', 'buy'])
    });
  }

  if (item.hasIn(['buttons', 'book'])){
    return Object.assign(no_link, {
      title: 'Book'
      , link: item.getIn(['buttons', 'book'])
    });
  }

  return no_link;
};
