const express = require('express');
const router = express.Router();
const { grabMap } = require('./handler');

router.get('/', grabMap);

module.exports = router;