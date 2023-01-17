import BaseCollection from '../../collection';
import Block from './block';

class Blocks extends BaseCollection {
  constructor(data) {
    super(Block, data);
  }

  async current() {
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

  getById(id) {
    return super.getById(id, 'hash');
  }

  create(data) {
    const block = this.getById(data.hash);

    if (block) {
      return block;
    }
    return super.create(Object.assign(data, { network: this.network }), 'hash');
  }

  createBatch(data) {
    return super.createBatch(data, { network: this.network }, 'hash');
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
    this.provider.on("block", n => cb(n));
    return this;
  }
}

export default Blocks;
