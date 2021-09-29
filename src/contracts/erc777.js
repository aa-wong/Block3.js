import ERC20 from './erc20';
import ABI from '../ABI';
import Web3 from 'web3';

class ERC777 extends ERC20 {
  uri(address) {
    return this.contract
      .methods
      .uri(address)
      .call();
  }
}

export default ERC777;
