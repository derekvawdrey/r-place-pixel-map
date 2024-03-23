const express = require('express');
const { authenticate,register, getUser, logout } = require('./handler');
const router = express.Router();

router.post("/register", register);
router.post("/auth", authenticate);
router.get("/user", getUser);
router.get("/logout", logout);

module.exports = router;