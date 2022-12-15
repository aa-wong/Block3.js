const Collection = require('./base-collection');

class ProviderCollection extends Collection {
  constructor(metaType, data) {
    let block3;

    if (data.block3) {
      block3 = data.block3;
      delete data.block3;
    }
    super(metaType, data);
    this._block3 = block3;
  }

  get block3() {
    return this._block3;
  }

  get provider() {
    return this.block3.provider;
  }

  create(data, id) {
    return super.create({...data, block3: this.block3 }, id);
  }

  export() {
    return this.export();
  }
}

module.exports = ProviderCollection;
