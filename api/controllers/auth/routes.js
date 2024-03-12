const express = require('express');
const { authenticate } = require('./handler');
const router = express.Router();


router.post("/authenticate", authenticate);

module.exports = router;