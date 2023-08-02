const assert = require('assert');
const mocha = require('mocha');
const ganache = require('ganache');
const {
    Web3
} = require('web3');
const polygon = new Web3(ganache.provider());
const compiled = require('./compile.js');

let accounts;
let contract;

beforeEach(async () => {
    accounts = await polygon.eth.getAccounts();
    contract = await new polygon.eth.Contract(compiled.contracts.stuff.inbox.abi)
        .deploy({
            data: compiled.contracts.stuff.inbox.evm.bytecode.object,
            arguments: ['A thing of beauty is a joy forever:']
        })
        .send({
            from: accounts[0],
            gas: "1000000"
        });
});

describe('inbox', () => {
    it('gets compiled', () => {
        assert.ok(compiled.contracts.stuff.inbox.evm.bytecode.object);
        assert.ok(compiled.contracts.stuff.inbox.abi);
    });
    it('gets an address', () => {
        assert.ok(contract._address);
    });
    it('has a message', async () => {
        const message = await contract.methods.message().call();
        assert.equal(message, 'A thing of beauty is a joy forever:');
    });
    it('can change the message', async () => {
        let receipt = await contract.methods.set_message('Its loveliness increases;').send({
            from: accounts[0]
        });
        assert.ok(receipt.transactionHash);
        const message = await contract.methods.message().call();
        assert.equal(message, 'Its loveliness increases;');
    });
});
