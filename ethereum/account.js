import web3 from './web3';
import Account from './build/IotDataSellerAccount.json';


export default (address) =>{
    return new web3.eth.Contract(JSON.parse(Account.interface), address);
};