'use strict';
const router = require('express').Router();
const UserController = require('../controllers/userC');

router.post('/', UserController.register)

module.exports = router