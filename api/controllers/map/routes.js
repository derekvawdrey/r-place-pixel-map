const express = require('express');
const router = express.Router();
const { grabMap,drawPixel } = require('./handler');

router.get('/', grabMap);
router.post('/', drawPixel);

module.exports = router;