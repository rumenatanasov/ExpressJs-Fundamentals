const Category = require('../data/Category')
const Thread = require('../data/Thread')

module.exports.addGet = (req, res) => {
    res.render('category/add')
}
module.exports.addPost = (req, res) => {
    let category = req.body
    
    Category.create({
        name: category.name
    }).then(() => {
        res.redirect('/')
    })
}