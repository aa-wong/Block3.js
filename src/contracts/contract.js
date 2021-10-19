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
    return this.get('methods', {});
  }

  set methods(m) {
    this.set('methods', m, Object);
  }

  get events() {
    return this.get('events', []);
  }

  set events(m) {
    this.set('events', m, Array);
  }

  get miscellaneous() {
    return this.get('miscellaneous', []);
  }

  set miscellaneous(m) {
    this.set('miscellaneous', m, Array);
  }

  execute(m, from, args, value) {
    if (m.payable || m.inputs.length > 0) {
      return this._sendMethod(m.name, from, args, value);
    }
    return this._callMethod(m.name, from, args)
  }

  export() {
    this._['contract'] = undefined;
    this._['methods'] = undefined;
    return super.export();
  }

  _setMethods(m) {
    this.methods = m.reduce((a, c) => {
      a[c.name] = c;
      return a;
    }, {});
  }

  _callMethod(method, from, args) {
    if (args && args.length > 0) {
      return this.contract.methods[method](...args).call({ from });
    }
    return this.contract.methods[method]().call({ from });
  }

  _sendMethod(method, from, args, value) {
    if (args && args.length > 0) {
      return this.contract.methods[method](...args).send({ from, value });
    }
    return this.contract.methods[method]().send({ from, value });
  }
}

export default Contract;
