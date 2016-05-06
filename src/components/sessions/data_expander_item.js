// Libraries
const React = require('react');
var _ = require('lodash/core');
_.includes = require('lodash/includes');
_.reject = require('lodash/reject');

// Flux
const ColumnsStore   = require('../../stores/columns_store');

// Components
const Additional = require('./additional')
    , DataItem  = require('./data_item');

// Mixins
const cssMixins  = require('morse-react-mixins').css_mixins;
const textMixins  = require('morse-react-mixins').text_mixins;

class DataExpanderItem extends React.Component{
  constructor(props){
    super(props);
    this.active = [{active: false}];
    this.info = ['list-group', 'collapse', {in: false}];
    this.state = {
      info: this.getClasses(this.info)
      , active: this.getClasses(this.active)
      , css: 'col-md-1'
      , device: 'desktop'
      , selected: false
      , show_additional: false
    };
  }

  _onClick(e){
    e.preventDefault();
    let show = !this.state.show_additional;

    this.active  = this.toggleCss(this.active);
    this.info  = this.toggleCss(this.info);
    this.setState({
      info: this.getClasses(this.info)
      , active: this.getClasses(this.active)
      , show_additional: show
    });
  }

  _expandTest(){
    let visible  = _.map(ColumnsStore.getShowable(), 'key');
    return this.props.data.reduce((p, v, k)=>{
      let t = (_.isBoolean(p)) ? p : false;
      return (t) ? t : _.includes(visible, k);
    });
  }

  render(){
    return (
      <div className={`tr ${this.state.active}`}>
        <DataItem
          css={this.props.css}
          data={this.props.data}
          expand={this._onClick.bind(this)}
        />
        <Additional
          data={this.props.data}
          active={this.state.active}
          info={this.state.info}
        />
      </div>
    );
  }

}

Object.assign(DataExpanderItem.prototype, cssMixins);
Object.assign(DataExpanderItem.prototype, textMixins);

module.exports = DataExpanderItem;
