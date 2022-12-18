import Base from './base';

class Provider extends Base {
  constructor(data = {}) {
    let block3;

    if (data.block3) {
      block3 = data.block3;
      delete data.block3;
    }
    super(data);
    this._block3 = block3;
  }

  get block3() {
    return this._block3;
  }

  get provider() {
    return this.block3.provider;
  }

  export() {
    return this.export();
  }
}

export default Provider;
