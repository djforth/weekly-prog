// Libraries
const React = require('react')
    , _     = require('lodash/core');

import Moment from 'moment';
import 'moment/locale/cy';

// Mixins
const cssMixins    = require('morse-react-mixins').css_mixins
    , textMixins   = require('morse-react-mixins').text_mixins
    , widthsMixins = require('morse-react-mixins').widths_mixins;

// Morse Libraies
const ViewportDetect = require('viewport-detection-es6');

// Flux
const ColumnsActions  = require('../actions/columns_actions')
    , SessionsActions = require('../actions/sessions_actions')
    , SessionsStore   = require('../stores/sessions_store');

// Components
const DateNav        = require('./nav/date_nav')
    , PeriodSessions = require('./sessions/period_sessions')
    , TopBar         = require('./topbar/top_bar');

class WeeklyProg extends React.Component{
  constructor(props){
    super(props);
    Moment.locale(props.locales)
    SessionsActions.setGroupby(this.props.groupby);

    this.percent = 0;
    this.state = {sessions: [], keys: [], visible: [], device: 'desktop'};
  }

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

  componentWillMount(){
    SessionsStore.addChangeListener('prerender', this._getSessions.bind(this));
    let ses = (_.isEmpty(this.props.sessions)) ? [] : this.props.sessions;
    SessionsActions.prerenderData(ses);
    ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);
  }

  componentDidMount(){
    this.detect = new ViewportDetect();
    this.device = this.detect.getDevice();
    this.size  = this.detect.windowSize();
    ColumnsActions.changeDevice(this.device);

    this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
    SessionsStore.addChangeListener('api_set', this._fetchData.bind(this));
    SessionsActions.setApi(this.props.sessionsApi);
  }

  componentWillUnmount(){
    this.detect.removeCallback(this.id);
    SessionsStore.removeChangeListener('prerender', this._getSessions);
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

module.exports = WeeklyProg;
