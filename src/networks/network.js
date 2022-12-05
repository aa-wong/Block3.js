import Base from '../base';

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

export default Network;
