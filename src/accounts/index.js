const ProviderCollection = require('../provider-collection');
const Account = require('./account');

class Accounts extends ProviderCollection {
  constructor(data) {
    super(Account, data);
  }

  create(data) {
    return super.create(data, 'address');
  }

  createBatch(data, append) {
    return super.createBatch(data, append, 'address');
  }

  isAddress(address) {
    return ethers.utils.isAddress(address);
  }

  async getAccount(address) {
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
}

module.exports = Accounts;
