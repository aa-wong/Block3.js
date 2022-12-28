import { ethers } from 'ethers';
import Base from '../../base';
const {
  BigNumber,
  utils
} = ethers;

class Currency extends Base {
    get network() {
        return this.get('network');
    }

    get name() {
        return this.get('name');
    }

    get symbol() {
        return this.get('symbol');
    }

    get decimals() {
        return this.get('decimals');
    }
}

export default Currency;