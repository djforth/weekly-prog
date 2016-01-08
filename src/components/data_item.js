const React = require("react")
    , _     = require("lodash");

const ColumnsStore   = require("../stores/columns_store");

const timeChecker = require("../utils/time_checker")
    , formatter   = require("../utils/formatter");

//Mixins
let mixins = require("morse-react-mixins");
const [cssMixins, textMixins]  = [mixins.css_mixins, mixins.text_mixins];

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    this.active = [{active:false}];
    // this._select.bind(this);
    this.formatter = formatter(this.props.data)
    this.state = {data:this.props.data, columns:[], datefield:[]};

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

  _actions(col){
    let item = this.props.data;
    let places = item.get("places_left");
    if(_.isNumber(places) && places === 0){
      return(<span className="session-full">Session full</span>);
    }

    if(item.has("buttons") && item.get("buttons").has("book")){
      let link = item.get("buttons").get("book")
      return (link === "#" || _.isEmpty(link)) ? "" : (<a className="button button-secondary" href={link}>Book</a>);
    }

    return "";
  }

  _onChange(){
    if(this.mounted){
      this.setState({
        columns:ColumnsStore.getVisible()
      });
    }
  }

  _rawMarkup(data) {
    return <span dangerouslySetInnerHTML={ {__html: data} } />;
  }

  _renderColumn(col, item){
    return (
      <div className={this.checkCss(this.props.css, col.key)} key={_.uniqueId("dataItem")}>
        {this._wrapper(item, col)}
      </div>
    );
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

  _setCss(item, col){

    if(!col.type === "time" || _.isUndefined(col.concat)) return col.wrapper;

    let checker = timeChecker(item, col);
    return `${col.wrapper} ${checker.setNowOrPast("now", "past")}`;
  }

  _showValues(col){
    if(col.key === "actions") return this._actions(col);

    let value = this.formatter(col);
    if(_.isString(value) && value.match(/<|>/g)) return this._rawMarkup(value);
    if(col.type !== "time") return value;
    let checker = timeChecker(this.props.data, col);
    return checker.setNowOrPast(null, "Finished", value);
  }

  _wrapper(item, col){
    if(_.has(col, "wrapper")){
      return (
        <div className={this._setCss(item, col)}>
          {this._showValues(col)}
        </div>);
    }

    return this._showValues(col);
  }


  render() {
    return (
      <div className="row tr vPad5">
        {this._renderTd()}
      </div>
    );
  }


}

Object.assign(DataItem.prototype, cssMixins);
Object.assign(DataItem.prototype, textMixins);

module.exports = DataItem;
