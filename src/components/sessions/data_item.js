const React = require('react')
    , _     = require('lodash/core');

const ColumnsStore   = require('../../stores/columns_store');

const formatter   = require('../../utils/formatter');

// Mixins
let mixins = require('morse-react-mixins');
const [cssMixins, textMixins]  = [mixins.css_mixins, mixins.text_mixins];

// Components
let ColumnItem = require('./column_item')
    , ExpandBtn  = require('./stateless/expand_btn');

class DataItem extends React.Component{
  constructor(props){
    super(props);
    this.active = [{active: false}];
    // this._select.bind(this);
    this.formatter = formatter(this.props.data);
    this.state = {data: this.props.data, columns: [], datefield: []};
  }

  _createKey(keys){
    return this.createId(keys, this.props.data.get('id'));
  }

  componentWillMount(){
    this.mounted = true;
    this.setState({data: this.props.data, columns: ColumnsStore.getVisible()});
    ColumnsStore.addChangeListener('change', this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.mounted = false;
    ColumnsStore.removeChangeListener('change', this._onChange);
  }

  _expandTest(col){
    if (col.key !== 'expand') return false;
    let visible  = _.map(ColumnsStore.getShowable(), 'key');
    return this.props.data.reduce((p, v, k)=>{
      let t = (_.isBoolean(p)) ? p : false;
      return (t) ? t : _.includes(visible, k);
    });
  }

  _expander(){
    let buttonText = (this.state.active) ? 'Less ' : 'More ';
    buttonText += 'Information';
    return (<ExpandBtn
      css = {this.checkCss(this.props.css, 'expand')}
      expand = {this.props.expand}
      key = {this._createKey('expand')}
      text = {buttonText}
    />);
  }

  _onChange(){
    if (this.mounted){
      this.setState({
        columns: ColumnsStore.getVisible()
      });
    }
  }

  _renderTd(){
    let item = this.props.data;
    if (item && this.state.columns){
      let td = _.map(this.state.columns, function(col){
        if (this._expandTest(col)){
          return this._expander();
        }

        return (<ColumnItem
          css  = {this.props.css}
          col  = {col}
          item = {item}
          key  = {this._createKey(col.key)}
        />);
      }.bind(this));

      return td;
    }
    return '';
  }

  render(){
    return (
      <div className="clearfix">
        {this._renderTd()}
      </div>
    );
  }
}

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
