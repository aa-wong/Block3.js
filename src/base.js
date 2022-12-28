import Provider from './provider';

class Base extends Provider {
  constructor(data = {}) {
    if (data.network) {
      const { network } = data;

      if (network.block3) data.block3 = network.block3;
    }
    super(data);
    this._ = {};
    this.update(data);
    this._callbacks = {};
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

  update(data = {}) {
    Object.keys(data).forEach(prop => this._[prop] = data[prop]);
    return this;
  }

  export() {
    return Object.keys(this._).reduce((a, prop) => {
      if (this._[prop].constructor === Base) a[prop] = this._[prop].export();
      else a[prop] = this._[prop];

      return a;
    }, {});
  }

  exportJson() {
    return JSON.parse(JSON.stringify(this.export()));
  }

  _applyCallback(key, cb) {
    if (typeof cb === 'function') {
      this._callbacks[key] = e => cb(e);
    }
    return this;
  }
}

export default Base;
