'use strict';

const { Router } = require('express');
const controller = require('./user.controller')
const auth = require('../../auth/auth.service')
const queries = require("../../lib/queries")

var router = new Router();

// utilizar graphQL en estasa rutas en vez del user controller
// router.get('/', auth.hasRole('admin'), queries.index);
//router.get('/', queries.getUsers);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;