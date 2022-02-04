import Base from './base';

class Provider extends Base {
  get provider() {
    return this.get('provider');
  }

  export() {
    if (this.provider) this._['provider'] = undefined;
    return super.export();
  }
}

export default Provider;
