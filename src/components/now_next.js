//Libraries
const React = require("react")
    , _     = require("lodash");

//Mixins
const cssMixins    = require("morse-react-mixins").css_mixins
    , textMixins   = require("morse-react-mixins").text_mixins
    , widthsMixins = require("morse-react-mixins").widths_mixins;

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");

//utiles
const process_nav = require("../utils/process_nav");

//Flux
const ColumnsActions  = require("../actions/columns_actions")
    , ColumnsStore    = require("../stores/columns_store")
    , SessionsActions = require("../actions/sessions_actions")
    , SessionsStore   = require("../stores/sessions_store");

// Components
const DataHead     = require("./data_head")
    , NowNextItems = require("./nownext_sessions")
    , TouchNav     = require("touch-nav");


class NowNext extends React.Component {
  constructor(props) {
    super(props);
    let navitems = process_nav(this.props.navitems, this.props.title_tag)
    SessionsActions.setGroupby(this.props.groupby);
    SessionsActions.setFacility(_.first(this.props.navitems).id)
    this.percent = 0;
    this.state = {sessions:[], keys:[], visible:[], device:"desktop", navitems:navitems};
  }

  //React life cycle
  componentWillMount(){
    SessionsStore.addChangeListener("prerender", this._getSessions.bind(this));
    SessionsActions.prerenderData(this.props.sessions);
    ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);

     // this._getSessions();
  }

  componentDidMount(){
    const detect = new ViewportDetect();
    this.device = detect.getDevice();
    this.size  = detect.windowSize();
    ColumnsActions.changeDevice(this.device);
    // this.setState({device:this.device});
    detect.trackSize(function(device, size){
      if(this.device !== device){
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size   = size;

    }.bind(this));

    SessionsStore.addChangeListener("api_set", this._fetchData.bind(this));
    SessionsActions.setApi(this.props.sessionsApi);

  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("prerender", this._getSessions);
    // SessionsStore.removeChangeListener("fetched", this._onLoaded);
  }

  _fetchData(){
    SessionsStore.removeChangeListener("api_set", this._fetchData);
    _.defer(()=>{
      SessionsActions.fetchNowNext();
    });
  }

  _onClick(id, ...args){
    // console.log("click", args)
    SessionsActions.setFacility(id);
  }

  _getSessions(){
    let session = SessionsStore._getDate();
    if(!_.isEmpty(session)) {
      this.setState({date:session.date, sessions:session.data})
    }
  }

  render(){
    return(
      <div className="now-next">
        <TouchNav navitems={this.state.navitems} callback={this._onClick.bind(this)} />
        <div className="table weekly-prog">
          <DataHead device={this.props.device} css={this.props.css} key={"head"} />
          <div className="tbody">
            <NowNextItems {...this.props} />
          </div>
        </div>
      </div>
    );
  }

}

Object.assign(NowNext.prototype, cssMixins);
Object.assign(NowNext.prototype, textMixins);
Object.assign(NowNext.prototype, widthsMixins);

module.exports = NowNext;
