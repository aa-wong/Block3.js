import { Http } from './utils';

export default (address, apiKey, network, xhr) => {
  return new Promise(async (resolve, reject) => {
    const http = new Http();
    let chain = 'api';

    if (xhr) http.xhr = xhr;
    if (network || network !== 'mainnet') chain += `-${network}`;
    http.host = `https://${chain}.etherscan.io`;

    try {
      const res = await http.get('/api', {}, {
        module: 'contract',
        action: 'getabi',
        address,
        apiKey
      });

      const abi = await JSON.parse(res.result);
      return resolve(abi);
    } catch (e) {
      return reject(e);
    }
  });
};
