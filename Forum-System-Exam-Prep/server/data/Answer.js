const mongoose = require('mongoose')

let answerSchema = mongoose.Schema({
    thread: {type: mongoose.Schema.Types.ObjectId, ref: 'Thread'},
    content: {type: mongoose.Schema.Types.String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()}
})
let Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer