const React = require("react")
    , _     = require("lodash/core");

const timeChecker = require("../utils/time_checker")
    , formatter   = require("../utils/formatter");

// Components
let BookBtn  = require('./simple/book_btn')
  , Time     = require('./simple/time')
  , RichText = require('./simple/richtext')
  , Wrapper  = require('./simple/wrapper');

//Mixins
let mixins = require("morse-react-mixins");
const [cssMixins, textMixins]  = [mixins.css_mixins, mixins.text_mixins];

class ColumnItem extends React.Component {
  constructor(props) {
    super(props);
    this.formatter = formatter(this.props.item)
  }

  _actions(col){
    let item = this.props.item;
    let places = item.get("places_left");
    let link = (item.has("buttons") && item.get("buttons").has("book")) ? item.get("buttons").get("book") : null;


    return (<BookBtn places={places} link={link}/>)
  }

  _showContent(value){
    return(
      <RichText content={value} />
    )
  }

  _showTime(value){
    // alert(`Value: ${value}`)
    // if(value === "true -  true"){
    //   alert(`Value: ${value}`)
    // }
    return (<Time
      cols = {this.props.col}
      checker = {timeChecker(this.props.item, this.props.col)}
      time = {value}
      cancelled = {this.props.item.has('cancelled')}

      />);
  }

  _showValues(){
    let col = this.props.col;
    if(col.key === "actions") return this._actions(col);
    let value = this.formatter(col);

    if(_.isString(value) && value.match(/<|>/g)) return (<RichText content={value} />);
    if(col.type === "time"){
      return this._showTime(value)
    }


    return value;
  }

  render(){
    let col = this.props.col;
    return (
      <div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId("dataItem")}>
        <Wrapper item={this.props.item} col={col} >
          {this._showValues()}
        </Wrapper>
      </div>
    );
  }

}


Object.assign(ColumnItem.prototype, cssMixins);
Object.assign(ColumnItem.prototype, textMixins);

module.exports = ColumnItem;