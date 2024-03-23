const express = require('express');
const { authenticate,register, getUser, logout } = require('./handler');
const router = express.Router();

router.post("/register", register);
router.post("/auth", authenticate);
router.post("/logout", logout);
router.get("/user", getUser);


module.exports = router;