class BaseCollection {
  constructor(metaType, data) {
    this._ = {};
    this._items = [];
    this.MetaType = metaType;

    if (data && data.items) {
      this.createBatch(data.items);
    }
  }

  create(data, id) {
    let obj = null;

    if (data && data.constructor === Object) {
      obj = new this.MetaType(data);
      this._items.push(obj);

      if (id !== undefined) {
        if (this._[id] === undefined) this._[id] = {};

        this._[id][obj._[id]] = obj;
      }
    }
    return obj;
  }

  createBatch(data, append = {}, id) {
    let set = [];

    if (data && data.constructor === Array) {
      set = data.map(d => this.create({...d, ...append}, id));
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

  getById(id) {
    return this._.index.id[id] || this.find(item => item.id === id);
  }

  getByIndexValue(key, value) {
    let index = this._[key];

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
    return JSON.parse(JSON.stringify({items: this.getAll()}));
  }
}

module.exports = BaseCollection;
