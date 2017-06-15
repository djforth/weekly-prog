(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/has', 'lodash/reject', 'lodash/isBoolean', 'lodash/filter', 'lodash/first', 'lodash/find', 'lodash/map', 'lodash/uniqueId', 'events', 'lodash/includes', 'morse-react-mixins', '../dispatchers/columns_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/has'), require('lodash/reject'), require('lodash/isBoolean'), require('lodash/filter'), require('lodash/first'), require('lodash/find'), require('lodash/map'), require('lodash/uniqueId'), require('events'), require('lodash/includes'), require('morse-react-mixins'), require('../dispatchers/columns_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.has, global.reject, global.isBoolean, global.filter, global.first, global.find, global.map, global.uniqueId, global.events, global.includes, global.morseReactMixins, global.columns_dispatcher);
    global.columns_store = mod.exports;
  }
})(this, function (module, exports, _has2, _reject2, _isBoolean2, _filter2, _first2, _find2, _map2, _uniqueId2, _events, _includes, _morseReactMixins, _columns_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _has3 = _interopRequireDefault(_has2);

  var _reject3 = _interopRequireDefault(_reject2);

  var _isBoolean3 = _interopRequireDefault(_isBoolean2);

  var _filter3 = _interopRequireDefault(_filter2);

  var _first3 = _interopRequireDefault(_first2);

  var _find3 = _interopRequireDefault(_find2);

  var _map3 = _interopRequireDefault(_map2);

  var _uniqueId3 = _interopRequireDefault(_uniqueId2);

  var _includes2 = _interopRequireDefault(_includes);

  var _columns_dispatcher2 = _interopRequireDefault(_columns_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FilterMap = function FilterMap(filter, map) {
    return function (array) {
      var newArray = array.filter(filter);
      return newArray.map(map);
    };
  };

  var store = {
    device: 'desktop',
    columns: [],
    columns_ids: [],
    visible_columns: [],

    emitChange: function emitChange(event) {
      this.emit(event);
    },
    addChangeListener: function addChangeListener(event, callback) {
      this.on(event, callback);
    },
    removeChangeListener: function removeChangeListener(event, callback) {
      this.removeListener(event, callback);
    },
    addColumns: function addColumns(c, id) {
      id = id || (0, _uniqueId3.default)();
      var cols = this.setTitles(c);
      this.columns.push({
        id: id,
        cols: cols,
        visible: this.setVisibleColumns(cols)
      });
      return id;
    },
    changeDevice: function changeDevice(d) {
      var _this = this;

      this.device = d ? d : this.device;
      this.columns = (0, _map3.default)(this.columns, function (col) {
        col.visible = _this.setVisibleColumns(col.cols);
        return col;
      });
    },
    getDevice: function getDevice() {
      return this.device;
    },
    getColumn: function getColumn(id) {
      var items = void 0;
      if (id) {
        items = (0, _find3.default)(this.columns, function (col) {
          return col.id === id;
        });
      } else {
        items = (0, _first3.default)(this.columns);
      }

      if (items) {
        return items;
      }

      return { cols: [], visible: [] };
    },
    getDateColumns: function getDateColumns(id) {
      var _this2 = this;

      var column = this.getColumn(id).cols;
      var filterCols = FilterMap(function (col) {
        return col.type === 'date' || col.type === 'dateTime';
      }, function (col) {
        return _this2.reduceObj(col, ['key', 'title', 'type', 'fmt']);
      });

      return filterCols(column);
    },
    getHeadline: function getHeadline(id) {
      return (0, _find3.default)(this.getColumn(id).visible, function (col) {
        return col.headline;
      });
    },
    getKeys: function getKeys(id) {
      var visible = this.getColumn(id).visible;
      return (0, _map3.default)(visible, 'key');
    },
    getKeyAndTitle: function getKeyAndTitle(id) {
      var visible = this.getColumn(id).visible;
      return visible.map(function (_ref) {
        var key = _ref.key,
            title = _ref.title;
        return Object({ key: key, title: title });
      });
    },
    getLabeled: function getLabeled(id) {
      return (0, _filter3.default)(this.getColumn(id).visible, function (col) {
        return col.label;
      });
    },
    getNonLabeled: function getNonLabeled(id) {
      return (0, _filter3.default)(this.getColumn(id).visible, function (col) {
        return (0, _isBoolean3.default)(col.label) && !col.label;
      });
    },
    getSearchable: function getSearchable(id) {
      var _this3 = this;

      var column = this.getColumn(id).cols;
      var searchables = column.filter(function (col) {
        return col.searchable;
      });
      return searchables.map(function (col) {
        return _this3.reduceObj(col, ['key', 'title']);
      });
    },
    getShowable: function getShowable(id) {
      var _this4 = this;

      var column = this.getColumn(id);
      var showables = column.cols.filter(function (col) {
        return col.show && !(0, _includes2.default)(column.visible, col);
      });

      return showables.map(function (col) {
        return _this4.reduceObj(col, ['key', 'title']);
      });
    },
    getSortable: function getSortable(id) {
      var _this5 = this;

      var column = this.getColumn(id).cols;
      var filterCols = FilterMap(function (col) {
        return col.sortable;
      }, function (col) {
        return _this5.reduceObj(col, ['key', 'title']);
      });
      return filterCols(column);
    },
    getTitles: function getTitles(id) {
      var visible = this.getColumn(id).visible;
      return (0, _map3.default)(visible, 'title');
    },
    getTitleForKey: function getTitleForKey(key, id) {
      var column = this.getColumn(id).cols;
      var item = (0, _find3.default)(column, function (col) {
        return col.key === key;
      });
      return item.title;
    },
    getVisible: function getVisible(id) {
      return this.getColumn(id).visible;
    },
    reduceObj: function reduceObj(obj, values) {
      return values.reduce(function (newObj, v) {
        newObj[v] = obj[v];
        return newObj;
      }, {});
    },
    removeCols: function removeCols(removeItems) {
      return (0, _reject3.default)(this.columns, function (col) {
        return (0, _includes2.default)(removeItems, col);
      });
    },
    setVisibleColumns: function setVisibleColumns(cols) {
      var _this6 = this;

      var check = {};
      check[this.device] = true;

      return (0, _filter3.default)(cols, function (c) {
        return c[_this6.device];
      });
    },
    setTitles: function setTitles(columns) {
      columns = (0, _map3.default)(columns, function (col) {
        if (!(0, _has3.default)(col, 'title')) {
          var title = this.capitalize(col.key);
          col.title = title;
        }

        return col;
      }.bind(this));

      return columns;
    }
  };

  Object.assign(store, _morseReactMixins.text_mixins);

  var ColumnsStore = Object.assign({}, _events.EventEmitter.prototype, store);

  var registeredCallback = function registeredCallback(payload) {
    var action = payload.action;
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
    /*eslint-enable*/
  };

  ColumnsStore.dispatchToken = _columns_dispatcher2.default.register(registeredCallback);
  ColumnsStore.setMaxListeners(0);

  exports.default = ColumnsStore;
  module.exports = exports['default'];
});