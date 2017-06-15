
import React from 'react';

import _ from 'lodash';

// Mixins
import {css_mixins as cssMixins} from 'morse-react-mixins';
import {text_mixins as textMixins} from 'morse-react-mixins';


import Heading from './stateless/heading';

class DataHead extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  renderTh(){
    if (this.props.columns){
      let th = _.map(this.props.columns, function(col){
        return (
          <Heading
            css={this.checkCss(this.props.css, col.key)}
            key={this.createId(col.key, this.props.title)}
            title = {col.title} />
        );
      }.bind(this));

      return th;
    }

    return '';
  }

  render(){
    return (
      <div className="thead">
        <div className="tr">
          {this.renderTh()}
        </div>
      </div>
    );
  }
}

Object.assign(DataHead.prototype, cssMixins);
Object.assign(DataHead.prototype, textMixins);

export default DataHead;
