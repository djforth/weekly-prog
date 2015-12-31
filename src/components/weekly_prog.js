//Libraries
const React = require("react")
    , _     = require("lodash");

//Mixins
const cssMixins    = require("morse-react-mixins").css_mixins
    , textMixins   = require("morse-react-mixins").text_mixins
    , widthsMixins = require("morse-react-mixins").widths_mixins;

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");

//Flux
const ColumnsActions  = require("../actions/columns_actions")
    , ColumnsStore    = require("../stores/columns_store")
    , SessionsActions = require("../actions/sessions_actions")
    , SessionsStore   = require("../stores/sessions_store");

// Components
const DateNav        = require("./date_nav")
    , Calendar       = require("./calendar")
    , PeriodSessions = require("./period_sessions")
    , PrintBtn       = require("./print_btn");


class WeeklyProg extends React.Component {
  constructor(props) {
    super(props);
    SessionsActions.setGroupby(this.props.groupby);

    this.percent = 0;
    this.state = {sessions:[], keys:[], visible:[], device:"desktop"};
  }

  _fetchData(){
    SessionsStore.removeChangeListener("api_set", this._fetchData);
    _.defer(()=>{
      SessionsActions.fetchData()
    });
  }

  _getSessions(){

    let session = SessionsStore._getDate()
    if(!_.isEmpty(session)) {
      this.setState({date:session.date, sessions:session.data})
    }
  }



  _renderPeriodSessions(){
    return _.map(this.props.timeperiod, (tp)=>{
      return (<PeriodSessions {...this.props}
        devive   = {this.state.device}
        sessions = {this.state.sessions}
        time     = {tp.time}
        title    = {tp.title}
        key      = {tp.title.toLowerCase()} />)
    });
  }

  componentWillMount(){
    SessionsStore.addChangeListener("prerender", this._getSessions.bind(this));
    SessionsActions.prerenderData(this.props.sessions);
    ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);


  }

  componentDidMount(){
    this.detect = new ViewportDetect();
    this.device = this.detect.getDevice();
    this.size  = this.detect.windowSize();
    ColumnsActions.changeDevice(this.device);
    // this.setState({device:this.device});
    this.id = this.detect.trackSize(this._onDeviceChange.bind(this));

    // SessionsStore.addChangeListener("fetched", this._onLoaded.bind(this));
    SessionsStore.addChangeListener("api_set", this._fetchData.bind(this));
    SessionsActions.setApi(this.props.sessionsApi);

  }

  componentWillUnmount() {
    this.detect.removeCallback(this.id);
    SessionsStore.removeChangeListener("prerender", this._getSessions);
    // SessionsStore.removeChangeListener("fetched", this._onLoaded);
  }

  _onDeviceChange(device, size){
      if(this.device !== device){
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size   = size;

  }


  render(){

    return (
    <div className="weekly-prog">
      <div className="clearfix calendar-bar">
        <Calendar device={this.state.device} />
        <PrintBtn print={this.props.print} />
      </div>
      <DateNav device={this.state.device} />
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
