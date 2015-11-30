//Libraries
const React = require("react");
const _     = require("lodash");

// Flux
const ColumnsStore   = require("../stores/columns_store");
const SessionsStore      = require("../stores/sessions_store");

//Components
const DataItem  = require("./data_item");

// Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;


class DataExpanderItem extends DataItem {
  constructor(props) {
    super(props);
    this.active = [{active: false}];
    this.answer = ["collapse", {"in": false}];
    this.chevron = ["glyphicon", {"glyphicon-chevron-up": false}, {"glyphicon-chevron-down": true}];
    this.state = {
      acc_css: this.getClasses(this.answer),
      active: this.getClasses(this.active),
      chevron: this.getClasses(this.chevron),
      css: "col-md-1",
      device: "desktop",
      selected: false,
      show_additional: false
    };

  }

  _onClick(e) {
    e.preventDefault();
    let show = (this.state.show_additional) ? false : true;

    this.active  = this.toggleCss(this.active);
    this.answer  = this.toggleCss(this.answer);
    this.chevron = this.toggleCss(this.chevron);
    this.setState({
      acc_css         : this.getClasses(this.answer),
      active          : this.getClasses(this.active),
      chevron         : this.getClasses(this.chevron),
      show_additional : show
    });

  }

  _renderAll(visible) {
    let data = this.props.data;

    if(data && visible) {

      let li = _.map(visible, (col) => {
        return this._renderItem(col, data);
      });

      return li;
    }

    return "";
  }

  _renderAdditional() {
    let additional = [];

    let visible  = ColumnsStore.getShowable();
    // console.log("visible", visible)
    let extra = _.reject(visible, {key:"description"});
    extra  = _.reject(extra, {key:"actions"});

    if(this.state.show_additional) {
      additional.push(
        <ul className={`list-group ${this.state.acc_css}`} key={`additonal${this.props.data.get("id")}`}>
          {this._renderAll(extra)}
        </ul>
      );
      additional.push(
        <div className="description">
          {this._rawMarkup(this.props.data.get("description"))}
        </div>
      )

      let action = _.where(visible, {key:"actions"})
      // console.log("action", action)
      if(!_.isEmpty(action)){
        additional.push(this._actions(this.props.data, action));
      }
    } else {
      additional = "";
    }

    return additional;
  }

  _renderItem(col, data){
    // let title = _.find(visible, {key:key}).title
    return <li className="list-group-item col-md-4" key={col.title+data.get("id")} ><strong>{col.title}:</strong> {this._displayData(data, col)}</li>;
  }

  _renderShowButton() {
    let buttonText;

    if(this.state.active) {
      buttonText = "Less Information";
    } else {
      buttonText = "More Information";
    }

    return (
      <div className={this.checkCss(this.props.css, "expand")}>
        <a href="#"
          onClick={this._onClick.bind(this)}
          className="icon icon-information"
          title={buttonText} >
          <span>{buttonText}</span>
        </a>
      </div>
    );
  }

  _renderTd(){
    let item = this.props.data;
    if(item && this.state.columns){
       return _.map(this.state.columns, function(col){
        return (col.key === "expand") ? this._renderShowButton() : this._renderColumn(col, item);
      }.bind(this));
    }
    return "";
  }

  render() {
    return (
      <div className={`tr ${this.state.active}`}>
        <div className="clearfix">
          {this._renderTd()}
        </div>
        <div className={`additional ${this.state.active}`}>
          {this._renderAdditional()}
        </div>
      </div>
    );
  }

}

Object.assign(DataExpanderItem.prototype, cssMixins);

module.exports = DataExpanderItem;