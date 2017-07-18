let mongoose = require('mongoose')

let threadSchema = mongoose.Schema({
    title: {type: mongoose.Schema.Types.String},
    description: {type: mongoose.Schema.Types.String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    lastAnswerDate: {type: mongoose.Schema.Types.Date, default: Date.now()},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    likes: {type: mongoose.Schema.Types.Number, default: 0},
    views: {type: mongoose.Schema.Types.Number, default: 0}
})
let Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
