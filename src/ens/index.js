import Provider from '../provider';
import Contract from '../contracts/contract';
import ENSResolver from './resolver';

class ENS extends Provider {
  async getAddressByName(name, abi) {
    try {
      const address = await this.provider.resolveName(name);
      let account;

      if (address) {
        if (abi) {
          account = new Contract({
            ...this.export,
            address,
            abi
          });
        }
        account = new Account({ ...this.export, address });
      }
      return Promise.resolve(account);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getNameByAddress(address) {
    return this.provider.lookupAddress(address);
  }

  async getResolver(name) {
    try {
      const r = await this.provider.getResolver(name);
      let resolver;

      if (r) resolver = new ENSResolver({ ...this.export, r });
      return Promise.resolve(resolver);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default ENS;
