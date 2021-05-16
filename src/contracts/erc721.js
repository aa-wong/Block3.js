import ERC20 from './erc20';
import ABI from '../ABI';
import Web3 from 'web3';

class ERC721 extends ERC20 {
  tokenURI(address) {
    return this.contract
      .methods
      .tokenURI(address)
      .call();
  }
}

export default ERC721;
