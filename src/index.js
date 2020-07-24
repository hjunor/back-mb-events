require('dotenv').config()
require('./services/database')
const express = require('express')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, (error) => {
  try {
    console.log('sever starter')
  } catch (error) {
    console.error('erro', error)
  }
})