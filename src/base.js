class Base {
  constructor(data = {}) {
    this._ = {};
    this.update(data);
    this._callbacks = {};
  }

  get(prop, _default) {
    return this._[prop] !== null ? this._[prop] : _default;
  }

  set(prop, value, constructor) {
    if (value && constructorValidator(value, constructor)) {
      this._[prop] = value;
    }
  }

  constructorValidator(value, constructor) {
    if (constructor) {
      return value.constructor === constructor
    }
    return true;
  }

  update(data = {}) {
    Object.keys(data).forEach(prop => this._[prop] = data[prop]);
    return this;
  }

  get export() {
    return this._;
  }

  exportJson() {
    return JSON.parse(JSON.stringify(this.export));
  }

  _applyCallback(key, cb) {
    if (typeof cb === 'function') {
      this._callbacks[key] = e => cb(e);
    }
    return this;
  }
}

export default Base;
