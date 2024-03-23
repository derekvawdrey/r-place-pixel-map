const express = require('express');
const router = express.Router();
const { grabMap,drawPixel, initMap } = require('./handler');

router.get('/', grabMap);
router.post('/', drawPixel);
router.get('/init', initMap);

module.exports = router;