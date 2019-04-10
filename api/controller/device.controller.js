const httpStatus = require('http-status');
const _ = require('lodash');
const web3 = require("../utils/getWeb3");
const ipfs = require("../utils/ipfs");
const Tx = require('ethereumjs-tx');
// const Tx = require('ethereumjs-tx');
const { handler: errorHandler } = require('../middlewares/error');
const account = require('../utils/account');


/**
 * Load device refrence
 * @public
 */
exports.load = async(req, res, next, id) => {
    try {
    
      if(!id){
        throw new APIError({
            message: "Account Id not provided",
            status: httpStatus.UNAUTHORIZED
          });
      }

      const address = id;
      const contract = account.getAccount(address);
      req.locals = { contract, address };
      // console.log('Account : ', account1);

      return next();
    } catch (error) {
      
      // return errorHandler(error, req, res);
      console.log('error', error);
      return error;
    }
  };

/**
 * Stores data in ethereum network
 * @public
 */
exports.storeData = async (req, res, next) => {

     const storageContract = req.locals.contract;
     const contractOwnerAddress = req.locals.address;
     const contractAddress = req.body.contractAddress;
     console.log('req.body.privateKey', req.body.privateKey)
     const privateKey = Buffer.from(req.body.privateKey, 'hex');
     const data = _.pick(req.body, ["deviceId", "deviceName", "description", "timestamp", "data"]);
   // add jso data to ipfs
    ipfs.files.add(Buffer.from(JSON.stringify(data)), async (error, result) => {
        if(error){
            console.error(error);
            return;
          }
          console.log('IPFS Hash: ', result[0].hash);
          console.log("Address is :", contractOwnerAddress);
          console.log("Device id  :", data.deviceId);
          console.log("Device id  :", data.description);
          console.log("timestamp  :", data.timestamp);
          console.log("contract address: ", contractAddress);
        try {
          web3.eth.getTransactionCount(contractOwnerAddress)
          .then(function(count){
            console.log('Count :', count);
            const tx = new Tx(null, 1);
            tx.from = contractOwnerAddress;
            tx.gasPrice = 6621975;
            tx.gasLimit = 6721975;
            tx.value = 0;
            tx.to = contractAddress;
            tx.data = storageContract.methods.storeDataRequest(contractOwnerAddress, data.deviceId, data.deviceName, data.description ,data.timestamp, result[0].hash).encodeABI();
            tx.nonce = count

            tx.sign(privateKey);

            // await storageContract.methods
            // .storeDataRequest(contractOwnerAddress, data.deviceId, data.timestamp, result[0].hash)
            // .send({from: contractOwnerAddress});
            web3.eth.sendSignedTransaction('0x'+tx.serialize().toString('hex')).on('transactionHash',console.log);

            // const rawTransaction = {
            //   "from": contractOwnerAddress,     
            //   "gas": "2000",
            //   "data": storageContract.methods.storeDataRequest(contractOwnerAddress, data.deviceId, data.timestamp, result[0].hash).encodeABI()
            // };

            // web3.eth.accounts.signTransaction(rawTransaction, privateKey)
            // .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction)).then(receipt => console.log("Transaction receipt: ", receipt))
            // .catch(err => console.error(err));


            })
          .catch((error)=>{
            console('Error  is :', error);
          });
          


            res.status(httpStatus.OK)
            res.json({messsage: "OK"});
        } catch (error) {
            next(error)
        }
    });
}