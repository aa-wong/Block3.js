const ERC20 = require('./erc20');

class ERC721 extends ERC20 {
  tokenURI(signer, id) {
    return this.contract.execute(signer, 'tokenURI', [id]);
  }
}

module.exports = ERC721;
