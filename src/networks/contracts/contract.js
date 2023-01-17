import { ethers } from 'ethers';
import Account from '../../accounts/account';
import Network from '../network';

class Contract extends Account {
  constructor(data = {}) {
    super(data);
    this._currentNetwork = this.network;
    this._functionIndex = {};
    this._eventIndex = {};
    this.abi = data.abi;

    this.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        this._currentNetwork = new Network(newNetwork);

        if (this._currentNetwork !== this.network) {
          this.resetCallbacks();
        }
      }
    });

    if (!this.address || !this.network) {
      throw new Error('Valid address and network is required to create contract instance');
    }
    this.resetCallbacks();
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
          this._functionIndex[k.name] = k;
        } else if (k.type === 'event') {
          e.push(k);
          this._eventIndex[k.name] = k;
        }
      }
      this._payables = p;
      this._nonpayables = n;
      this._views = v;
      this._events = e;
      this._miscellaneous = m;

      super.set('abi', a);
    }
  }

  get network() {
    return this.get('network');
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
    return this.provider.lookupAddress(this.address);
  }

  balance() {
    return this.provider.getBalance(this.address);
  }

  code() {
    return this.provider.getCode(this.address);
  }

  storage() {
    return this.provider.getStorageAt(this.address, 0);
  }

  transactionCount() {
    return this.provider.getTransactionCount(this.address);
  }

  async getAllTransactions() {
    let blockNumber = 0;
    const limit = 100;
    let hasMore = true;
    let transactions = [];

    while (hasMore) {
      try {
        const response = await this.contract.queryFilter(filter, blockNumber, blockNumber + limit);

        blockNumber = response.blockNumber + limit;
        transactions.push(...response.results);
        hasMore = response.results.length === limit;
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.resolve(transactions);
  }

  async execute(signer, abiName, args=[], params = {}) {
    if (this._currentNetwork.chainId !== this.network.chainId) {
      return Promise.reject(new Error('Incompatible current network.'));
    }
    const abi = this._functionIndex[abiName];

    if (!abi) {
      return Promise.reject(new Error(`function named ${abiName} is not found in the ABI function map.`));
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

    if (constant) {
      return this.contract[name](...args, params);
    }

    try {
      const res = await this.contract.connect(signer)[name](...args, params);

      return Promise.resolve(res);
    } catch (e) {
      const extractErrorMessage = (str) => {
        const open = str.indexOf('"message":"');
        const end = str.indexOf('",', open);

        return new Error(str.substring(open + 11, end));
      }
      return Promise.reject(extractErrorMessage(e.message));
    }
  }

  event(abiName, cb) {
    if (this._currentNetwork.chainId !== this.network.chainId) {
      throw new Error('Incompatible current network.');
    }
    const abi = this._eventIndex[abiName];

    if (!abi || !cb || typeof cb !== 'function') {
      throw new Error('abi and valid callback function is required.');
    }
    const {
      name,
      type
    } = abi;

    if (type !== 'event') {
      throw new Error('Invalid ABI. Should be of type `event`');
    }

    this.contract.on(name, cb);
    return this;
  }

  export() {
    if (this.network) this._['network'] = this.network.export();
    return super.export();
  }
}

export default Contract;
