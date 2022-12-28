import Provider from './provider';
import Account from './accounts/account';

class User extends Provider {
  constructor(data) {
    super(data);
    this._callbacks
  }

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
      if (a.length < 1) {
        return this._handleDisconnect();
      }
      return cb(new Account({
        provider: this.provider,
        address: a[0]
      }));
    });

    return this;
  }

  onDisconnect(cb) {
    return this._applyCallback('onDisconnect', cb);
  }

  _handleDisconnect(e) {
    const cb = this._callbacks.onDisconnect;

    if (cb) {
      return cb();
    }
  }
}
export default User;
