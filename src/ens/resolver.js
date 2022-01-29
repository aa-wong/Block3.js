import Provider from '../provider';
import Account from '../account';

class ENSResolver extends Provider {
  get provider() {
    return this.get('resolver');
  }

  name() {
    return this.resolver.name();
  }

  async address() {
    try {
      const address = await this.resolver.address();
      let account;

      if (address) account = new Account({ ...this.export, address });
      return Promise.resolve(account);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  contentHash() {
    return this.resolver.getContentHash();
  }

  email() {
    return this.resolver.getText('email');
  }

  url() {
    return this.resolver.getText('url');
  }

  avatar() {
    return this.resolver.getText('avatar');
  }

  description() {
    return this.resolver.getText('description');
  }

  notice() {
    return this.resolver.getText('notice');
  }

  keywords() {
    return this.resolver.getText('keywords');
  }

  keywords() {
    return this.resolver.getText('keywords');
  }

  discord() {
    return this.resolver.getText('com.discord');
  }

  github() {
    return this.resolver.getText('com.github');
  }

  reddit() {
    return this.resolver.getText('com.reddit');
  }

  twitter() {
    return this.resolver.getText('com.twitter');
  }

  telegram() {
    return this.resolver.getText('com.telegram');
  }

  ensDelegate() {
    return this.resolver.getText('eth.ens.delegate');
  }
}

export default ENS;
