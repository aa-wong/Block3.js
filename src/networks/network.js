const Base = require('../base');

class Network extends Base {
  get chainId() {
    return this.get('chainId');
  }

  get ensAddress() {
    return this.get('ensAddress');
  }

  get name() {
    return this.get('name');
  }
}

module.exports = Network;
