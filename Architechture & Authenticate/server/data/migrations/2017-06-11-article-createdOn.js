const mongoose = require('mongoose')
const User = require('./User')
db.collection('articles').update({}, { $set: {creator: true} }, {multi: true})