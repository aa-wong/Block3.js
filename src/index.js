import 'babel-register';
import 'idempotent-babel-polyfill';
import ethers from "ethers";
import Contracts from './contracts';
import blockscanABI from './blockscanABI';
import Transaction from './transaction';
import Block from './block';
import ENS from './ens';
import Network from './network';
import User from './user';

class Block3 {
  constructor() {
    this._contracts = {};
  }

  static get ethers() {
    return ethers;
  }

  static get Contracts() {
    return Contracts;
  }

  static get providers() {
    return ethers.providers;
  }

  get apiKey() {
    return this.get('apiKey');
  }

  set apiKey(apiKey) {
    this.set('apiKey', apiKey, String);
  }

  get provider() {
    return this._provider;
  }

  set provider(p) {
    this._provider = p;
  }

  get contracts() {
    return this._contracts;
  }

  set contracts(c) {
    this._contracts = c;
  }

  get block() {
    return new Block({ provider: this.provider });
  }

  get user() {
    return new User({ provider: this.provider });
  }

  get transaction() {
    return new Transaction({ provider: this.provider });
  }

  get network() {
    return new Network({ provider: this.provider });
  }

  get ens() {
    return new ENS({ provider: this.provider });
  }

  get network() {
    return new Network({ provider: this.provider });
  }

  get xhr() {
    return this.get('xhr');
  }

  set xhr(c) {
    this.set('xhr', c, XMLHttpRequest);
  }

  get isWeb3Supported() {
    const { ethereum } = window;

    return !!ethereum;
  }

  getContract(address) {
    return this.contracts[address];
  }

  async loadContract(contract) {
    if (!contract.network || !contract.address) {
      return Promise.reject(new Error('contract network, contract address must be set in order to load the contract.'));
    }

    try {
      if (!contract.abi) {
        if (!this.apiKey) {
          return Promise.reject(new Error('apiKey or contract.abi must be set in order to load the contract.'));
        }
        contract.abi = await blockscanABI(contract.address, this.apiKey, contract.network, this.xhr);
      }
      contract.provider = this.provider;
      contract.user = this.user;
      this.contracts[contract.address] = contract;
      return Promise.resolve(contract);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

(_export => {
  try {
    window.Block3 = _export;
  } catch (e) {
    module.exports = _export;
  }
})(Block3);

export default Block3;
