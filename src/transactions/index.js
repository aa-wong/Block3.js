const { ethers } = require('ethers');
const ProviderCollection = require('../provider-collection');
const Transaction = require('./transaction');
const {
  BigNumber,
  utils
} = ethers;

class Transactions extends ProviderCollection {
  constructor(data) {
    super(Transaction, data);
  }

  create(data) {
    return super.create(data, 'hash');
  }

  createBatch(data, append) {
    return super.createBatch(data, append, 'hash');
  }

  async getTransaction(tx) {
    try {
      const transaction = this.getByIndexValue('hash', tx);

      if (transaction !== undefined) {
        return Promise.resolve(transaction);
      }
      const txData = await this.provider.getTransaction(tx);

      return Promise.resolve(this.create(txData));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  toBigNumber(amount) {
    return BigNumber.from(amount);
  }

  formatEther(amount) {
    return utils.formatEther(amount);
  }

  parseEther(amount) {
    return utils.parseEther(amount);
  }

  parseUnits(amount, units) {
    return utils.parseUnits(amount, units);
  }

  sendTransaction(from, to, value) {
    const params = [{
      from,
      to,
      value: utils.parseUnits(value, 'ether').toHexString()
    }];

    return this.provider.send('eth_sendTransaction', params);
  }
}

module.exports = Transactions;
