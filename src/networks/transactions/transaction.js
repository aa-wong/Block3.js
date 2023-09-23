import { ethers } from 'ethers';
import Base from '../../base';
const {
  BigNumber,
  utils
} = ethers;

class Transaction extends Base {
  get network() {
    return this.get('network');
  }

  get hash() {
    return this.get('hash');
  }

  get type() {
    return this.get('type');
  }

  get accessList() {
    return this.get('accessList');
  }

  get blockHash() {
    return this.get('blockHash');
  }

  get blockNumber() {
    return this.get('blockNumber');
  }

  get transactionIndex() {
    return this.get('transactionIndex');
  }

  get confirmations() {
    return this.get('confirmations');
  }

  get from() {
    return this.get('from');
  }

  get gasPrice() {
    const price = this.get('gasPrice');

    if (price !== undefined) {
      return utils.formatEther(price);
    }
    return undefined;
  }

  get gasLimit() {
    const limit = this.get('gasLimit');

    if (limit !== undefined) {
      return utils.formatEther(limit);
    }
    return undefined;
  }

  get to() {
    return this.get('to');
  }

  get value() {
    const val = this.get('value');

    if (val !== undefined) {
      return utils.formatEther(val);
    }
    return undefined;
  }

  get nonce() {
    return this.get('nonce');
  }

  get data() {
    return this.get('data');
  }

  get r() {
    return this.get('r');
  }

  get s() {
    return this.get('s');
  }

  get v() {
    return this.get('v');
  }

  get creates() {
    return this.get('creates');
  }

  get chainId() {
    return this.get('chainId');
  }

  wait() {
    return this.get('wait');
  }
}

export default Transaction;
