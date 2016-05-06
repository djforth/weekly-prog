const React  = require('react')
    , Moment = require('moment');

const SessionsStore = require('../../stores/sessions_store');

// Mixins
const cssMixins  = require('morse-react-mixins').css_mixins;
const textMixins = require('morse-react-mixins').text_mixins;

const Calendar       = require('./calendar')
    , PrintBtn       = require('./stateless/print_btn');

class TopBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {current: Moment()};
  }

  componentWillMount(){
    SessionsStore.addChangeListener('changing_date'
      , this._changeDate.bind(this)
    );
  }

  componentWillUnmount(){
    SessionsStore.removeChangeListener('changing_date', this._changeDate);
  }

  _changeDate(){
    let date = SessionsStore._getCurrentDate();
    this.setState({current: Moment(date)});
  }

  _setUrl(){
    let date_str = this.state.current.format('YYYY/MM/DD');
    return this.props.print.replace(':date', date_str);
  }

  render(){
    return (
      <div className="clearfix calendar-bar">
        <Calendar
          device  = {this.props.device}
          current = {this.state.current}
        />
        <PrintBtn
          print = {this.props.print}
          url   = {this._setUrl()}
        />
      </div>
    );
  }
}

Object.assign(TopBar.prototype, cssMixins);
Object.assign(TopBar.prototype, textMixins);

module.exports = TopBar;
