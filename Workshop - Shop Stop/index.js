const port = 2145
const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')
let app = express()
let enviroment = process.env.NODE_ENV || 'development'

database(config[enviroment])
require('./config/express')(app, config[enviroment])
require('./config/routes')(app)
require('./config/passport')()
app.listen(port, () => {
  console.log(`Server runnung. Listening on port ${port}`)
})
