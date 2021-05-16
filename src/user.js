class User {
  /**
   * Constructor Method
   * @param {Object} options options to apply on initialization
   */
  constructor(ethereum) {
    this.ethereum = ethereum;
  }

  /**
   * PROPERTIES
   */
  accounts() {
    return this.ethereum.request({ method: 'eth_requestAccounts' });
  }

  /**
   * [onRequest description]
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  onAccountSwitch(cb) {
    return this.ethereum.on('accountsChanged', cb);
  }
}

export default User;
