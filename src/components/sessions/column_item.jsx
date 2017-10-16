import React from 'react';
import _ from 'lodash';

import ButtonCheck from '../../helpers/buttons_helper';

import timeChecker from '../../utils/time_checker';
import formatter from '../../utils/formatter';

// Components
import BookBtn from './stateless/book_btn';
import Time from './stateless/time';
import RichText from './stateless/richtext';
import Wrapper from './stateless/wrapper';

// Mixins
import mixins from 'morse-react-mixins';
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

export default ColumnItem;
