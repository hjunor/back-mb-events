require('dotenv').config()
require('./services/database')
const express = require('express')
const routes = require('./routes')
const app = express()
const path = require('path')


app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.listen(3333, (error) => {
  try {
    console.log('sever starter')
  } catch (error) {
    console.error('erro', error)
  }
})