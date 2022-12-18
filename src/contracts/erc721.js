import ERC20 from './erc20';

class ERC721 extends ERC20 {
  tokenURI(signer, id) {
    return this.contract.execute(signer, 'tokenURI', [id]);
  }
}

export default ERC721;
