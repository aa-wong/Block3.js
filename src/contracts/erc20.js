import Base from '../base';
import ABI from '../ABI';
import Web3 from 'web3';

class ERC20 extends Base {
  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  get owner() {
    return this.get('owner');
  }

  set owner(o) {
    this.set('owner', o, String);
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

  burn(tokenId) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .burn(tokenId)
      .send({ from: this.owner });
  }

  mint(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .mint(address)
      .send({ from: this.owner });
  }

  transferFrom(from, to, id) {
    return this.contract
      .methods
      .transferFrom(from, to, id)
      .send({ from: from });
  }

  transferTo(to, id) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.transferFrom(this.owner, to, id);
  }

  transferOwnership(to) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .transferOwnership(to)
      .send({ from: this.owner });
  }

  totalSupply() {
    return this.contract
      .methods
      .totalSupply()
      .call();
  }

  ownerOf(id) {
    return this.contract
      .methods
      .ownerOf(id)
      .call();
  }

  balanceOf(address) {
    return this.contract
      .methods
      .balanceOf(address)
      .call();
  }

  name() {
    return this.contract
      .methods
      .name()
      .call();
  }

  symbol() {
    return this.contract
      .methods
      .symbol()
      .call();
  }

  export() {
    this._['contract'] = undefined;
    return super.export();
  }
}

export default ERC20;
