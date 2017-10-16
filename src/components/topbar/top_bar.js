 import React from 'react';
 import Moment from 'moment';

 import SessionsStore from '../../stores/sessions_store';

// Mixins
 import {css_mixins as cssMixins} from 'morse-react-mixins';
 import {text_mixins as textMixins} from 'morse-react-mixins';

 import Calendar from './calendar';
 import PrintBtn from './stateless/print_btn';

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

export default  TopBar;
