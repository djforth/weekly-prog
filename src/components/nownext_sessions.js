//Libraries
const React = require("react")
    , _     = require("lodash");

const DataHead     = require("./data_head")
    , DataItems    = require("./data_items")
    , DataExpander = require("./data_expander_item");

// Flux
const SessionsStore = require("../stores/sessions_store");

// Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;

class NowNextSessions extends DataItems {

  constructor(props) {
    super(props);

    this.state = {
        keys:[]
      , visible:[]
      , device:"desktop"
    }
  }

  componentDidMount() {
    //Data Changers
    SessionsStore.addChangeListener("fetched", this._getSessions.bind(this));
    SessionsStore.addChangeListener("set_facility", this._getSessions.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("fetched", this._getSessions);
    SessionsStore.removeChangeListener("set_facility", this._getSessions);

  }

  _renderData(){
    if(this.state.data && this.state.data.size > 0){
       let data = this.state.data;

       let items = data.map(function(k){
         if(k){
          return (
            <DataExpander css={this.props.css} data={k} key={k.get("id")} />
            );
         }

      }.bind(this));

      return items;
    } else {
      return (<div className="cols-lg-12">
        <h5 className="no-sessions">There is no sessions currently</h5>
      </div>);
    }
  }

  render() {
    return (
      <div className="tbody">
        {this._renderData(this.state.paginate)}
      </div>
    );
  }

  _getSessions(){
    let sessions = SessionsStore._getFacility();
    this.setState({data:sessions});
  }
}

Object.assign(NowNextSessions.prototype, cssMixins);

module.exports = NowNextSessions;
