import Provider from './provider';

class Block extends Provider {
  async current() {
    try {
      const id = await this.currentNumber();

      return this.getBlock(id);
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

  currentNumber() {
    return this.provider.getBlockNumber();
  }

  getBlock(id) {
    return this.provider.getBlock(id);
  }

  getBlockWithTransactions(id) {
    return this.provider.getBlockWithTransactions(id);
  }

  onChange(cb) {
    return this.provider.on("block", n => cb(n));
  }
}

export default Block;
