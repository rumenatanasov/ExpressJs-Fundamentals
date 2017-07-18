const homeHandler = require('./home')
//const filesHandler = require('./static-files')
const productHandler = require('./product')
const categoryHandler = require('./category')
const userHandler = require('./user-controller')

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
    user: userHandler
    // files: filesHandler
}
