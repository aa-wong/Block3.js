import Provider from './provider';

class Collection extends Provider {
  constructor(metaType, data) {
    if (data.network) {
      const { network } = data;

      if (network.block3) data.block3 = network.block3;
    }
    super(data);
    this._ = Object.assign({index: {}}, data);
    this._items = [];
    this.MetaType = metaType;

    if (data && data.items) {
      this.createBatch(data.items);
    }
  }

  get(prop, _default) {
    const o = this._[prop];

    return o !== undefined ? o : _default;
  }

  set(prop, value, constructor) {
    if (value && this.constructorValidator(value, constructor)) this._[prop] = value;
  }

  constructorValidator(value, constructor) {
    if (constructor) {
      return value.constructor === constructor
    }
    return true;
  }

  create(data, key) {
    let obj = null;

    if (data && data.constructor === Object) {
      obj = new this.MetaType(data);
      this._items.push(obj);

      if (key !== undefined) {
        if (this._.index[key] === undefined) this._.index[key] = {};

        this._.index[key][obj._[key]] = obj;
      }
    }
    return obj;
  }

  createBatch(data, append = {}, key) {
    let set = [];

    if (data && data.constructor === Array) {
      set = data.map(d => this.create({...d, ...append}, key));
    }
    return set;
  }

  isCollectionItemType(item) {
    return item && item.constructor === this.CollectionItemType;
  }

  getAll() {
    return this._items;
  }

  getCount() {
    return this._items.length;
  }

  itemProperties() {
    return this.getCount() > 0 ? this.getAll()[0].properties() : [];
  }

  filter(...args) {
    return this._items.filter(...args);
  }

  find(...args) {
    return this._items.find(...args) || null;
  }

  mmap(...args) {
    return this._items.map(...args);
  }

  each(...args) {
    return this._items.forEach(...args);
  }

  getById(id, key) {
    if (!this._.index[key]) this._.index[key] = {};
    return this._.index[key][id];
  }

  getByIndexValue(key, value) {
    let index = this._.index[key];

    if (index !== undefined) {
      return index[value];
    }
    return undefined;
  }

  getByAllIndexValues(index, values = []) {
    const results = [];
    const missing = [];

    for (let val of values) {
      const obj = this.getByIndexValue(index, val)

      if (obj) results.push(obj);
      else missing.push(val);
    }

    return {
      results,
      missing
    }
  }

  getByExtensorKey(key) {
    return this.filter(item => item.extensors[key]);
  }

  getByExtensorValueWithKey(val, key) {
    this.filter(item => item.extensors[key] === val);
  }

  export() {
    return this.getAll().map(e => e.export());
  }

  exportJson() {
    return JSON.parse(JSON.stringify({items: this.export()}));
  }
}

export default Collection;
