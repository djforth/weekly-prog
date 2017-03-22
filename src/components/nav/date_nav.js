// Libraries

import React from 'react';

import _ from 'lodash/core';
import take from 'lodash/take';
 _.take = take;
import mapValues from 'lodash/mapValues';
 _.mapValues = mapValues;
import reject from 'lodash/reject';
 _.reject = reject;

// Utils

import checker from '../../utils/day_checker';

// Mixins
import {
  css_mixins as cssMixins
  , text_mixinsimport as textMixins
  , widths_mixins as widthsMixins
} from 'morse-react-mixins';

// Flux

import SessionsActions from '../../actions/sessions_actions';

import SessionsStore from '../../stores/sessions_store';

import ColumnsStore from '../../stores/columns_store';


import NavItem from './stateless/nav_item';

import TodayItem from './stateless/today_nav_item';

class DateNav extends React.Component{
  constructor(props){
    let current, dates, today;
    super(props);
    dates = this._splitDates();
    today = dates[0];
    current = today.date;
    this.pos = 0;
    this.state = {
      dates: dates[1]
      , today: today
      , current: current
      , listWidth: 1000
      , listPos: 0
    };
  }

  componentDidMount(){
    this.setState({listWidth: this._setWidth()});
  }

  componentDidUpdate(){
    let holderWidth, listWidth;
    holderWidth = document.querySelector('.list-holder').offsetWidth;
    listWidth  = this._setWidth();
    if (listWidth === this.state.listWidth){
      let widths = this.state.listWidth + this.state.listPos;

      if (holderWidth > widths){
        SessionsActions.getMoreDays();
      }
    } else {
      this.setState({listWidth: this._setWidth()});
    }
  }

  componentWillMount(){
    SessionsStore.addChangeListener('fetched', this._getDates.bind(this));
    SessionsStore.addChangeListener('changing_date', this._getDates.bind(this));
    SessionsStore.addChangeListener('calendar_changing'
                                   , this._reset.bind(this)
                                  );
    ColumnsStore.addChangeListener('change', this._deviceChange.bind(this));
  }

  componentWillUnmount(){
    SessionsStore.removeChangeListener('calendar_changing', this._reset);
    SessionsStore.removeChangeListener('fetched', this._getDates);
    SessionsStore.removeChangeListener('changing_date', this._getDates);
    ColumnsStore.removeChangeListener('change', this._deviceChange);
  }

  _deviceChange(){
    this.setState({
      listWidth: this._setWidth()
      , device: ColumnsStore.getDevice()
    });
  }

  _getDates(){
    let dates, today;
    dates = this._splitDates();
    today = dates[0];
    if (!_.isDate(today.date) || !_.isDate(SessionsStore._getCurrentDate())){
      alert(today.date + ' : ' + SessionsStore._getCurrentDate());
    }
    this.setState({
      dates: dates[1]
      , today: today
      , listWidth: this._setWidth()
      , current: SessionsStore._getCurrentDate()
    });
  }

  _getDistance(move){
    if (_.isEmpty(move)) return 0;

    return _.reduce(move, (prev, cur)=>{
      return prev + cur;
    });
  }

  _getPrevious(pos){
    if (pos >= 0){
      let firstDate, tomorrow;
      tomorrow = _.clone(this.state.today.date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      firstDate = _.first(this.state.dates).date;
      if (!checker(tomorrow, firstDate)){
        SessionsActions.getPreviousDays(firstDate);
      }
    }
  }

  _mover(dir, e){
    let elms, move, mover;
    e.preventDefault();
    elms = this.getAllWidths();
    if (dir === 'left' && this.pos > 0){
      this.pos--;
    } else if ((dir === 'right' && this.pos < elms.length)){
      this.pos++;
    }

    move  = _.map(_.take(elms, this.pos), 'width');
    mover = -this._getDistance(move);
    this.setState({listPos: mover});
    this._getPrevious(mover);
  }

  _setCurrent(date, e){
    e.preventDefault();
    SessionsActions.changeDate(date);
    this.setState({current: date});
  }

  _setActive(date){
    return (checker(date, this.state.current)) ? 'active' : '';
  }

  _setStyle(){
    let styles = {
      width: this.state.listWidth
      , left: this.state.listPos
    };
    console.log(styles)
    return _.mapValues(styles, (v)=>{
      return v;
    });
  }

  _setWidth(){
    this.convertDomlist(this.refs.datelist.querySelectorAll('li'));
    return Math.ceil(this.getWidths());
  }

  _splitDates(){
    let dates = SessionsStore._getAllDates();
    return [_.find(dates, (d)=>d.today), _.reject(dates, (d)=>d.today)];
  }

  _reset(){
    this.setState({listPos: 0});
  }

  _renderDates(){
    if (this.state.dates.length){
      return _.map(this.state.dates, (d)=>{
        let key = this.createId(d.title, d.date.getDate(), d.date.getMonth());
        return (<NavItem
            key      = {key}
            nav_item = {d}
            device   = {this.state.device}
            onClick  = {this._setCurrent.bind(this, d.date)}
            active   = {this._setActive(d.date)}
          />);
      });
    }

    return [];
  }

  _renderToday(){
    let key, today;
    today = this.state.today;
    key = this.createId(today.title
      , today.date.getDate()
      , today.date.getMonth()
    );
    return (
     <TodayItem
        key      = {key}
        nav_item = {today}
        device   = {this.state.device}
        onClick  = {this._setCurrent.bind(this, today.date)}
        active   = {this._setActive(today.date)}
      />
    );
  }

  render(){
    return (
      <nav className="date-nav">
      <a href="#"
         className="nav-mover move-left"
         onClick={this._mover.bind(this, 'left')}
      >
        <span className="hidden">left</span>
      </a>
      {this._renderToday()}
      <div className="list-holder">
        <ul className="date-list"
            role="tablist"
            ref="datelist"
            style={this._setStyle()}>
          {this._renderDates()}
        </ul>
      </div>
      <a href="#"
         className="nav-mover move-right"
         onClick={this._mover.bind(this, 'right')}
      >
        <span className="hidden">right</span>
      </a>
      </nav>
    );
  }

}

Object.assign(DateNav.prototype, cssMixins);
Object.assign(DateNav.prototype, textMixins);
Object.assign(DateNav.prototype, widthsMixins);

export default DateNav;
