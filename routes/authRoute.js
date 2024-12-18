const express = require('express');
const { register, login } = require('../controllers/user');
const router= express.Router();



//user registeration and login
router.post('/register',register);

router.post('/login',login);

module.exports = router;