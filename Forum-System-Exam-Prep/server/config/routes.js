const controllers = require('../controllers')
const auth = require('./auth')
module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/about', auth.isInRole('Admin'), controllers.home.about)

    app.get('/users/register', controllers.users.registerGet)
    app.post('/users/register', controllers.users.registerPost)

    app.post('/users/logout', controllers.users.logout)

    app.get('/users/login', controllers.users.loginGet)
    app.post('/users/login', controllers.users.loginPost)

    app.get('/thread/add', auth.isAuthenticated, controllers.thread.addGet)
    app.post('/thread/add', controllers.thread.addPost)

    app.get('/thread/all', controllers.thread.all)

    app.get('/thread/:id/:title', controllers.thread.details)

    //app.get('/profile/:username', auth.isAuthenticated, controllers.thread.profile)

    app.post('/thread/:id/:title', controllers.answer.addPost)

    app.get('/thread/:id/details', auth.isAuthenticated, controllers.thread.profile)

    app.get('/delete/:id', auth.isInRole('Admin'), controllers.thread.deleteThreadGet)
    app.post('/delete/:id', auth.isInRole('Admin'), controllers.thread.deleteThreadPost)

    app.post('/answer/delete/:id', auth.isInRole('Admin'), controllers.answer.deleteAnswerPost)
    app.get('/answer/delete/:id', auth.isInRole('Admin'), controllers.answer.deleteAnswer)

    app.get('/category/add', controllers.category.addGet)
    app.post('/category/add', controllers.category.addPost)

    app.get('/admins/add', controllers.users.addAdminGet)
    app.post('/admins/add', controllers.users.addAdminPost)

    app.get('/profile/:username', auth.isAuthenticated, controllers.users.profile)

    app.get('/admins/all', controllers.users.all)

    app.get('/post/:id/:name', controllers.thread.viewThreadGet)

    app.post('/like/:id', auth.isAuthenticated, controllers.thread.like)
    app.post('/dislike/:id', auth.isAuthenticated, controllers.thread.dislike)

    app.post('/block/:id', auth.isInRole('Admin'), controllers.users.block)
    app.post('/unblock/:id', auth.isInRole('Admin'), controllers.users.unblock)
    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found')
        res.end()
    })
}