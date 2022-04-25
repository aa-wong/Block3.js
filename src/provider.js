import Base from './base';

class Provider extends Base {
  get provider() {
    return this.get('provider');
  }

  set provider(p) {
    this.set('provider', p);
  }

  export() {
    if (this.provider) this._['provider'] = undefined;
    return this.export();
  }
}

export default Provider;
