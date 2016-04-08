const React  = require('react')
    , Moment = require('moment');

const Calendar = require('react-date-range').Calendar;
// console.log(Calendar)

//Flux
const SessionsActions = require('../../actions/sessions_actions');


class CalendarHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open:false}
  }

  _openCalendar(e){
    e.preventDefault();
    let open = !this.state.open;
    this.setState({open:open})
  }

  _handleSelect(date){
    this.setState({open:false});
    SessionsActions.calendarChange(date.toDate());
  }

  _renderCalendar(){
    if (!this.state.open) return ''
    return (
      <Calendar
          date = {this.props.current}
          onChange={this._handleSelect.bind(this)}
          linkedCalendars={ true }
            theme={{
              DateRange      : {
                background   : '#ffffff'
              },
              Calendar       : {
                background   : '#66ae44',
                color        : '#ffffff',
              },
              MonthAndYear   : {
                background   : 'transparent',
                color        : '#ffffff',
                fontFamily   : 'Lato, Arial, Verdana, sans-serif',
                fontSize     : '1em'
              },
              MonthAndYearMonth : {
                fontSize : '2em'
              },
              Day            :{
                fontSize : '1em'
                // border : '1px solid red'
              },
              MonthButton    : {
                background   : '#66ae44'
              },
              MonthArrowPrev : {
                borderRightColor : '#ffffff',
              },
              MonthArrowNext : {
                borderLeftColor : '#ffffff',
              },
              Weekday        : {
                color        : '#255917'
              },
              DaySelected    : {
                background   : 'transparent',
                borderRadius : '0',
                borderBottom : '2px solid #e14e00'
              },
              DayActive    : {
                background   : '#ffffff',
                borderRadius : '5px'
              },
              DayInRange     : {
                color        : '#fff'
              },
              DayHover       : {
                background   : '#ffffff',
                borderRadius : '50px',
                color        : '#7f8c8d'
              }
            }
          }
      />
    );
  }

  _formatDate(){
    return (this.props.device === 'mobile') ? '' : this.props.current.format('MMMM')
  }

  render(){
   return (
    <div className='calendar-btn'>
      <button onClick={this._openCalendar.bind(this)}>
        <i className='calendar-icon'></i>
        <span className='month-str'>{this._formatDate()}</span>
      </button>
      <div className='calendar-holder'>
        {this._renderCalendar()}
      </div>
    </div>
    );
  }

}

module.exports = CalendarHolder