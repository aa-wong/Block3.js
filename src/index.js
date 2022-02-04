import 'babel-register';
import 'idempotent-babel-polyfill';
import { ethers } from 'ethers';
import Base from './base';
import Contracts from './contracts';
import blockscanABI from './blockscanABI';
import Transaction from './transaction';
import Block from './block';
import ENS from './ens';
import Networks from './networks';
import User from './user';

class Block3 extends Base {
  static get ethers() {
    return ethers;
  }

  static get utils() {
    return this.ethers.utils;
  }

  static get Contracts() {
    return Contracts;
  }

  static get providers() {
    return ethers.providers;
  }

  static get isWeb3Supported() {
    const { ethereum } = window;

    return !!ethereum;
  }

  get scanApiKey() {
    return this.get('scan_api_key');
  }

  set scanApiKey(apiKey) {
    this.set('scan_api_key', apiKey, String);
  }

  get provider() {
    return this.get('provider');
  }

  set provider(p) {
    this.set('provider', p);
  }

  get contracts() {
    return this.get('contracts', {});
  }

  set contracts(c) {
    this.set('contracts', c, Object);
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

  get networks() {
    return new Networks({ provider: this.provider });
  }

  get ens() {
    return new ENS({ provider: this.provider });
  }

  get xhr() {
    return this.get('xhr');
  }

  set xhr(c) {
    this.set('xhr', c, XMLHttpRequest);
  }

  getContract(network, address) {
    return this.contracts[network.chainId][address];
  }

  async loadContract(contract) {
    if (contract.address) {
      return Promise.reject(new Error('Contract address must be set in order to load the contract.'));
    }

    try {
      if (!contract.network) contract.network = await this.networks.current();
      if (!contract.abi) {
        if (!this.scanApiKey) {
          return Promise.reject(new Error('scanApiKey or contract.abi must be set in order to load the contract.'));
        }
        contract.abi = await blockscanABI(contract.address, this.scanApiKey, contract.network.name, this.xhr);
      }
      contract.provider = this.provider;
      contract.user = this.user;
      if (!this.contracts[network.chainId]) this.contracts[network.chainId] = {};
      this.contracts[network.chainId][contract.address] = contract;
      return Promise.resolve(contract);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  export() {
    if (this.contracts) this._['contracts'] = this.contracts.export();
    return super.export();
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
