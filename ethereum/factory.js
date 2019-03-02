import web3 from './web3';
import campaignFactory from './build/IotDataSellerAccountFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface), 
    '0x76a7F9714E6Eea1770c48F3f460B04Af4F8Fddd3'
);

export default instance;