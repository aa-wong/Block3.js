import { ethers } from 'ethers';
import Provider from '../../provider';
const {
  BigNumber,
  utils
} = ethers;

class Block extends Provider {
  get network() {
    return this.get('network');
  }

  get hash() {
    return this.get('hash');
  }

  get parentHash() {
    return this.get('parentHash');
  }

  get number() {
    return this.get('number');
  }

  get timestamp() {
    return this.get('timestamp');
  }

  get nonce() {
    return this.get('nonce');
  }

  get gasLimit() {
    const limit = this.get('gasLimit');

    if (limit !== undefined) {
      return utils.formatEther(limit);
    }
    return undefined;
  }

  get gasUsed() {
    const used = this.get('gasUsed');

    if (used !== undefined) {
      return utils.formatEther(used);
    }
    return undefined;
  }

  get miner() {
    return this.get('miner');
  }

  get extraData() {
    return this.get('difficulty');
  }

  get transactions() {
    return this.get('transactions');
  }

  get baseFeePerGas() {
    const base = this.get('baseFeePerGas');

    if (base !== undefined) {
      return utils.formatEther(base);
    }
    return undefined;
  }

  get difficulty() {
    const diff = this.get('gasUsed');

    if (diff !== undefined) {
      return utils.formatEther(diff);
    }
    return undefined;
  }
}

export default Block;
