const express = require('express');
// const validate = require('express-validation');
const controller = require('../../controller/device.controller');
const router = express.Router();


router.param('accountId', controller.load);

router
 .route('/:accountId')
 .post(controller.storeData);


module.exports = router;