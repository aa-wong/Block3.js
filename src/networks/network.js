import Base from '../base';
import Currency from './currency/currency';
import Blocks from './blocks';
import Transactions from './transactions';
import Blockscan from './blockscan';
import Contracts from './contracts';

class Network extends Base {
  get chainId() {
    return this.get('chainId');
  }

  get ensAddress() {
    return this.get('ensAddress');
  }

  get name() {
    return this.get('name');
  }

  get rpcUrls() {
    return this.get('rpcUrls', []);
  }

  set rpcUrls(urls) {
    this.set('rpcUrls', urls, Array);
  }

  get nativeCurrency() {
    return this.get('nativeCurrency');
  }

  set nativeCurrency(c) {
    this.set('nativeCurrency', c, Currency);
  }

  get blockExplorerUrls() {
    return this.get('blockExplorerUrls', []);
  }

  set blockExplorerUrls(urls) {
    this.set('blockExplorerUrls', urls, Array);
  }

  get blockscan() {
    return new Blockscan({ network: this });
  }

  get blocks() {
    return new Blocks({ network: this });
  }

  get transactions() {
    return new Transactions({ network: this });
  }

  get contracts() {
    return new Contracts({ network: this })
  }
}

export default Network;
