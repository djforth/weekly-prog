// Libraries
import React from 'react';
import _ from 'lodash';
import Moment from 'moment';
import 'moment/locale/cy';

// Mixins
import {
  css_mixins as cssMixins
  , text_mixins as textMixins
  , widths_mixins as widthsMixins
} from 'morse-react-mixins';

// Morse Libraies
import ViewportDetect from '@djforth/viewport-detection-fp';

// Flux
import ColumnsActions from '../actions/columns_actions';
import SessionsActions from '../actions/sessions_actions';
import SessionsStore from '../stores/sessions_store';

// Components
import DateNav from './nav/date_nav';
import PeriodSessions from './sessions/period_sessions';
import TopBar from './topbar/top_bar';

class WeeklyProg extends React.Component{
  constructor(props){
    super(props);
    Moment.locale(props.locales);
    SessionsActions.setGroupby(this.props.groupby);

    this.percent = 0;
    this.state = {sessions: [], keys: [], visible: [], device: 'desktop', hasError: false};
  }

  componentDidCatch(error, info){
    console.log(this.props);
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  componentWillMount(){
    SessionsStore.addChangeListener('prerender', this._getSessions.bind(this));
    let ses = (_.isEmpty(this.props.sessions)) ? [] : this.props.sessions;
    SessionsActions.prerenderData(ses);
    ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);
  }

  componentDidMount(){
    this.vpDetect = ViewportDetect();
    this.vpDetect.addCallback((device)=>{
      this.setState({device});
    });
    this.vpDetect.track();
    // this.detect = new ViewportDetect();
    this.device = this.vpDetect.getDevice();
    this.size  = this.vpDetect.getWidth();
    ColumnsActions.changeDevice(this.device);

    // this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
    SessionsStore.addChangeListener('api_set', this._fetchData.bind(this));
    SessionsActions.setApi(this.props.sessionsApi);
  }

  componentWillUnmount(){
    // this.detect.removeCallback(this.id);
    SessionsStore.removeChangeListener('prerender', this._getSessions);
  }

  // shouldComponentUpdate(){
  //   return true
  // }

  _fetchData(){
    SessionsStore.removeChangeListener('api_set', this._fetchData);
    _.defer(()=>{
      SessionsActions.fetchData();
    });
  }

  _getSessions(){
    let session = SessionsStore._getDate();
    if (!_.isEmpty(session)){
      this.setState({date: session.date, sessions: session.data});
    }
  }

  _renderPeriodSessions(){
    return _.map(this.props.timeperiod, (tp)=>{
      return (<PeriodSessions {...this.props}
        devive   = {this.state.device}
        sessions = {this.state.sessions}
        time     = {tp.time}
        title    = {tp.title}
        key      = {tp.title.toLowerCase()} />);
    });
  }

  _onDeviceChange(device, size){
    if (this.device !== device){
      this.device = device;
      ColumnsActions.changeDevice(device);
    }
    this.size   = size;
  }

  render(){
    return (
      <div className="weekly-prog">
        <TopBar
          device={this.state.device}
          print={this.props.print}
        />
        <DateNav />
        <div id="sessions" className="clearfix">
        {this._renderPeriodSessions()}
        </div>
      </div>
    );
  }
}

Object.assign(WeeklyProg.prototype, cssMixins);
Object.assign(WeeklyProg.prototype, textMixins);
Object.assign(WeeklyProg.prototype, widthsMixins);

export default WeeklyProg;


