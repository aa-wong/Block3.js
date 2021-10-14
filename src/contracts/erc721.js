import ERC20 from './erc20';

class ERC721 extends ERC20 {
  tokenURI(address) {
    return this.contract
      .methods
      .tokenURI(address)
      .call();
  }
}

export default ERC721;
