import { Http } from './utils';
import Base from './base';

class BlockscanABI extends Base {
  get apiKey() {
    return this.get('api_key');
  }

  set apiKey(apiKey) {
    this.set('api_key', apiKey, String);
  }

  async loadBlockscanAbi(address, network, xhr) {
    if (!this.apiKey) {
      return Promise.reject(new Error('apiKey must be set in order to retrieve ABI.'));
    }
    const http = new Http();
    let chain = 'api';
    if (xhr) http.xhr = xhr;
    if (network && network.name !== 'homestead') chain += `-${network.name}`;
    http.host = `https://${chain}.etherscan.io`;
    console.log(http.host);

    try {
      const {
        status,
        result
      } = await http.get('/api', {}, {
        module: 'contract',
        action: 'getabi',
        address,
        apiKey: this.apiKey
      });

      if (parseInt(status)) {
        const abi = await JSON.parse(result);

        return Promise.resolve(abi);
      }
      return Promise.reject(new Error(result));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default BlockscanABI;
