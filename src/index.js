import 'babel-register';
import 'idempotent-babel-polyfill';
import Web3 from 'web3';
import { Http } from './utils';
import Contract from './contract';
import Base from './base';
import ABI from './ABI';

class Block3 extends Base {
  constructor(options = {}) {
    super(options);
    this.Contract = Contract;
    this.contracts = {};

    const { ethereum } = window;

    if (!this.provider) {
      if (!ethereum) {
        throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      this.provider = ethereum;
      ethereum.enable();
    }
    this.web3 = new Web3(this.provider);
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
    this.set('provider', p, String);
  }

  get contracts() {
    return this.get('contracts');
  }

  set contracts(c) {
    this.set('contracts', c, Object);
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

  loadContract(contract, gasLimit="100000") {
    return new Promise(async(resolve, reject) => {
      if (!this.apiKey || !contract.network || !contract.address) {
        return reject(new Error('apiKey and contract network, contract address must be set in order to load the contract.'));
      }

      try {
        contract.abi = await ABI(contract.address, this.apiKey, contract.network, this.xhr);

        contract.contract = new this.web3.eth.Contract(contract.abi, contract.address, { gasLimit });
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
