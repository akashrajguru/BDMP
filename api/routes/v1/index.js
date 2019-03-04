const express = require('express');
const deviceRoutes = require('./device.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/devices', deviceRoutes);

module.exports = router;
