const React           = require("react");
const _               = require("lodash/core");

const ColumnsStore   = require("../stores/columns_store");

//Mixins
const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;

class DataHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {columns:[]};
  }

  componentWillMount() {
    this.setState({columns:ColumnsStore.getVisible()});
  }

  componentDidMount() {
    this.setState({columns:ColumnsStore.getVisible()});

    ColumnsStore.addChangeListener("change", this._onChange.bind(this));
  }

  componentWillUnmount() {
    ColumnsStore.removeChangeListener("change", this._onChange);
  }

  renderTh(){
    if(this.state.columns){
      let th = _.map(this.state.columns, function(col, i){
        return (
          <div className={this.checkCss(this.props.css, col.key)} key={i}>
            {col.title}
          </div>
        );
      }.bind(this));

      return th;
    }

    return "";
  }

  render() {
    return (
      <div className="thead">
        <div className="tr">
          {this.renderTh()}
        </div>
      </div>
    );
  }

  _onChange(){
    let columns = ColumnsStore.getKeyAndTitle();
    this.setState({
      columns:columns
    });
  }
}

Object.assign(DataHead.prototype, cssMixins);
Object.assign(DataHead.prototype, textMixins);

module.exports = DataHead;
