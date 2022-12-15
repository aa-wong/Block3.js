require('dotenv').config();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const Block3 = require('../src');

const {
  NFT_ADDRESS,
  ETHERSCAN_API_KEY,
  NETWORK,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS
} = process.env;
const {
  expect,
  assert
} = chai;

chai.use(sinonChai);

let block3;

// Replace with actual tests
describe('Block', () => {
  let currentBlock;
  let blocks;
  let transactions;

  beforeEach(async () => {
    const provider = new Block3.providers.AlchemyProvider(NETWORK, ALCHEMY_KEY);

    block3 = new Block3({ provider });
    try {
      blocks = block3.blocks;
      transactions = block3.transactions;
      currentBlock = await blocks.current();
    } catch (e) {
      assert.fail(e.message);
    }
  });

  it('Get current block', async () => {
    console.log(currentBlock);
  });

  it('Get current blocks 1st transaction', async () => {
    try {
      const tx0 = currentBlock.transactions[0];

      const transaction = await transactions.getTransaction(tx0);
      console.log(transaction);
    } catch (e) {
      assert.fail(e.message);
    }
  });

  it("Get current block's parent block", async () => {
    const { blocks } = block3;

    try {
      const parent = await blocks.getBlock(currentBlock.parentHash);

      console.log(parent);
    } catch (e) {
      assert.fail(e.message);
    }
  });
});
