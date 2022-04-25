import { ethers } from 'ethers';
import Base from '../base';
import User from '../user';
import Network from '../networks/network';

class Contract extends Base {
  constructor(data = {}) {
    super(data);
    this.address = data.address;
    this.network = data.network;
    this._currentNetwork = this.network
    this.abi = data.abi;
    if (data.user && this.constructorValidator(data.user, User)) this.user = data.user;

    if (!this.address || !this.network || !this.abi || !this.user) {
      throw new Error('Valid address, users, abi and network is required to create contract instance');
    }
    this.resetCallbacks();
  }

  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  get abi() {
    return this.get('abi');
  }

  set abi(a) {
    if (Array.isArray(a)) {
      const p = [];
      const n = [];
      const v = [];
      const e = [];
      const m = [];

      for (let k of a) {
        if (!k.type) m.push(k);
        if (k.type === 'function') {
          if (k.stateMutability === 'view') v.push(k);
          else if (k.stateMutability === 'payable') p.push(k);
          else n.push(k);
        } else if (k.type === 'event') e.push(k);
      }
      this._payables = p;
      this._nonpayables = n;
      this._views = v;
      this._events = e;
      this._miscellaneous = m;

      super.set('abi', a);
    }
  }

  get user() {
    return this.get('user');
  }

  set user(user) {
    this.set('user', user, User);

    user.provider.on('network', (newNetwork, oldNetwork) => {
      console.log('Contract network update');
      if (oldNetwork) {
        this._currentNetwork = new Network(newNetwork);
        console.log(this._currentNetwork);
        if (this._currentNetwork !== this.network) {
          this.resetCallbacks();
        }
      }
    });
  }

  get network() {
    return this.get('network');
  }

  set network(network) {
    super.set('network', network, Network);
  }

  get contract() {
    if (this._contract) {
      return this._contract;
    }
    this._contract = new ethers.Contract(this.address, this.abi, this.user.provider);

    return this._contract;
  }

  get functions() {
    return {
      payables: this.payables,
      nonpayables: this.nonpayables,
      views: this.views
    }
  }

  get payables() {
    return this._payables === undefined ? [] : this._payables;
  }

  get nonpayables() {
    return this._nonpayables === undefined ? [] : this._nonpayables;
  }

  get views() {
    return this._views === undefined ? [] : this._views;
  }

  get events() {
    return this._events === undefined ? [] : this._events;
  }

  get miscellaneous() {
    return this._miscellaneous === undefined ? [] : this._miscellaneous;
  }

  getEnsName() {
    return this.user.provider.lookupAddress(this.address);
  }

  balance() {
    return this.user.provider.getBalance(this.address);
  }

  code() {
    return this.user.provider.getCode(this.address);
  }

  storage() {
    return this.user.provider.getStorageAt(this.address, 0);
  }

  transactionCount() {
    return this.user.provider.getTransactionCount(this.address);
  }

  execute(abi, args=[], params = {}) {
    if (this._currentNetwork.chainId !== this.network.chainId) {
      return Promise.reject(new Error('Incompatible current network.'));
    }
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

    if (type !== 'function') {
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
    if (this._currentNetwork.chainId !== this.network.chainId) {
      return Promise.reject(new Error('Incompatible current network.'));
    }
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

  resetCallbacks() {
    this._callbacks = {};
  }

  export() {
    if (this.network) this._['network'] = this.network.export();
    return super.export();
  }
}

export default Contract;
