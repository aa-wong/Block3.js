const Contract = require('./contract');
const ERC20 = require('./erc20');
const ERC721 = require('./erc721');

class Contracts {
  static get Contract() {
    return Contract;
  }

  static get ERC20() {
    return ERC20;
  }

  static get ERC721() {
    return ERC721;
  }
}

module.exports = Contracts;
