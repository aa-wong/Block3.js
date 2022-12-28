import { ethers } from 'ethers';
import Base from './base';
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

  static get providers() {
    return ethers.providers;
  }

  static get isWeb3Supported() {
    const { ethereum } = window;

    return !!ethereum;
  }

  get blockscanApiKey() {
    return this.get('blockscanApiKey');
  }

  set blockscanApiKey(k) {
    this.set('blockscanApiKey', k, String);
  }

  get provider() {
    return this.get('provider');
  }

  set provider(p) {
    this.set('provider', p);
  }

  get user() {
    return new User({ block3: this });
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
}

(_export => {
  try {
    window.Block3 = _export;
  } catch (e) {
    module.exports = _export;
  }
})(Block3);

export default Block3;
