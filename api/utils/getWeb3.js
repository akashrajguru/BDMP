const Web3 = require('web3');

let web3;

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
web3 = new Web3(provider);

module.exports = web3;
