//Libraries

import React from 'react';

import _ from 'lodash/core';

//Mixins
import {
  css_mixins as cssMixins
  , text_mixinsimport as textMixins
  , widths_mixins as widthsMixins
} from 'morse-react-mixins';

// Morse Libraies

import ViewportDetect from 'viewport-detection-es6';

//utiles

import process_nav from '../utils/process_nav';

//Flux

import ColumnsActions from '../actions/columns_actions';

import ColumnsStore from '../stores/columns_store';

import SessionsActions from '../actions/sessions_actions';

import SessionsStore from '../stores/sessions_store';

// Components

import DataHead from './data_head';

import NowNextItems from './nownext_sessions';

import TouchNav from 'touch-nav';


class NowNext extends React.Component {
  constructor(props) {
    super(props);
    let navitems = process_nav(this.props.navitems, this.props.title_tag)
    SessionsActions.setGroupby(this.props.groupby);
    SessionsActions.setFacility(_.first(this.props.navitems).id)
    this.percent = 0;
    this.state = {sessions:[], keys:[], visible:[], device:'desktop', navitems:navitems};
  }

  //React life cycle
  componentWillMount(){
    SessionsStore.addChangeListener('prerender', this._getSessions.bind(this));
    SessionsActions.prerenderData(this.props.sessions);
    ColumnsActions.addingColumns(this.props.columns);
    ColumnsActions.changeDevice(this.device);

     // this._getSessions();
  }

  componentDidMount(){
    this.detect = new ViewportDetect();
    this.device = this.detect.getDevice();
    this.size  = this.detect.windowSize();
    ColumnsActions.changeDevice(this.device);
    // this.setState({device:this.device});
    this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
    this.detect.trackSize(function(device, size){
      if (this.device !== device){
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size   = size;

    }.bind(this));

    SessionsStore.addChangeListener('api_set', this._fetchData.bind(this));
    SessionsActions.setApi(this.props.sessionsApi);

  }

  componentWillUnmount() {
    this.detect.removeCallback(this.id);
    SessionsStore.removeChangeListener('prerender', this._getSessions);
  }

  _onDeviceChange(device, size){
      if (this.device !== device){
        this.device = device;
        ColumnsActions.changeDevice(device);
      }

      this.size   = size;

  }

  _fetchData(){
    SessionsStore.removeChangeListener('api_set', this._fetchData);
    _.defer(()=>{
      SessionsActions.fetchNowNext();
    });
  }

  _onClick(id, ...args){
    // console.log('click', args)
    SessionsActions.setFacility(id);
  }

  _getSessions(){
    let session = SessionsStore._getDate();
    if (!_.isEmpty(session)) {
      this.setState({date:session.date, sessions:session.data})
    }
  }

  render(){
    return(
      <div className='now-next'>
        <TouchNav navitems={this.state.navitems} callback={this._onClick.bind(this)} />
        <div className='table weekly-prog'>
          <DataHead device={this.props.device} css={this.props.css} key={'head'} />
          <div className='tbody'>
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

export default NowNext;
