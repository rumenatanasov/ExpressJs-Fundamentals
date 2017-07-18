const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {
    res.render('users/register')
}
module.exports.registerPost = (req, res) => {
    let user = req.body 

    if(user.password && user.password !== user.confirmedPassword) {
        user.error = 'Passwords do not match'
        res.render('users/register', user)
        return
    }
    let salt = encryption.generateSalt()
    user.salt = salt

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password)
        user.password = hashedPassword 
    }
    User.create(user).then(user => {
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('users/register', { error: 'Authentication not working!'})
                return
            }
            res.redirect('/')
        })
    }).catch(error => {
        user.error = error
        res.render('users/register', user)
    })
    
}
module.exports.loginGet = (req, res) => {
    res.render('users/login')
}
module.exports.loginPost = (req, res) => {
    let userLogin = req.body

    User.findOne({username: userLogin.username}).then(user => {
        if(!user || !user.authenticate(userLogin.password)) {
            res.render('users/login', {error: 'Invalid credentials'})
        } else {
            req.logIn(user, (error, user) => {
                if (error) {
                    res.render('users/login', {error: 'Authentication not working'})
                    return
                }
                res.redirect('/')
            })
        }
    })
}
module.exports.logout = (req, res) => {
    req.logOut()
    res.redirect('/')
}