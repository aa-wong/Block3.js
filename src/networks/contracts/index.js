import BaseCollection from '../../collection';
import Contract from './contract';
import ERC20 from './erc20';
import ERC721 from './erc721';

class Contracts extends BaseCollection {
  constructor(data) {
    super(Contract, data);
  }

  static get Contract() {
    return Contract;
  }

  static get ERC20() {
    return ERC20;
  }

  static get ERC721() {
    return ERC721;
  }

  get network() {
    return this.get('network');
  }

  getById(id) {
    return super.getById(id, 'address');
  }

  create(data) {
    const contract = this.getById(data.address);

    if (contract) {
      return contract;
    }
    return super.create(Object.assign(data, { network: this.network }), 'address');
  }

  createBatch(data) {
    return super.createBatch(data, { network: this.network }, 'address');
  }

  async loadContract(address, index, xhr) {
    if (!this.network) {
      return Promise.reject(new Error('Missing network reference'));
    }
    const { blockscan } = this.network;

    if (!blockscan) {
      return Promise.reject(new Error('Missing blockscan reference in network'));
    }
    
    try {
      const abi = await blockscan.getAbi(address, index, xhr);
      const contract = this.create({
        address,
        network: this.network,
        abi
      });

      return Promise.resolve(contract);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async loadERC20(address, index, xhr) {
    if (!this.network) {
      return Promise.reject(new Error('Missing network reference'));
    }
    const { blockscan } = this.network;

    if (!blockscan) {
      return Promise.reject(new Error('Missing blockscan reference in network'));
    }
    
    try {
      const abi = await blockscan.getAbi(address, index, xhr);
      const contract = this.create({
        address,
        network: this.network,
        abi
      });

      return Promise.resolve(contract);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async loadERC721(address, index, xhr) {
    if (!this.network) {
      return Promise.reject(new Error('Missing network reference'));
    }
    const { blockscan } = this.network;

    if (!blockscan) {
      return Promise.reject(new Error('Missing blockscan reference in network'));
    }
    
    try {
      const abi = await blockscan.getAbi(address, index, xhr);
      const contract = this.create({
        address,
        network: this.network,
        abi
      });

      return Promise.resolve(contract);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Contracts;
