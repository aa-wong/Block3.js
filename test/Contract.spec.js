require('dotenv').config();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const { XMLHttpRequest } = require('xmlhttprequest');
const Block3 = require('../src');

const {
  ADDRESS,
  BLOCKSCAN_API_KEY,
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
describe('Contract', () => {
  let Contracts;
  let blockscan;
  let abi;
  let contract;
  let network;

  beforeEach(async () => {
    const provider = new Block3.providers.AlchemyProvider(NETWORK, ALCHEMY_KEY);

    block3 = new Block3({ provider });

    try {
      network = await block3.networks.current()
      Contracts = Block3.Contracts;

      blockscan = new Block3.BlockscanABI({ api_key: BLOCKSCAN_API_KEY });
      const xhr = new XMLHttpRequest();

      console.log(xhr);
      abi = await blockscan.loadBlockscanAbi(ADDRESS, network, xhr);
      console.log(abi);
      contract = new Contracts.Contract({
        network,
        abi
      });
    } catch (e) {
      assert.fail(e.message);
    }
  });

  it('Get current network', async () => {
    console.log(network);
  });

  it('Get contract data', async () => {
    console.log(contract);
  });
  //
  // it('Get current blocks 1st transaction', async () => {
  //   try {
  //     const tx0 = currentBlock.transactions[0];
  //
  //     const transaction = await transactions.getTransaction(tx0);
  //     console.log(transaction);
  //   } catch (e) {
  //     assert.fail(e.message);
  //   }
  // });
  //
  // it("Get current block's parent block", async () => {
  //   const { blocks } = block3;
  //
  //   try {
  //     const parent = await blocks.getBlock(currentBlock.parentHash);
  //
  //     console.log(parent);
  //   } catch (e) {
  //     assert.fail(e.message);
  //   }
  // });
});
