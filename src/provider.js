// const ethers = require('ethers');
//
// const getProviderByRpc = (network) => {
//   return new ethers.providers.JsonRpcProvider(network.rpc_url);
// }
//
// module.exports = {
//   getProviderByRpc: getProviderByRpc
// };

import Base from './base';

class Provider extends Base {
  get provider() {
    return this.get('provider');
  }
}

export default Provider;
