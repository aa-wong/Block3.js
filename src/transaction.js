class TransactionManager {
  constructor(web3) {
    this.web3 = web3;
  }

  getTransactionByHash(txHash) {
    return this.web3.eth.getTransaction(txHash);
  }

  async getTransactionResponse(tx) {
    try {
      let result = await this.web3.eth.call(tx, tx.blockNumber);

      result = result.startsWith('0x') ? result : `0x${result}`;
      if (result && result.substr(138)) {
        const reason = this.web3.utils.toAscii(result.substr(138));

        return Promise.resolve(reason);
      } else {
        return Promise.resolve('Transaction message not found - No return value');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}


export default TransactionManager;
