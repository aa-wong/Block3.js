require('dotenv').config();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const Block3 = require('../src');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const {
  NFT_ADDRESS,
  ETHERSCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS,
  BASIC_NFT_META_DATA,
  UPGRADE_NFT_META_DATA
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;
const { expect } = chai;

chai.use(sinonChai);

let block3;

// Replace with actual tests
describe('Block3', () => {
  beforeEach(() => {
    const provider = new HDWalletProvider(
      MNEMONIC,
      isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY
    );
    block3 = new Block3({
      provider,
      apiKey: ETHERSCAN_API_KEY
    });
  });

  describe('On loadContract', () => {
    it('Should have ABI', async () => {
      try {
        const c = new block3.Contract({
          address: NFT_ADDRESS,
          owner: OWNER_ADDRESS,
          network: NETWORK
        });

        const contract = await block3.loadContract(c);

        assert.isNotNull(contract.abi, 'should load ABI!');
      } catch (e) {
        assert.fail(e.message);
      }
    });
  });
});
