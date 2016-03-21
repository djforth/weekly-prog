//Libraries
const React = require("react");

const DataHead     = require("./data_head")
    , DataItems    = require("./data_items")
    , DataExpander = require("./data_expander_item");

// Flux
const SessionsStore = require("../stores/sessions_store");

// Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;

class PeriodSessions extends DataItems {

  constructor(props) {
    super(props);
    let sessions = this.props.sessions.getTimePeriod(this.props.time.st, this.props.time.fn)
    this.pagination = ["weekly-pagination", {"hidden": (sessions.size <= 4)}];

    this.state = {
        data:sessions
      , keys:[]
      , visible:[]
      , device:"desktop"
      , paginate:4
      , pagination_css:this.getClasses(this.pagination)};
  }

  componentDidMount() {
    //Data Changers
    SessionsStore.addChangeListener("changing_date", this._onLoaded.bind(this));
    SessionsStore.addChangeListener("fetched", this._onLoaded.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("changing_date", this._onLoaded);
    SessionsStore.removeChangeListener("fetched", this._onLoaded);
  }

  _renderData(){

    if(this.state.data && this.state.data.size > 0){
       let data = this.state.data.slice(0, this.state.paginate);
       let items = []
       data.forEach(function(k){
         if(k){
          items.push(
            <DataExpander css={this.props.css} data={k} key={`session-${k.get("id")}`} />
            );
         }

      }.bind(this));

      return items;
    } else {
      return (<div className="cols-lg-12" key={`${this.props.title.toLowerCase()}-nosessions`}>
        <h5 className="no-sessions">{this.props.no_sessions || "There are no sessions this"} {this.props.title}</h5>
      </div>);
    }
  }

  render() {
    return (
      <section key="items" className={`panel ${this.props.title.toLowerCase()}`}>
        <header className="section-header">
          <h1 className="gg beta secondary">{this.props.title}</h1>
        </header>
        <div className="table">
          <DataHead device={this.props.device} css={this.props.css} key={`${this.props.title.toLowerCase()}head`} />
            <div className="tbody">
              {this._renderData(this.state.paginate)}
            </div>
        </div>
        <div className={this.state.pagination_css}>
          <a href="#" onClick={this._paginate.bind(this)} className="button button-pagination">Load More</a>
        </div>
      </section>
    );
  }

  _onLoaded(){

    let sessions = SessionsStore._getDate().data.getTimePeriod(this.props.time.st, this.props.time.fn);

    this.pagination[1]["hidden"] = (sessions.size <= 4 );
    // console.log("pagination", this.pagination)
    this.setState({paginate:4, pagination_css:this.getClasses(this.pagination), data:sessions});
  }


  _paginate(e){
    e.preventDefault();
    let pag = this.state.paginate + 4;
    if(pag > this.state.data.size){

      this.pagination  = this.toggleCss(this.pagination);
    }
    this.setState({paginate:pag, pagination_css:this.getClasses(this.pagination)})
  }
}

Object.assign(PeriodSessions.prototype, cssMixins);

module.exports = PeriodSessions;
