//Libraries
const React = require("react");
// const _     = require("lodash");

//Flux
const SessionsStore      = require("../stores/sessions_store");

//Components
const DataExpander = require("./data_expander_item");




class DataItems extends React.Component {

  constructor(props) {
    super(props);
    this.active = [{active:false}];

    // this._select.bind(this);
    this.state = {data:this.props.sessions.data, keys:[], visible:[], device:"desktop"};
  }

  componentWillMount(){
    SessionsStore.addChangeListener("prerender", this._onLoaded.bind(this));
  }

  componentDidMount() {


    //Data Changers
    SessionsStore.addChangeListener("pagination", this._onPagination.bind(this));
    SessionsStore.addChangeListener("change", this._onChange.bind(this));
    SessionsStore.addChangeListener("fetched", this._onLoaded.bind(this));

  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("fetched", this._onLoaded);
    SessionsStore.removeChangeListener("prerender", this._onLoaded);
    SessionsStore.removeChangeListener("change", this._onChange);
    SessionsStore.removeChangeListener("pagination", this._onPagination);
  }

  renderData(){
    if(this.state.data){

       let items = this.state.data.map(function(k){
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
      <div key="items">
        {this.renderData()}
      </div>

    );
  }

  _onChange(){
    this.setState({data:SessionsStore.paginationData()});
  }

  _onPagination() {
    this.setState({data:SessionsStore.paginationData()});
  }

  _onSearch() {
    // console.log("searching")
    this.setState({data:SessionsStore.getSearchData()});
  }

  _onLoaded(){
    this.setState({data:SessionsStore.getAll(), keys:SessionsStore.getKeys()});
  }
}

module.exports = DataItems;
