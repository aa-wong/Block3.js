const {
  NFTStorage,
  Blob
} = require('nft.storage');

class IPFSStorageManager {
  constructor(apiKey) {
    if (apiKey) {
      this.client = new NFTStorage({ token: apiKey });
    } else throw new Error('NFTStorage apiKey must be provided');
  }

  upload(file) {
    return this.client.storeDirectory([file]);
  }

  storeDataBlob(metadata) {
    const content = new Blob([metadata]);
    return client.storeBlob(content);
  }

  createNFTMetaDataTemplate(description, externalUrl, name, image, attributes) {
    return JSON.stringify({
      description,
      external_url: externalUrl,
      image,
      name,
      attributes
    });
  }

  uploadAndGenerateMetaData(file, description, name, attributes, externalUrl, cb) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileCid = await this.upload(file);
        if (cb) cb(0.5);
        const meta = createNFTMetaDataTemplate(
          description,
          externalUrl,
          name,
          `https://ipfs.io/ipfs/${fileCid}/${file.name}`,
          attributes);
        const metaCid = await this.storeDataBlob(meta);
        if (cb) cb(1);
        return resolve(`https://ipfs.io/ipfs/${metaCid}`);
      } catch (e) {
        return reject(e);
      }
    });
  }
}

export default IPFSStorageManager;
