import Provider from './provider';
import Account from './account';

class User extends Provider {
  get signer() {
    return this.provider.getSigner();
  }

  async account() {
    try {
      const address = await this.signer.getAddress();

      return Promise.resolve(new Account({ ...this.export, address }));
    } catch(e) {
      return Promise.reject(e);
    }
  }

  accounts() {
    return this.provider.listAccounts().map(a => new Account({ ...this.export, a }));
  }

  onAccountChange(cb) {
    return this.provider.on('accountsChanged', a => cb(new Account({ ...this.export, a })));
  }
}

export default User;
