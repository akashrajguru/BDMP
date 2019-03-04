const httpStatus = require('http-status');
const _ = require('lodash');
const web3 = require("../utils/getWeb3");
const ipfs = require("../utils/ipfs");
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

      const account1 = account.getAccount(id);
      console.log('Account : ', account1);

     
      
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

  //    const storageContract = req.locals.instance;
  //    console.log('req.body.privateKey', req.body.privateKey)
  //    const privateKey = Buffer.from(req.body.privateKey, 'hex');
  //    const data = _.pick(req.body, ["deviceId","deviceName"]);
  //  // add jso data to ipfs
  //   ipfs.files.add(Buffer.from(JSON.stringify(data)), async (error, result) => {
  //       if(error){
  //           console.error(error);
  //           return;
  //         }
  //         console.log('IPFS Hash: ', result[0].hash);
  //       try {
            
  //           // const count;
  //           // web3.eth.getTransactionCount(req.locals.myAddress)
  //           // .then(function(v){
  //           //     console.log("Count :"+v);
  //           //     // count = v;

  //           //     // const rawTransaction = {
  //           //     // "from": req.locals.myAddress,
  //           //     // "gasPrice": web3.utils.toHex(20* 1e9),
  //           //     // "gasLimit": web3.utils.toHex(210000),
  //           //     // "to":contract.abi,
  //           //     // "value":"0x0",
  //           //     // "data":storageContract.methods.set(result[0].hash),
  //           //     // "nonce":web3.utils.toHex(v)
  //           //     // }

  //           //     const tx = new Tx(null, 1);
  //           //     console.log('contract.abi: ',contract.networks['5777'].address);


  //           //     tx.from = req.locals.myAddress;
  //           //     tx.gasPrice = 6621975;
  //           //     tx.gasLimit = 6721975;
  //           //     tx.value = 0;
  //           //     tx.to = contract.networks['5777'].address;
  //           //     tx.data = storageContract.methods.set(result[0].hash).encodeABI();
  //           //     tx.nonce = v

  //           //     // const con = req.locals.instance;
  //           //     // const response = con.methods.set(result[0].hash, {from: req.locals.myAddress, gas: 200000});
  //           //     //console.log('response', response);

  //           //     //console.log('contract.abi: ',contract.networks['5777'].address);
  //           //     //console.log('privateKey', privateKey);
  //           //     tx.sign(privateKey);
  //           //     web3.eth.sendSignedTransaction('0x'+tx.serialize().toString('hex'))
  //           //     .on('transactionHash',console.log);

  //           // })


  //           res.status(httpStatus.OK)
  //           res.json({messsage: "OK"});
  //       } catch (error) {
  //           next(error)
  //       }
  //   });

  res.status(httpStatus.OK)
  res.json({messsage: "OK"});
}