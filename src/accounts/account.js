const Provider = require('../provider');

class Account extends Provider {
  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  getEnsName() {
    return this.provider.lookupAddress(this.address);
  }

  balance() {
    return this.provider.getBalance(this.address);
  }

  code() {
    return this.provider.getCode(this.address);
  }

  storage() {
    return this.provider.getStorageAt(this.address, 0);
  }

  transactionCount() {
    return this.provider.getTransactionCount(this.address);
  }
}

export default Account;
