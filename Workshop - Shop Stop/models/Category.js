const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
  name: {type: mongoose.Schema.Types.String, require: true, unique: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}]
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
