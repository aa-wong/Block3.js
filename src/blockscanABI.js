import { Http } from './utils';

export default (address, apiKey, network, xhr) => {
  return new Promise(async (resolve, reject) => {
    const http = new Http();
    let chain = 'api';

    if (xhr) http.xhr = xhr;
    if (network && network !== 'mainnet') chain += `-${network}`;
    let host;

    http.host = `https://${chain}.etherscan.io`;

    try {
      const {
        status,
        result
      } = await http.get('/api', {}, {
        module: 'contract',
        action: 'getabi',
        address,
        apiKey
      });

      if (parseInt(status)) {
        const abi = await JSON.parse(result);

        return resolve(abi);
      }
      return reject(new Error(result));
    } catch (e) {
      return reject(e);
    }
  });
};
