import Contract from './contract';

class ERC20 extends Contract {
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
}

export default ERC20;
