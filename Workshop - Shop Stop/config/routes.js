const controller = require('../controllers')
const multer = require('multer')
let upload = multer({dest: './content/images'})
const auth = require('./auth')

module.exports = (app) => {
    app.get('/', controller.home.index)

    app.get('/product/add', auth.isAuthenticated, controller.product.addGet)
    app.post('/product/add', upload.single('image'), controller.product.addPost)

    app.get('/category/add', auth.isInrole('Admin'), controller.category.addGet)
    app.post('/category/add', auth.isInrole('Admin'), controller.category.addPost)

    app.get('/category/:category/products', auth.isAuthenticated, controller.category.productByCategory)

    app.get('/product/edit/:id', auth.isAuthenticated, controller.product.editGet)
    app.post('/product/edit/:id', auth.isAuthenticated, upload.single('image'), controller.product.editPost)

    app.get('/product/delete/:id', auth.isAuthenticated, controller.product.deleteGet)
    app.post('/product/delete/:id', auth.isAuthenticated, controller.product.deletePost)

    app.get('/product/buy/:id', auth.isAuthenticated, controller.product.buyGet)
    app.post('/product/buy/:id', auth.isAuthenticated, controller.product.buyPost)

    app.get('/user/register', controller.user.registerGet)
    app.post('/user/register', controller.user.registerPost)

    app.get('/user/login', controller.user.loginGet)
    app.post('/user/login', controller.user.loginPost)

    app.post('/user/logout', controller.user.logout)
}