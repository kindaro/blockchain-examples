const path = require('path');
const fs = require('fs');
const solc = require('solc');

const name_of_contract_file = path.resolve(__dirname, 'contracts', "inbox.sol");
const contents_of_contract_file = fs.readFileSync(name_of_contract_file, 'utf8');
const input_to_solc = {
    language: 'Solidity',
    sources: {
        stuff: {
            content: contents_of_contract_file
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};
module.exports = JSON.parse(solc.compile(JSON.stringify(input_to_solc)));
