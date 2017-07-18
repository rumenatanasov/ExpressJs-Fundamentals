const Thread = require('../data/Thread')

module.exports = {
    index: (req, res) => {
        Thread.find().populate('creator').sort('-lastAnswerDate').limit(20).then(threads => {
            res.render('home/index', {
                threads: threads
            })
        })

    },
    about: (req, res) => {
        res.render('home/about')
    }
}