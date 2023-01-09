import BaseCollection from '../collection';
import Network from './network';

class Networks extends BaseCollection {
  constructor(data) {
    super(Network, data);
  }

  getById(id) {
    return super.getById(id, 'chainId');
  }

  create(data) {
    const network = this.getById(data.chainId);

    if (network) {
      return network;
    }
    return super.create(Object.assign(data, { block3: this.block3 }), 'chainId');
  }

  createBatch(data) {
    return super.createBatch(data, { block3: this.block3 }, 'chainId');
  }

  async current() {
    try {
      const n = await this.provider.getNetwork();

      return Promise.resolve(this.create(n));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async switchNetwork(network) {
    if (isCollectionItemType(item)) {
      try {
        const n = await this.provider.send("wallet_addEthereumChain", [ network.export() ]);
        
        return Promise.resolve(this.create(n));
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(new Error('Invalid type, must be Network object'));
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
    this.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        return cb(this.create(newNetwork), this.create(oldNetwork));
      }
    });

    return this;
  }
}

export default Networks;
