import {EventEmitter as EventEmitter} from 'events';
import _ from 'lodash';
import includes from 'lodash/includes';
import {text_mixins as textMixins} from 'morse-react-mixins';
import ColumnsDispatcher from '../dispatchers/columns_dispatcher';

const FilterMap = (filter, map)=>(array)=>{
  let newArray = array.filter(filter);
  return newArray.map(map);
};

const store = {
  device: 'desktop'
  , columns: []
  , columns_ids: []
  , visible_columns: []

  , emitChange(event){
    this.emit(event);
  }

  , addChangeListener(event, callback){
    this.on(event, callback);
  }

  , removeChangeListener(event, callback){
    this.removeListener(event, callback);
  }

  , addColumns(c, id){
    id   = id || _.uniqueId();
    let cols = this.setTitles(c);
    this.columns.push({
      id: id
      , cols: cols
      , visible: this.setVisibleColumns(cols)
    });
    return id;
  }

  , changeDevice(d){
    this.device = (d) ? d : this.device;
    this.columns = _.map(this.columns, (col)=>{
      col.visible = this.setVisibleColumns(col.cols);
      return col;
    });
  }

  , getDevice(){
    return this.device;
  }

  , getColumn(id){
    let items;
    if (id){
      items =  _.find(this.columns, (col)=>{
        return col.id === id;
      });
    } else {
      items = _.first(this.columns);
    }

    if (items){
      return items;
    }

    return {cols: [], visible: []};
  }

  , getDateColumns(id){
    let column = this.getColumn(id).cols;
    const filterCols = FilterMap(
      (col)=>(col.type === 'date' || col.type === 'dateTime')
      , (col)=>this.reduceObj(col, ['key', 'title', 'type', 'fmt'])
    );

    return filterCols(column);
  }

  , getHeadline(id){
    return _.find(this.getColumn(id).visible, (col)=>{
      return col.headline;
    });
  }

  , getKeys(id){
    let visible = this.getColumn(id).visible;
    return _.map(visible, 'key');
  }

  , getKeyAndTitle(id){
    let visible = this.getColumn(id).visible;
    return visible.map(({key, title})=>Object({key, title}));
  }

  , getLabeled(id){
    return _.filter(this.getColumn(id).visible, (col)=>{
      return col.label;
    });
  }

  , getNonLabeled(id){
    return _.filter(this.getColumn(id).visible, (col)=>{
      return _.isBoolean(col.label) && !col.label;
    });
  }

  , getSearchable(id){
    let column = this.getColumn(id).cols;
    let searchables = column.filter((col)=>col.searchable);
    return searchables.map((col)=>this.reduceObj(col, ['key', 'title']));
  }

  , getShowable(id){
    let column = this.getColumn(id);
    let showables = column.cols.filter((col)=>{
      return col.show && !includes(column.visible, col);
    });

    return showables.map((col)=>{
      return this.reduceObj(col, ['key', 'title']);
    });
  }

  , getSortable(id){
    let column = this.getColumn(id).cols;
    let sortables = _.chain(column)
      .filter((col)=>col.sortable)
      .map((col)=>this.reduceObj(col, ['key', 'title']))
      .value();

    return sortables;
  }

  , getTitles(id){
    let visible = this.getColumn(id).visible;
    return _.map(visible, 'title');
  }

  , getTitleForKey(key, id){
    let column = this.getColumn(id).cols;
    let item = _.find(column, (col)=>col.key === key);
    return item.title;
  }

  , getVisible(id){
    return this.getColumn(id).visible;
  }

  , reduceObj(obj, values){
    return values.reduce((newObj, v)=>{
      newObj[v] = obj[v];
      return newObj;
    }, {});
  }

  , removeCols(removeItems){
    return _.reject(this.columns, (col)=>{
      return includes(removeItems, col);
    });
  }

  , setVisibleColumns(cols){
    let check = {};
    check[this.device] = true;

    return _.filter(cols, (c)=>c[this.device]);
  }

  , setTitles(columns){
    columns = _.map(columns, function(col){
      if (!_.has(col, 'title')){
        let title = this.capitalize(col.key);
        col.title = title;
      }

      return col;
    }.bind(this));

    return columns;
  }
};

Object.assign(store, textMixins);

const ColumnsStore = Object.assign({}, EventEmitter.prototype, store);

const registeredCallback = function(payload){
  let action = payload.action;
  /*eslint-disable*/
  switch (action.type) {
    case 'ADDING_COLUMNS':
      ColumnsStore.addColumns(action.columns, action.id);
      ColumnsStore.emitChange('adding');
      break;

    case 'CHANGE_DEVICE':
      ColumnsStore.changeDevice(action.device);
      ColumnsStore.emitChange('change');
      break;
    }
  /* eslint-enable*/
};

ColumnsStore.dispatchToken = ColumnsDispatcher.register(registeredCallback);
ColumnsStore.setMaxListeners(0);

export default ColumnsStore;
