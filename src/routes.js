const routes = require('express').Router();
//const auth = require('./middleware');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController')


routes.post('/user', UserController.create);
routes.get('/user', UserController.store);
routes.post('/auth', AuthController.authenticate)

module.exports = routes