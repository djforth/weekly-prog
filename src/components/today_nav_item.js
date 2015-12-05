//Libraries
const React = require("react")
    , _     = require("lodash");

const DateNavItem = require("./date_nav_item");

class TodayItem extends DateNavItem {
  constructor(props) {
    super(props);
    this.listCss = ["date-nav-item", "today-nav", {"active":this.props.active}]
    this.state = {list:this.getClasses(this.listCss)};
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
            {item.fmt.formatDate("Today %d")}
          </a>
      </div>
    );
  }
}

module.exports = TodayItem;