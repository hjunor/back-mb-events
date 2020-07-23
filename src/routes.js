const routes = require('express').Router();

routes.get('/', (request, response) => {
  response.json({ status: true })
})

module.exports = routes