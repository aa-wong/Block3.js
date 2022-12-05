import Provider from '../provider';
import Network from './network';

class Networks extends Provider {
  async current() {
    try {
      const n = await this.provider.getNetwork();

      return Promise.resolve(new Network(n));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  feeData() {
    return this.provider.getFeeData();
  }

  gasPrice() {
    return this.provider.getGasPrice();
  }

  async maxGasFee() {
    try {
      const data = await this.feeData();

      return Promise.resolve(data.maxFeePerGas);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async maxPriorityGasFee() {
    try {
      const data = await this.feeData();

      return Promise.resolve(data.maxPriorityFeePerGas);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  gasPrice() {
    return this.provider.getGasPrice();
  }

  ready() {
    return this.provider.ready();
  }

  onChange(cb) {
    return this.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        return cb(new Network(newNetwork), new Network(oldNetwork));
      }
    });
  }
}

export default Networks;
