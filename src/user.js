import Base from './base';
import Account from './accounts/account';

class User extends Base {
  connect() {
    return this.provider.send("eth_requestAccounts", []);
  }

  get signer() {
    return this.provider.getSigner();
  }

  async account() {
    try {
      const address = await this.signer.getAddress();

      return Promise.resolve(new Account({ block3: this.block3, address }));
    } catch(e) {
      return Promise.reject(e);
    }
  }

  signMessage(message) {
    return this.signer.signMessage(message);
  }

  async accounts() {
    try {
      const accs = await this.provider.listAccounts();

      return Promise.resolve(accs.map(a => new Account({ block3: this.block3, address: a })));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  onAccountChange(cb) {
    this.provider.on('accountsChanged', a => {
      return cb(new Account({
        block3: this.block3,
        address: a[0]
      }));
    });

    return this;
  }

  onConnect(cb) {
    this.provider.on('connect', (info) => {
      return cb(this, info);
    });

    return this;
  }

  onDisconnect(cb) {
    this.provider.on('disconnect', (error) => {
      return cb(error);
    });

    return this;
  }
}
export default User;
