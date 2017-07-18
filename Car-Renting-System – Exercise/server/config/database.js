const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const User = require('../data/User')

require('../data/Car')
require('../data/Rent')
module.exports = (config) => {
    mongoose.connect(config.db)
    let db = mongoose.connection

    db.once('open', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Mongo is ready')
        User.seedAdminUser()
    })
    db.on('error', err => console.log(`Database error:${err}`))
}