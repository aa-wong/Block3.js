import Provider from './provider';
import Account from './account';

class User extends Provider {
  constructor(data) {
    super(data);
    this._callbacks
  }
  get signer() {
    return this.provider.getSigner();
  }

  async account() {
    try {
      const address = await this.signer.getAddress();

      return Promise.resolve(new Account({ provider: this.provider, address }));
    } catch(e) {
      return Promise.reject(e);
    }
  }

  accounts() {
    return this.provider.provider.listAccounts().map(a => {
      return new Account({ ...this.export, address: a });
    });
  }

  onAccountChange(cb) {
    this.provider.provider.on('accountsChanged', a => {
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
