import ProviderCollection from '../provider-collection';
import Block from './block';

class Blocks extends ProviderCollection {
  constructor(data) {
    super(Block, data);
  }

  async current(tx) {
    try {
      const id = await this.currentNumber();
      const block = this.getByIndexValue('hash', id);

      if (block !== undefined) {
        return Promise.resolve(block);
      }
      const blockData = await this.getBlock(id);

      return Promise.resolve(this.create(blockData));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async currentWithTransactions() {
    try {
      const id = await this.currentNumber();

      return this.getBlockWithTransactions(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  create(data) {
    return super.create(data, 'hash');
  }

  createBatch(data, append) {
    return super.createBatch(data, append, 'hash');
  }

  currentNumber() {
    return this.provider.getBlockNumber();
  }

  getBlock(id) {
    return this.provider.getBlock(id);
  }

  getCode(address) {
    return this.provider.getCode(address);
  }

  getStorageAt(address, position = 0) {
    return this.provider.getStorageAt(address, position);
  }

  getBlockWithTransactions(id) {
    return this.provider.getBlockWithTransactions(id);
  }

  onChange(cb) {
    return this.provider.on("block", n => cb(n));
  }
}

export default Blocks;
