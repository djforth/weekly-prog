const React = require("react")
    , _     = require("lodash/core");

//Mixins
const cssMixins    = require("morse-react-mixins").css_mixins
    , textMixins   = require("morse-react-mixins").text_mixins;


//Flux
const SessionsActions = require("../actions/sessions_actions")
    , ColumnsStore    = require("../stores/columns_store")

class DateNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.listCss = ["date-nav-item", {"active":this.props.active}]
    this.linkCss = ["date-nav-item-link", {"loading-session":this.props.nav_item.nosessions}]
    this.state = {list:this.getClasses(this.listCss), link:this.getClasses(this.linkCss), device:ColumnsStore.getDevice()};
  }

  componentDidMount(){
    ColumnsStore.addChangeListener("change", this._setDevice.bind(this));
  }

  componentWillUnmount() {
    ColumnsStore.removeChangeListener("change", this._setDevice);
  }

  _setDevice(){
    // console.log("WTF>>>>>>>>>>>>>>>> ITEM", ColumnsStore.getDevice())
    this.setState({device:ColumnsStore.getDevice()})
  }

  _loader(){
    if(!this.props.nav_item.nosessions) return "";
    return(
      <div className="loading">
        <span className="hidden">Loading {this.props.nav_item.alt}</span>
      </div>
    );
  }

  _click(e){
    e.preventDefault();
    let date = this.props.nav_item.date;
    let cb   = this.props.callback;

    this.listCss  = this.toggleCss(this.listCss);
    this.setState({list:this.getClasses(this.listCss)});

    SessionsActions.changeDate(date);
    if(_.isFunction(cb)){
      cb(date)
    }
  }

  componentWillReceiveProps(nextProps){

    this.listCss = _.map(this.listCss, (li)=>{
      if(_.isObject(li) && _.has(li, "active")){
        li.active = nextProps.active;
      }
      return li;
    });

    this.linkCss = _.map(this.linkCss, (a)=>{
      if(_.isObject(a) && _.has(a, "loading-session")){
        a["loading-session"] = nextProps.nav_item.nosessions;
      }
      return a;
    });

    this.setState({
      list:this.getClasses(this.listCss),
      link:this.getClasses(this.linkCss)
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.active !== this.props.active)
        || (nextProps.nav_item.nosessions !== this.props.nav_item.nosessions) || this.state.device !== nextState.device
  }

  _renderTitle(){
    let fmt = this.props.nav_item.fmt;
    // console.log("device",this.state.device)
    if(this.state.device === "mobile"){
      return (
        <span>
          <span className="nav-date">{fmt.format("DD")}</span>
          <span className="nav-day">{fmt.format("ddd")}</span>
        </span>
      );
    } else {
      return fmt.format("ddd Do");
    }
  }


  render(){
    let item = this.props.nav_item
    return (
      <li role="presentation" className={this.state.list}>
        <span>{this._loader()}</span>
        <a href      = "#"
           title     = {item.alt}
           onClick   = {this._click.bind(this)}
           className = {this.state.link}
          >
          {this._renderTitle()}
          </a>
      </li>
    );
  }

}

Object.assign(DateNavItem.prototype, cssMixins);
Object.assign(DateNavItem.prototype, textMixins);


module.exports = DateNavItem;
