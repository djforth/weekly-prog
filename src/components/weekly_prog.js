//Libraries
const React = require("react");
const _     = require("lodash");

const cssMixins  = require("morse-react-mixins").css_mixins;
const textMixins = require("morse-react-mixins").text_mixins;
const widthsMixins = require("morse-react-mixins").widths_mixins;


class WeeklyProg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render(){
    console.log("navitems", this.props.navitems)
    return (
     <h1>Weekly Prog</h1>

    );
  }

}

Object.assign(WeeklyProg.prototype, cssMixins);
Object.assign(WeeklyProg.prototype, textMixins);
Object.assign(WeeklyProg.prototype, widthsMixins);

module.exports = WeeklyProg;
