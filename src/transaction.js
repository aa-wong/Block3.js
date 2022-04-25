import { ethers } from 'ethers';
import Provider from './provider';
import User from './user';
const {
  BigNumber,
  utils
} = ethers;


class Transaction extends Provider {
  // getTransactionByHash(txHash) {
  //   return this.web3.eth.getTransaction(txHash);
  // }
  //
  // async getTransactionResponse(tx) {
  //   try {
  //     let result = await this.web3.eth.call(tx, tx.blockNumber);
  //
  //     result = result.startsWith('0x') ? result : `0x${result}`;
  //     if (result && result.substr(138)) {
  //       const reason = this.web3.utils.toAscii(result.substr(138));
  //
  //       return Promise.resolve(reason);
  //     } else {
  //       return Promise.resolve('Transaction message not found - No return value');
  //     }
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // }

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

export default Transaction;
