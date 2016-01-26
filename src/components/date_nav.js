//Libraries
const React = require("react")
    , ReactDOM = require('react-dom')
    , _     = require("lodash");

// Utils
const checker = require("../utils/day_checker")

//Mixins
const cssMixins    = require("morse-react-mixins").css_mixins
    , textMixins   = require("morse-react-mixins").text_mixins
    , widthsMixins = require("morse-react-mixins").widths_mixins;

//Flux
const SessionsActions = require("../actions/sessions_actions")
    , SessionsStore   = require("../stores/sessions_store")
    , ColumnsStore    = require("../stores/columns_store");


const DateNavItem = require("./date_nav_item")
    , TodayItem   = require("./today_nav_item")

class DateNav extends React.Component {
  constructor(props) {
    super(props);
    let dates = this._splitDates();
    let today = dates[0]
    let current = today.date;
    this.pos = 0;
    this.state = {dates:dates[1], today:today, current:current, listWidth:1000, listPos:0};

  }

  componentDidMount(){
    this.setState({listWidth:this._setWidth()});
  }

  componentDidUpdate(){
    let holderWidth = document.querySelector(".list-holder").offsetWidth;
    let listWidth  = this._setWidth();
    if(listWidth !== this.state.listWidth){
      this.setState({listWidth:this._setWidth()});
    } else {
      let widths = this.state.listWidth + this.state.listPos;

      if(holderWidth > widths){
        SessionsActions.getMoreDays();
      }
    }
  }

  componentWillMount(){
    SessionsStore.addChangeListener("fetched", this._getDates.bind(this));
    SessionsStore.addChangeListener("changing_date", this._getDates.bind(this));
    SessionsStore.addChangeListener("calendar_changing", this._reset.bind(this));
    ColumnsStore.addChangeListener("change", this._deviceChange.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("calendar_changing", this._reset);
    SessionsStore.removeChangeListener("fetched", this._getDates);
    SessionsStore.removeChangeListener("changing_date", this._getDates);
    ColumnsStore.removeChangeListener("change", this._deviceChange);

  }

  _deviceChange(){
    this.setState({listWidth:this._setWidth()})
  }

  _getDates(){
    let dates = this._splitDates();
    let today = dates[0];
    this.setState({
      dates:dates[1],
      today:today,
      listWidth:this._setWidth(),
      current:SessionsStore._getCurrentDate()
    });
  }

  _getDistance(move){
    if(_.isEmpty(move)) return 0;

   return  _.reduce(move, (prev, cur)=>{
      return prev + cur
    });
  }

  _getPrevious(pos){
    if(pos >= 0){
      let tomorrow = _.clone(this.state.today.date);
      tomorrow.setDate(tomorrow.getDate()+1);
      let firstDate = _.first(this.state.dates).date
      if(!checker(tomorrow, firstDate)){
        SessionsActions.getPreviousDays(firstDate);
      }
    }
  }

  _mover(dir, e){
    e.preventDefault();
    let elms = this.getAllWidths();
    if(dir === "left" && this.pos > 0){
      this.pos--;
    } else if((dir === "right" && this.pos < elms.length)){
      this.pos++;
    }

    let move  = _.pluck(_.take(elms, this.pos), "width");
    let mover = -this._getDistance(move);
    this.setState({listPos:mover});
    this._getPrevious(mover);
  }

  _setCurrent(date){
    this.setState({current:date})
  }

  _setActive(date){
    return checker(date, this.state.current);
  }

  _setStyle(){

    let styles = {"width":this.state.listWidth, left:this.state.listPos}
    return _.mapValues(styles, (v)=> {
      return v.toString();
    });
  }

  _setWidth(){
    this.convertReactComps(this.refs);
    return Math.ceil(this.getWidths());
  }

  _splitDates(){
    let dates = SessionsStore._getAllDates();
    return [_.find(dates, (d)=>d.today), _.reject(dates, (d)=>d.today)]
  }

  _reset(){
    this.setState({listPos:0})
  }

  _renderDates(){

    if(this.state.dates.length){
      return _.map(this.state.dates, (d)=>{
        let key = this.createId(d.title, d.date.getDate(), d.date.getMonth());
        return (<DateNavItem
            ref      = {'ref_'+key}
            key      = {key}
            nav_item = {d}
            device   = {this.props.device}
            callback = {this._setCurrent.bind(this)}
            active   = {this._setActive(d.date)}
          />)
      });
    }

    return [];
  }

  _renderToday(){
    let today = this.state.today
    let key = this.createId(today.title, today.date.getDate(), today.date.getMonth());
    return (
     <TodayItem
        key      = {key}
        nav_item = {today}
        callback = {this._setCurrent.bind(this)}
        active   = {this._setActive(today.date)}
      />
    );
  }


  render(){
    return (
      <nav className="date-nav">
      <a href="#" className="nav-mover move-left" onClick={this._mover.bind(this, "left")}>
        <span className="hidden">left</span>
      </a>
      {this._renderToday()}
      <div className="list-holder">
        <ul className="date-list" role="tablist" style={this._setStyle()}>
          {this._renderDates()}
        </ul>
      </div>
      <a href="#" className="nav-mover move-right" onClick={this._mover.bind(this, "right")}>
        <span className="hidden">right</span>
      </a>
      </nav>
    );
  }

}

Object.assign(DateNav.prototype, cssMixins);
Object.assign(DateNav.prototype, textMixins);
Object.assign(DateNav.prototype, widthsMixins);

module.exports = DateNav;