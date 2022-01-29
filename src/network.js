import Provider from './provider';

class Network extends Provider {
  current() {
    return this.provider.getNetwork();
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
      if (oldNetwork && window) window.location.reload();
      return cb(newNetwork);
    });
  }
}

export default Network;
