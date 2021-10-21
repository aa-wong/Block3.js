import ENS, { getEnsAddress } from '@ensdomains/ensjs';

class ENSManager {
  constructor(web3, provider) {
    this.web3 = web3;
    this.ens = new ENS({
      provider,
      ensAddress: getEnsAddress('1')
    });
  }

  getName(name) {
    return this.ens.name(name)
  }

  // Get Address
  getAddressByName(name) {
    return this.getName(name).getAddress();
  }

  getContentByName(name) {
    return this.getName(name).getContent();
  }

  setContentByName(name) {
    return this.getName(name).setContenthash(contentHash);
  }

  getCoinAddressByName(name, coin) {
    return this.getName(name).getAddress(coin);
  }

  setCoinAddressByName(name, coin, address) {
    return this.getName(name).setAddress(coin, address);
  }

  getTextByName(name, url) {
    return this.getName(name).getText(url);
  }

  setTextByNameA(name, type, text) {
    return this.getName(name).setText(type, text);
  }

  getNameByAddress(address) {
    return this.ens.getName(address);
  }
}

export default ENSManager;
