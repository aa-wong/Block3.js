import { Http } from '../utils';
import Base from '../base';
import Network from './network';

class Blockscan extends Base {
  get network() {
    return this.get('network');
  }

  async getAbi(address, index = 0, xhr) {
    if (!this.network) {
      return Promise.reject(new Error('Missing network reference'));
    }

    const { block3 } = this.network;

    if (!block3) {
      return Promise.reject(new Error('Missing block3 reference in network'));
    }

    if (!block3.blockscanApiKey) {
      return Promise.reject(new Error('blockscanApiKey must be set in order to retrieve ABI.'));
    }

    if (this.network.blockExplorerUrls.length < 1) {
      return Promise.reject(new Error('network blockExplorerUrls is empty'));
    }
    const http = new Http();

    if (xhr) http.xhr = xhr;
    http.host = this.network.blockExplorerUrls[index];

    try {
      const {
        status,
        result
      } = await http.get('/api', {}, {
        module: 'contract',
        action: 'getabi',
        address,
        apiKey: block3.blockscanApiKey
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

export default Blockscan;
