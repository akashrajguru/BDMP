const web3 =  require('./getWeb3');
const Account = require('../../ethereum/build/IotDataSellerAccount.json');


exports.getAccount = (address) =>{
    return new web3.eth.Contract(JSON.parse(Account.interface), address);
}