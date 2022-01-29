import Contract from './contract';

class ERC20 extends Contract {
  name() {
    return this.contract.execute('name');
  }

  symbol() {
    return this.contract.execute('symbol');
  }

  burn(tokenId) {
    return this.contract.execute('burn', [tokenId]);
  }

  mint(address) {
    return this.contract.execute('mint', [address]);
  }

  transferFrom(from, to, id) {
    return this.contract.execute('transferFrom', [from, to, id]);
  }

  transferTo(to, id) {
    return this.contract.execute('transferTo', [to, id]);
  }

  transferOwnership(to) {
    return this.contract.execute('transferOwnership', [to]);
  }

  totalSupply() {
    return this.contract.execute('totalSupply');
  }

  ownerOf(id) {
    return this.contract.execute('ownerOf', [id]);
  }

  balanceOf(address) {
    return this.contract.execute('balanceOf', [address]);
  }
}

export default ERC20;
