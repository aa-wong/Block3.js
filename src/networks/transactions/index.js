import { ethers } from 'ethers';
import Collection from '../../collection';
import Transaction from './transaction';
const {
  BigNumber,
  utils
} = ethers;

class Transactions extends Collection {
  constructor(data) {
    super(Transaction, data);
  }

  get network() {
    return this.get('network');
  }

  getById(id) {
    return super.getById(id, 'hash');
  }

  create(data) {
    return super.create(Object.assign(data, { network: this.network }), 'hash');
  }

  createBatch(data) {
    return super.createBatch(data, { network: this.network }, 'hash');
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

export default Transactions;
