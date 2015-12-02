//Libraries
const React = require("react")
    , _     = require("lodash")
    , DataManager = require("datamanager");

//Mixins
const cssMixins    = require("morse-react-mixins").css_mixins
    , textMixins   = require("morse-react-mixins").text_mixins
    , widthsMixins = require("morse-react-mixins").widths_mixins;

//Flux
const SessionsActions = require("../actions/sessions_actions")
    , SessionsStore   = require("../stores/sessions_store");

class DateNav extends React.Component {
  constructor(props) {
    super(props);
    let dates = SessionsStore._getAllDates();
    let current = _.first(dates).date;
    // SessionsActions.setGroupby(this.props.groupby);

    this.percent = 0;
    this.state = {dates:SessionsStore._getAllDates(), current:current};
  }

  componentWillMount(){
    SessionsStore.addChangeListener("prerender", this._getDates.bind(this));
    SessionsStore.addChangeListener("fetched", this._getDates.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("prerender", this._getDates);
    SessionsStore.removeChangeListener("fetched", this._getDates);
  }

  _click(date, e){
    e.preventDefault();
    SessionsActions.changeDate(date)
    this.setState({current:date})
  }

  _setActive(date){
    return (date.getTime() === this.state.current.getTime()) ? "active" : "";
  }

  _getDates(){
    this.setState({dates:SessionsStore._getAllDates()})
  }

  _renderDate(d){
    return (<li role="presentation" key={this.createId(d.title, d.date.getDate(), d.date.getMonth())}>
          <a
            role="tab"
            href="#"
            rel="tab-0"
            aria-controls="sessions"
            aria-selected="true"
            title={d.alt}
            onClick={this._click.bind(this, d.date)}
            className={this._setActive(d.date)}
            >{d.title}</a>
        </li>);
  }

  _renderToday(d){
    return (<li role="presentation" key={this.createId(d.title, d.date.getDate(), d.date.getMonth())}>
        <a
          role="tab"
          href="#"
          rel="tab-0"
          aria-controls="sessions"
          aria-selected="true"
          title={d.alt}
          onClick={this._click.bind(this, d.date)}
          className={this._setActive(d.date)}>
            {d.fmt.formatDate("Today %d")}
          </a>
        </li>);
  }

  _renderDates(){
    if(this.state.dates.length){
      return _.map(this.state.dates, (d)=>{
        if(d.today){
          return this._renderToday(d)
        }
        return this._renderDate(d);
      });
    }

    return [];
  }


  render(){
    return (
      <ul className="tabbed-content-nav" role="tablist">
        {this._renderDates()}
      </ul>
    );
  }

}

Object.assign(DateNav.prototype, cssMixins);
Object.assign(DateNav.prototype, textMixins);
Object.assign(DateNav.prototype, widthsMixins);

module.exports = DateNav;