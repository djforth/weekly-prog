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

class PeriodSessions extends DataItems {

  constructor(props) {
    super(props);
    let sessions = this.props.sessions.getTimePeriod(this.props.time.st, this.props.time.fn)
    this.pagination = ["pagination", {"hide": false}];
    this.state = {
        data:sessions
      , keys:[]
      , visible:[]
      , device:"desktop"
      , paginate:4
      , pagination_css:this.getClasses(this.pagination)};
  }

  _renderData(){
    if(this.state.data){
       let data = this.state.data.slice(0, this.state.paginate);

       let items = data.map(function(k){
         if(k){
          return (
            <DataExpander css={this.props.css} data={k} key={k.get("id")} />
            );
         }

      }.bind(this));

      return items;
    }
  }

  render() {
    return (
      <section key="items" className={this.props.title.toLowerCase()}>
        <header className="section-header">
          <h1 className="gg beta secondary">{this.props.title}</h1>
        </header>
         <div className="table">
            <DataHead device={this.props.device} css={this.props.css} key={"morninghead"} />
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
    let sessions = SessionsStore._getDate().getTimePeriod(this.props.time.st, this.props.time.fn);

    this.pagination.hide = false;

    this.setState({paginate:4, pagination_css:this.getClasses(this.pagination)})

    this.setState({data:sessions.data, keys:SessionsStore.getKeys()});
  }

  _paginate(e){
    e.preventDefault();
    let pag = this.state.paginate * 2;
    // console.log("pag", pag > this.state.data.count())
    if(pag > this.state.data.count()){

      this.pagination  = this.toggleCss(this.pagination);
      // console.log("pag", this.pagination)
      // console.log(this.getClasses(this.pagination))
    }
    this.setState({paginate:pag, pagination_css:this.getClasses(this.pagination)})
  }
}

Object.assign(PeriodSessions.prototype, cssMixins);

module.exports = PeriodSessions;
