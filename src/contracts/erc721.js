import ERC20 from './erc20';

class ERC721 extends ERC20 {
  tokenURI(id) {
    return this.contract.execute('tokenURI', [id]);
  }
}

export default ERC721;
