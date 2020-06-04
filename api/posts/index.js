'use strict';

const { Router } = require('express');
const controller = require('./post.controller')

var router = new Router();

router.get('/', controller.index);

module.exports = router;