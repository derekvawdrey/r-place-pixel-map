const express = require('express');
const { authenticate,register, getUser } = require('./handler');
const router = express.Router();

router.post("/register", register);
router.post("/auth", authenticate);
router.get("/user", getUser);

module.exports = router;