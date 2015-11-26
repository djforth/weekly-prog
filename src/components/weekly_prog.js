//Libraries
const React = require("react");
const _     = require("lodash");

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
const PeriodSessions = require("./period_sessions");


class WeeklyProg extends React.Component {
  constructor(props) {
    super(props);

    SessionsActions.setGroupby(this.props.groupby);

    this.percent = 0;
    this.state = {sessions:[], keys:[], visible:[], device:"desktop"};
  }

  _getSessions(){
    // console.log("PRERENDERED GET DATA", SessionsStore._getDate())
    let session = SessionsStore._getDate()
    this.setState({date:session.date, sessions:session.data})
  }

  _onLoaded(){
    // console.log("Sessions fetched")
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

    this.setState({
      // device:device,
      loading:true,
      loading_txt:"Sessions Loading",
      percent: 0
    });

  }

  componentDidMount(){
    const detect = new ViewportDetect();
    this.device = detect.getDevice();
    this.size  = detect.windowSize();
    ColumnsActions.changeDevice(this.device);

    detect.trackSize(function(device, size){
      if(this.device !== device){
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size   = size;

    }.bind(this));

    SessionsStore.addChangeListener("fetched", this._onLoaded.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("prerender", this._getSessions);
    SessionsStore.removeChangeListener("fetched", this._onLoaded);
  }


  render(){

    return (
    <div className="tabbed-content weekly-prog">
      <ul className="tabbed-content-nav" role="tablist">
        <li role="presentation">
          <a role="tab" href="#" rel="tab-0" aria-controls="tab-0" aria-selected="true" className=" active">Today</a>
        </li>
      </ul>
      {this._renderPeriodSessions()}

    </div>

    );
  }

}

Object.assign(WeeklyProg.prototype, cssMixins);
Object.assign(WeeklyProg.prototype, textMixins);
Object.assign(WeeklyProg.prototype, widthsMixins);

module.exports = WeeklyProg;
