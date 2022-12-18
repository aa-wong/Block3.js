import Contract from './contract';
import ERC20 from './erc20';
import ERC721 from './erc721';

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

export default Contracts;
