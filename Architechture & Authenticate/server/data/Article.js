const mongoose = require('mongoose')
const paginate = require('mongoose-paginate')

let articleSchema = mongoose.Schema({
    title: {type: mongoose.Schema.Types.String},
    description: {type: mongoose.Schema.Types.String}
    //creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

let Article = mongoose.model('Article', articleSchema)


module.exports = Article
