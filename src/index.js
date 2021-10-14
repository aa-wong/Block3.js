import 'babel-register';
import 'idempotent-babel-polyfill';
import Web3 from 'web3';
import { Http } from './utils';
import Contracts from './contracts';
import Base from './base';
import ABI from './ABI';
import User from './user';
import IPFSStorageManager from './IPFS';

class Block3 extends Base {
  constructor(options = {}) {
    super(options);
    this.contracts = {};
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    this.provider = this.provider === undefined ? ethereum : this.provider;
    ethereum.enable();
    this.user = new User(ethereum);
    this.web3 = new Web3(this.provider);
  }

  static get Contracts() {
    return Contracts;
  }

  static get providers() {
    return Web3.providers;
  }

  static get IPFSStorageManager() {
    return IPFSStorageManager;
  }

  get apiKey() {
    return this.get('apiKey');
  }

  set apiKey(apiKey) {
    this.set('apiKey', apiKey, String);
  }

  get provider() {
    return this.get('provider');
  }

  set provider(p) {
    this.set('provider', p);
  }

  get contracts() {
    return this.get('contracts');
  }

  set contracts(c) {
    this.set('contracts', c, Object);
  }

  get user() {
    return this.get('user');
  }

  set user(u) {
    this.set('user', u, User);
  }

  get xhr() {
    return this.get('xhr');
  }

  set xhr(c) {
    this.set('xhr', c, XMLHttpRequest);
  }

  get ethereum() {
    const { ethereum } = window;
    return ethereum;
  }

  async gasLimit() {
    try {
      const block = this.web3.eth.getBlock("latest");

      return Promise.resolve(block.gasLimit);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  loadContract(contract, gasLimit) {
    return new Promise(async(resolve, reject) => {
      if (!contract.network || !contract.address) {
        return reject(new Error('contract network, contract address must be set in order to load the contract.'));
      }

      try {
        if (!contract.abi) {
          if (!this.apiKey) {
            return reject(new Error('apiKey or contract.abi must be set in order to load the contract.'));
          }
          contract.abi = await ABI(contract.address, this.apiKey, contract.network, this.xhr);
        }
        if (!gasLimit) gasLimit = await this.gasLimit();
        const newContract = new this.web3.eth.Contract(contract.abi, contract.address, { gasLimit });

        contract.contract = newContract;
        this.contracts[contract.address] = contract;
        return resolve(contract);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getContract(address) {
    return this.contracts[address];
  }

  isWeb3Supported() {
    const { ethereum } = window;
    return !!ethereum;
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
