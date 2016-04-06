const React = require("react")
    , _     = require("lodash/core");

const timeChecker = require("../utils/time_checker")
    , formatter   = require("../utils/formatter");

let BookBtn  = require('./simple/book_btn')
  , Time     = require('./simple/time')
  , RichText = require('./simple/richtext');

function getBook(item){
  let places = item.get("places_left");
  let link = (item.has("buttons") && item.get("buttons").has("book")) ? item.get("buttons").get("book") : null;

  return {places: places, link: link}
}

function actions(col){
  let item = this.props.item;
  let places = item.get("places_left");
  let link = (item.has("buttons") && item.get("buttons").has("book")) ? item.get("buttons").get("book") : null;


  return (<BookBtn places={places} link={link}/>)
}

function showContent(value){
  return(<RichText content={value} />)
}

function showTime(value){
  return (<Time
    cols = {this.props.col}
    checker = {timeChecker(this.props.item, this.props.col)}
    time = {value}
    cancelled = {this.props.item.has('cancelled')}

    />);
}

module.exports = function(props){
  let col = props.col;
  if(col.key === "actions"){
    let book = getBook(props.item);
    return (<BookBtn
      places = {book.places}
      link = {book.link}
    />);
  }

  let value = props.formatter(col);
  if(props.col.type !== "time"){
    return (<RichText content={value} />);
  }

  return (<Time
    cols = {props.col}
    checker = {timeChecker(props.item, props.col)}
    time = {value}
    cancelled = {props.item.has('cancelled')}
    />);
}