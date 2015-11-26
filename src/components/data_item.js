const React           = require("react");
// const PureRenderMixin = React.addons.PureRenderMixin;
const _               = require("lodash");

// const DataStore      = require("../stores/data_store");
const ColumnsStore   = require("../stores/columns_store");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    this.active = [{active:false}];
    // this._select.bind(this);
    this.state = {data:null, columns:[], datefield:[]};

  }

  componentWillMount() {
    this.mounted = true;
    this.setState({data:this.props.data, columns:ColumnsStore.getVisible()});
    ColumnsStore.addChangeListener("change", this._onChange.bind(this));
  }



  componentWillUnmount() {
    this.mounted = false;
    ColumnsStore.removeChangeListener("change", this._onChange);
  }

  _getFmt(col){
    if(_.has(col, "fmt")){
      return col.fmt;
    }

    if(_.has(col, "type") ){
      if(col.type === "dateTime"){
        return "%d/%m/%Y %H:%M";
      }
      if(col.type === "date"){
        return "%d/%m/%Y";
      }
    }

    return "%d/%m/%Y";
  }

  _actions(item, col){
    if(item.has("buttons") && item.get("buttons").has("book")){
      return (<a className="button button-secondary" href={item.get("buttons").get("book")}>Book</a>);
    }

    return(<span class="session-full">Session full</span>);
  }

  _concatData(item, col){
    if(col.key === "actions") return this._actions(item, col);

    if(_.has(col, "concat")) return (`${this._displayData(item, col)} ${col.split} ${this._displayData(item, col, "concat")}`);

    return this._displayData(item, col)
  }

  _displayData(item, col, k="key"){
    let key  = col[k];
    let data = item.get(key);
    if(_.isDate(data)){
      data = item.get(`${key}Df`);
      let fmt = this._getFmt(col);
      return data.formatDate(fmt);
    }

    return this._rawMarkup(data);
  }

  _wrapper(item, col){
    if(_.has(col, "wrapper")){
      return (
        <div className={col.wrapper}>
          {this._concatData(item, col)}
        </div>);
    }

    return this._concatData(item, col)
  }

  _renderColumn(col, item){
    return (
      <div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId("dataItem")}>
        {this._wrapper(item, col)}
      </div>
    );
  }

  _rawMarkup(data) {
    return <span dangerouslySetInnerHTML={ {__html: data} } />;
  }

  _renderTd(){
    let item = this.props.data;
    if(item && this.state.columns){
       let td = _.map(this.state.columns, function(col){

         return this._renderColumn(col, item);
      }.bind(this));

      return td;
    }
    return "";
  }


  render() {
    return (
      <div className="row tr vPad5">
        {this._renderTd()}
      </div>
    );
  }

  _onChange(){
    if(this.mounted){
      this.setState({
        columns:ColumnsStore.getVisible()
      });
    }

  }
}

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
