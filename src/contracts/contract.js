import Account from '../account';
import User from '../user';

class Contract extends Account {
  get abi() {
    this.get('abi');
  }

  set abi(abi) {
    this.methods = undefined;
    this.events = undefined;
    this.miscellaneous = undefined;

    const methods = [];
    const events = [];
    const miscellaneous = [];

    for (let m of abi) {
      if (!m.type) miscellaneous.push(m);
      if (m.type === 'function') methods.push(m);
      else if (m.type === 'event') events.push(m);
    }

    this.methods = methods;
    this.events = events;
    this.miscellaneous = miscellaneous;

    this.set('abi', abi, Array);
  }

  get user() {
    this.get('user');
  }

  set user(user) {
    this.set('user', user, User);
  }

  get contract() {
    if (this._contract) {
      return this._contract;
    }
    this._contract = new ethers.Contract(this.address, this.abi, this.provider);

    return this._contract;
  }

  get methods() {
    return this._methods;
  }

  set methods(m) {
    if (m && constructorValidator(m, Object)) {
      this._methods = m;
    }
  }

  get events() {
    return this._events;
  }

  set events(e) {
    if (e && constructorValidator(e, Array)) {
      this._events = e;
    }
  }

  get miscellaneous() {
    return this._miscellaneous;
  }

  set miscellaneous(m) {
    if (m && constructorValidator(e, Array)) {
      this._miscellaneous = m;
    }
  }

  async execute(method, args, params = {}) {
    if (!method || !from) {
      return Promise.reject(new Error('method parameter is required.'));
    }
    const {
      constant,
      inputs,
      name,
      payable,
    } = method;

    if (inputs.length > 0 && args.length !== inputs.length) {
      return Promise.reject(new Error('Invalid number of arguments provided.'));
    }

    if (payable && !params.value) {
      return Promise.reject(new Error('Payable methods requires value parameter to be provided.'));
    }

    if (!this.user || constant) {
      return this.contract[method](...args, params);
    }
    return this.contract.connect(this.user.signer)[method](...args, params);
  }

  export() {
    delete this._['user'];
    return super.export();
  }
}

export default Contract;
