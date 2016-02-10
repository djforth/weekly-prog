//Libraries
const React  = require("react")
    , _      = require("lodash/core")
    , Moment = require("moment");

//Flux
const SessionsStore   = require("../stores/sessions_store");

class PrintBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {print_url:this._setUrl(Moment())}
  }

  componentWillMount(){
    SessionsStore.addChangeListener("changing_date", this._changeDate.bind(this));
  }

  componentWillUnmount() {
    SessionsStore.removeChangeListener("changing_date", this._changeDate);
  }

  _setUrl(date){
    let date_str = date.format("YYYY/MM/DD")
    return this.props.print.replace(":date", date_str )
  }

  _changeDate(){

    let date = SessionsStore._getCurrentDate();

    this.setState({print_url:this._setUrl(Moment(date))});
  }

  render(){
    return (
      <a href={this.state.print_url} target="_blank" className="print-prog">
        <i className="print-prog-icon"></i>
        <span className="hidden">Print</span>
      </a>
    );
  }

}

module.exports = PrintBtn;