import Contract from './contract';

class ERC20 extends Contract {
  name(signer) {
    return this.contract.execute(signer, 'name');
  }

  symbol(signer) {
    return this.contract.execute(signer, 'symbol');
  }

  burn(signer, tokenId, params = {}) {
    return this.contract.execute(signer, 'burn', [tokenId], params);
  }

  mint(signer, address, params = {}) {
    return this.contract.execute(signer, 'mint', [address], params);
  }

  transferFrom(signer, from, to, id) {
    return this.contract.execute(signer, 'transferFrom', [from, to, id]);
  }

  transferTo(signer, to, id) {
    return this.contract.execute(signer, 'transferTo', [to, id]);
  }

  transferOwnership(signer, to) {
    return this.contract.execute(signer, 'transferOwnership', [to]);
  }

  totalSupply(signer) {
    return this.contract.execute(signer, 'totalSupply');
  }

  ownerOf(signer, id) {
    return this.contract.execute(signer, 'ownerOf', [id]);
  }

  balanceOf(signer, address) {
    return this.contract.execute(signer, 'balanceOf', [address]);
  }
}

export default ERC20;
