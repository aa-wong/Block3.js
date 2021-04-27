class Base {
  constructor(data = {}) {
    this._ = {};
    this.update(data);
  }

  get(prop, _default) {
    return this._[prop] !== null ? this._[prop] : _default;
  }

  set(prop, value, constructor) {
    if (value && value.constructor === constructor) {
      this._[prop] = value;
    }
  }

  update(data = {}) {
    Object.keys(data).forEach(prop => this._[prop] = data[prop]);
    return this;
  }

  export() {
    return JSON.parse(JSON.stringify(this._));
  }
}

export default Base;
