import Base from '../base';
import ABI from '../ABI';
import Web3 from 'web3';

class Contract extends Base {
  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  get network() {
    return this.get('network');
  }

  set network(n) {
    this.set('network', n, String);
  }

  get abi() {
    return this.get('abi');
  }

  set abi(abi) {
    this.set('abi', abi, Array);
  }

  get contract() {
    return this.get('contract');
  }

  set contract(c) {
    this.set('contract', c);
  }

  get methods() {
    return this.contract.methods;
  }

  export() {
    this._['contract'] = undefined;
    return super.export();
  }
}

export default Contract;
