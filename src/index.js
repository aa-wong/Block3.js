import { ethers } from 'ethers';
import Base from './base';
import Contracts from './contracts';
import BlockscanABI from './blockscan-abi';
import Transactions from './transactions';
import Blocks from './blocks';
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

  static get BlockscanABI() {
    return BlockscanABI;
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

  get blocks() {
    return new Blocks({ block3: this });
  }

  get user() {
    return new User({ block3: this });
  }

  get transactions() {
    return new Transactions({ block3: this });
  }

  get networks() {
    return new Networks({ block3: this });
  }

  get ens() {
    return new ENS({ block3: this });
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

  saveContract(contract) {
    const network = contract.network;

    if (!this.contracts[network.chainId]) {
      const cs = this.contracts;

      cs[network.chainId] = {};
      this.contracts = cs;
    }
    this.contracts[network.chainId][contract.address] = contract;
    return contract;
  }

  clearContracts() {
    delete this._['contracts'];
  }

  export() {
    if (this.contracts) this._['contracts'] = this.contracts.export();
    return super.export();
  }
}

export default Block3;
