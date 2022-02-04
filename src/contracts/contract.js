import Account from '../account';
import User from '../user';
import Network from '../networks/network';

class Contract extends Account {
  constructor(data = {}) {
    super(data);
    if (data.network) this.network = new Network(data.network);
    if (data.abi) this.abi = data.abi;
    this._callbacks = {};
  }

  get abi() {
    this.get('abi');
  }

  set abi(abi) {
    if (Array.isArray(abi)) {
      this.functions = undefined;
      this.events = undefined;
      this.miscellaneous = undefined;

      const functions = [];
      const events = [];
      const miscellaneous = [];

      for (let m of abi) {
        if (!m.type) miscellaneous.push(m);
        if (m.type === 'function') functions.push(m);
        else if (m.type === 'event') events.push(m);
      }

      this.functions = functions;
      this.events = events;
      this.miscellaneous = miscellaneous;

      this.set('abi', abi, Array);
    }
  }

  get user() {
    this.get('user');
  }

  set user(user) {
    this.set('user', user, User);
  }

  get network() {
    this.get('network');
  }

  set network(network) {
    this.set('network', network, Network);
  }

  get contract() {
    if (this._contract) {
      return this._contract;
    }
    this._contract = new ethers.Contract(this.address, this.abi, this.provider);

    return this._contract;
  }

  get functions() {
    return this._functions;
  }

  set functions(m) {
    if (m && constructorValidator(m, Array)) {
      this._functions = m;
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

  execute(abi, args=[], params = {}) {
    if (!abi) {
      return Promise.reject(new Error('abi parameter is required.'));
    }
    const {
      type,
      constant,
      inputs,
      name,
      payable,
      outputs
    } = abi;

    if (type === 'function') {
      return Promise.reject(new Error('Invalid ABI. Should be of type `function`'));
    }

    if (inputs.length > 0 && args.length !== inputs.length) {
      return Promise.reject(new Error('Invalid number of arguments provided.'));
    }

    if (payable && !params.value) {
      return Promise.reject(new Error('Payable methods requires value parameter to be provided.'));
    }

    if (!this.user || constant) {
      return this.contract[name](...args, params);
    }
    return this.contract.connect(this.user.signer)[name](...args, params);
  }

  event(abi, cb) {
    if (!abi || !cb || typeof cb !== 'function') {
      return Promise.reject(new Error('abi and valid callback function is required.'));
    }
    const {
      name,
      type
    } = abi;

    if (type !== 'event') {
      return Promise.reject(new Error('Invalid ABI. Should be of type `event`'));
    }

    this._callbacks[name] = this.contract.on(name, cb);
    return Promise.resolve(this);
  }

  export() {
    delete this._['user'];
    delete this._['provider'];
    if (this.network) this._['network'] = this.network.export();
    return super.export();
  }
}

export default Contract;
