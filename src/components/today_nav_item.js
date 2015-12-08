//Libraries
const React = require("react")
    , _     = require("lodash");

const DateNavItem = require("./date_nav_item");

//Flux
const SessionsActions = require("../actions/sessions_actions")
    , ColumnsStore    = require("../stores/columns_store")

class TodayItem extends DateNavItem {
  constructor(props) {
    super(props);
    this.listCss = ["date-nav-item", "today-nav", {"active":this.props.active}]
    this.state = {list:this.getClasses(this.listCss), device:"desktop"};
  }



  _renderToday(){
    let fmt = this.props.nav_item.fmt;

    if(this.state.device === "mobile"){
      return (
        <span>
          <span className="nav-date">{fmt.format("DD")}</span>
          <span className="nav-day">Today</span>
        </span>
      );
    } else {
      return `Today ${fmt.format("Do")}`;
    }
  }

  render(){
    let item = this.props.nav_item
    return (
      <div role="presentation" className={this.state.list}>
        <a href      = "#"
           title     = {item.alt}
           onClick   = {this._click.bind(this)}
           className = "date-nav-item-link"
          >
            {this._renderToday(this.state.device)}
          </a>
      </div>
    );
  }
}

module.exports = TodayItem;