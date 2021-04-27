
const { NFTStorage, Blob } = require('nft.storage');
const IPFS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTQyOTYxNzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjgwMzE1NjQ4MCwibmFtZSI6ImRlZmF1bHQifQ.JgqVsl3CfCtctrihSN7U2LClQ6AejnY0BeulY7v5R2g';
const client = new NFTStorage({ token: IPFS_API_KEY });

const IPFS = (file, description, name, attributes, cb) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileCid = await client.storeDirectory([file]);

      const metadata = JSON.stringify({
        description,
        external_url: "https://nifty-bot-marketplace.web.app/",
        image: `https://ipfs.io/ipfs/${fileCid}/${file.name}`,
        name,
        attributes
      });
      cb(0.5);
      const content = new Blob([metadata]);
      const cid = await client.storeBlob(content);

      resolve(`https://ipfs.io/ipfs/${cid}`);
      return cb(1);
    } catch (e) {
      return reject(e);
    }
  });
}

export default IPFS;
