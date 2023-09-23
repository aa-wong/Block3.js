// require('dotenv').config();
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const chai = require('chai');
// const Block3 = require('../src');
//
// const {
//   NFT_ADDRESS,
//   ETHERSCAN_API_KEY,
//   NETWORK,
//   ALCHEMY_KEY,
//   MNEMONIC,
//   OWNER_ADDRESS
// } = process.env;
// const {
//   expect,
//   assert
// } = chai;
//
// chai.use(sinonChai);
//
// let block3;
//
// // Replace with actual tests
// describe('Transactions', () => {
//   let user;
//
//   beforeEach(async () => {
//     const provider = new Block3.providers.AlchemyProvider(NETWORK, ALCHEMY_KEY);
//
//     block3 = new Block3({ provider });
//     try {
//       user = block3.user;
//     } catch (e) {
//       assert.fail(e.message);
//     }
//   });
//
//   it('Get current block', async () => {
//     console.log(currentBlock);
//   });
//
//   it('Get current blocks 1st transaction', async () => {
//     try {
//       const tx0 = currentBlock.transactions[0];
//
//       const transaction = await transactions.getTransaction(tx0);
//       console.log(transaction);
//     } catch (e) {
//       assert.fail(e.message);
//     }
//   });
//
//   it("Get current block's parent block", async () => {
//     const { blocks } = block3;
//
//     try {
//       const parent = await blocks.getBlock(currentBlock.parentHash);
//
//       console.log(parent);
//     } catch (e) {
//       assert.fail(e.message);
//     }
//   });
// });
//
// // describe('On loadContract', () => {
// //   it('Should have ABI', async () => {
// //     try {
// //       const { Contract } = Block3.Contracts;
// //
// //       const c = new Contract({
// //         address: NFT_ADDRESS,
// //         owner: OWNER_ADDRESS,
// //         network: NETWORK
// //       });
// //       const contract = await block3.loadContract(c);
// //
// //       assert.isNotNull(contract.abi, 'should load ABI!');
// //     } catch (e) {
// //       assert.fail(e.message);
// //     }
// //   });
// // });
