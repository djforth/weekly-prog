const React = require('react')
    , _     = require('lodash/core');

const ButtonCheck = require('../../helpers/buttons_helper');

const timeChecker = require('../../utils/time_checker')
    , formatter   = require('../../utils/formatter');

// Components
let BookBtn  = require('./stateless/book_btn')
  , Time     = require('./stateless/time')
  , RichText = require('./stateless/richtext')
  , Wrapper  = require('./stateless/wrapper');

// Mixins
let mixins = require('morse-react-mixins');
const [cssMixins, textMixins]  = [mixins.css_mixins, mixins.text_mixins];

class ColumnItem extends React.Component{
  constructor(props){
    super(props);
    this.formatter = formatter(this.props.item);
  }

  _actions(){
    let item, places;
    item = this.props.item;
    places = item.get('places_left');
    let {link, title, instruction} = ButtonCheck(item);
    return (<BookBtn places={places} link={link} title={title} instruction={instruction} />);
  }

  _showContent(value){
    return (
      <RichText content={value} />
    );
  }

  _showTime(value){
    let cancelled, item;
    item = this.props.item;
    cancelled = (item.has('cancelled')) ? item.get('cancelled') : false;
    return (<Time
      cols = {this.props.col}
      checker = {timeChecker(item, this.props.col)}
      time = {value}
      cancelled = {cancelled}
      />);
  }

  _showValues(){
    let col = this.props.col;
    if (col.key === 'actions') return this._actions(col);
    let value = this.formatter(col);

    if (_.isString(value) && value.match(/<|>/g)){
      return (<RichText content={value} />);
    }

    if (col.type === 'time'){
      return this._showTime(value);
    }

    return value;
  }

  render(){
    let col, css;
    col = this.props.col;
    css = this.checkCss(this.props.css, col.key);
    return (
      <div className={css} key={_.uniqueId('dataItem')}>
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
