const express = require('express');
const { authenticate,register } = require('./handler');
const router = express.Router();

router.post("/register", register);
router.post("/auth", authenticate);

module.exports = router;