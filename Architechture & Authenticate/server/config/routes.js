const controllers = require('../controllers')
const auth = require('./auth')
const paginate = require('mongoose-paginate')
const Article = require('../data/Article')
module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/about', auth.isInRole('Admin'), controllers.home.about)

    app.get('/users/register', controllers.users.registerGet)
    app.post('/users/register', controllers.users.registerPost)

    app.post('/users/logout', controllers.users.logout)

    app.get('/users/login', controllers.users.loginGet)
    app.post('/users/login', controllers.users.loginPost)

    app.get('/article/add', auth.isAuthenticated, controllers.article.articleGet)
    app.post('/article/add', controllers.article.articlePost)

    app.get('/article/all', auth.isAuthenticated, controllers.article.allGet)
    app.get('/article/details/:id', controllers.article.detailsArticle)

    app.get('/article/edit/:id', controllers.article.editGet)
    app.post('/article/edit/:id', controllers.article.editPost)


    }
 
  
