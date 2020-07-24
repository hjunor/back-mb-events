const routes = require('express').Router()
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)

const auth = require('./middleware/authMiddleware')

const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const TypeController = require('./controllers/TypeController')
const CategoryController = require('./controllers/CategoryController')
const EventController = require('./controllers/EventController')


routes.post('/user', UserController.create);
routes.get('/user', auth, UserController.store);
routes.post('/auth', AuthController.authenticate)

routes.post('/types', auth, TypeController.store)
routes.post('/category', auth, CategoryController.store)

routes.post('/event', upload.single('file'), EventController.store)
routes.get('/event', upload.single('file'), EventController.index)
module.exports = routes