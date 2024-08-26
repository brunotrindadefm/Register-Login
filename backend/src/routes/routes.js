const express = require('express');
const routes = express.Router();
const authController = require('../controller/authController')

routes.post('/register', authController.registerUser);
routes.get('/register/:email', authController.getUser);
routes.post('/login', authController.userLogin);

module.exports = routes;