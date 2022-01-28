import Base from '../base';
import Web3 from 'web3';

class Contract extends Base {
  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  get user() {
    return this.get('user');
  }

  set user(u) {
    this.set('user', u, String);
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

  async execute(method, from, args, value) {
    if (!method || !from) {
      return Promise.reject(new Error('method and from parameters are required.'));
    }

    const {
      constant,
      inputs,
      name,
      payable,
    } = method;

    if (inputs.length > 0 && args.length !== inputs.length) {
      return Promise.reject(new Error('Invalid number of arguments provided.'));
    }

    if (constant) {
      return this._callMethod(name, from, args);
    }
    const valIndex = inputs.indexOf('value');

    if (valIndex > -1) {
      value = args[valIndex];
      args.splice(valIndex, 1);
    }

    if (payable && !value) {
      return Promise.reject(new Error('Payable methods requires value parameter to be provided.'));
    }

    return this._sendMethod(name, from, args, value);
  }

  export() {
    this._['contract'] = undefined;
    this._['methods'] = undefined;
    return super.export();
  }

  _setMethods(m) {
    this.methods = m.reduce((a, c) => {
      if (c.payable) {
        c.inputs.push({
          internalType: "value",
          name: "value",
          type: "uint256"
        });
      }
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
