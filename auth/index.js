'use strict';

const express = require('express');
//const { config } = require('../config')
const User = require('../api/users/user.schema')


// Passport Configuration
require('./local/passport').setup(User);
//require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').router);
//router.use('/facebook', require('./facebook').default);

module.exports = { router }