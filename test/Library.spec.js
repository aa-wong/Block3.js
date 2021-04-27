const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const Folio = require('../src');

const { expect } = chai;

chai.use(sinonChai);

let library;

// Replace with actual tests
describe('Library', () => {
  beforeEach(() => folio = new Folio());

  it('should get the library\'s name', () => {
    console.log(folio);
  });
});
