// Libraries
const React = require('react');
var _ = require('lodash/core');
_.includes = require('lodash/includes');
_.reject = require('lodash/reject');

const ColumnsStore   = require('../../stores/columns_store');

// Mixins
const cssMixins  = require('morse-react-mixins').css_mixins;
const textMixins  = require('morse-react-mixins').text_mixins;

// Helpers
const ButtonCheck = require('../../helpers/buttons_helper');
// console.log('ButtonCheck', ButtonCheck)

const AdditionalContent  = require('./stateless/additional_content')
    , BookBtn     = require('./stateless/book_btn')
    , Description = require('./stateless/description')
    , RichText    = require('./stateless/richtext');

class Additional extends React.Component{
  constructor(props){
    super(props);
    this.state = {columns: ColumnsStore.getShowable()};
  }

  componentWillMount(){
    this.mounted = true;
    this.setState({columns: ColumnsStore.getShowable()});
    ColumnsStore.addChangeListener('change', this._onChange.bind(this));
  }

  componentWillUnmount(){
    this.mounted = false;
    ColumnsStore.removeChangeListener('change', this._onChange);
  }

  _onChange(){
    if (this.mounted){
      this.setState({
        columns: ColumnsStore.getShowable()
      });
    }
  }

  _checkButton(item){
    return item.has('buttons') && item.get('buttons').has('book');
  }

  _renderActions(){
    let col, item, key, places;

    col = _.filter(this.state.columns, {key: 'actions'});
    if (_.isEmpty(col)) return '';

    item = this.props.data;

    places = item.get('places_left');

    key = this.createId(col.key, item.get('id'));
    let {link, title, instruction} = ButtonCheck(item);
    return (<BookBtn
      places = {places}
      link   = {link}
      title  ={title}
      instruction={instruction}
      key    = {key}
    />);
  }

  _renderList(){
    let data, extra;
    data = this.props.data;

    extra = _.reject(this.state.columns, {key: 'description'});
    extra  = _.reject(extra, {key: 'actions'});
    if (data && extra){
      let li = _.map(extra, (col)=>{
        let key = this.createId(col.key, this.props.data.get('id'));
        return (
          <li className="list-group-item col-md-4"
            key  = {key}>
            <strong>{col.title}: </strong>
            <AdditionalContent
              col  = {col}
              item = {data}
            />
          </li>
        );
      });

      return li;
    }

    return '';
  }

  render(){
    return (<div className={`additional ${this.props.active}`}>
         <ul className={this.props.info}>
          {this._renderList()}
        </ul>
        <div className="description">
          <RichText content={this.props.data.get('description')} />
        </div>
        {this._renderActions()}
      </div>);
  }
}

Object.assign(Additional.prototype, cssMixins);
Object.assign(Additional.prototype, textMixins);

module.exports = Additional;

