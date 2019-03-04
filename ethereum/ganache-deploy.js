/**
 * This deployment script handles the Ethereum smart contract compilation
 * into AIB and bytecode and also does contract deployment on Ganache local UI server.
 */
const Web3 = require('web3');
const compiledFactory = require('./build/IotDataSellerAccountFactory.json');

const web3 = new Web3("ws://localhost:7545");

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attemplting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ 
        data: compiledFactory.bytecode
    })
    .send({ from: accounts[0], gas: '3000000'});

    console.log('Contract deployed to address: ', result.options.address);
};

deploy();