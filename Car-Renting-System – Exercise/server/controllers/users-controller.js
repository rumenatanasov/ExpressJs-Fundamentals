const encryption = require('../utilities/encryption')
const User = require('../data/User')
const Rent = require('../data/Rent')
module.exports = {
    registerGet: (req, res) => {
        res.render('users/register')
    },
    registerPost: (req, res) => {
        let reqUser = req.body
        
        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, reqUser.password)
        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            salt: salt,
            hashedPass: hashedPass
        }).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('users/register', user)
                }
                res.redirect('/')
            })
        })

    },
    loginGet: (req, res) => {
        res.render('users/login')
    },
    loginPost: (req, res) => {
        let reqUser = req.body 
        User.findOne({username: reqUser.username}).then(user => {
            if(!user) {
                res.locals.globalError = 'Invalid user data'
                res.render('users/login')
                return
            }
            if(!user.authenticate(reqUser.password)) {
                res.locals.globalError = 'Invalid user data'
                res.render('users/login')
                return
            }

            req.logIn(user, (err, user) => {
                if(err) {
                    res.locals.globalError = err
                    res.render('users/login')
                }
                res.redirect('/')
            })
        })
    }, 
    logout: (req, res) => {
        req.logOut()
        res.redirect('/')
    },
    profile: (req, res) => {
        let userId = req.user._id

        Rent
          .find({user: userId})
          .sort('-rentedOn')
          .populate('car')
          .then(rentings => {
              res.render('users/profile', {
                  rentings: rentings
              })
          })
    }
}