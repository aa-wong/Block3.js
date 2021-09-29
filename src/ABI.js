import { Http } from './utils';

export default (address, apiKey, url, xhr) => {
  return new Promise(async (resolve, reject) => {
    const http = new Http();
    let chain = 'api';

    if (xhr) http.xhr = xhr;
    if (!url) {
      return reject(new Error('ABI validator URL is required.'));
    }
    http.host = url;

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
