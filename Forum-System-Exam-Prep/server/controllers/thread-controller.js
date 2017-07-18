let Thread = require('../data/Thread')
let Answer = require('../data/Answer')
let Category = require('../data/Category')
let User = require('../data/User')

module.exports.addGet = (req, res) => {
    res.render('threads/add')
}
module.exports.addPost = (req, res) => {
    if(req.user.isBlocked) {
        res.redirect('/')
        return
    }
    let threads = req.body
    threads.creator = req.user._id

    Thread.create({
        title: threads.title,
        description: threads.description,
        category: threads.category,
        creator: threads.creator
    }).then((thread) => {
            res.redirect('/thread/all')
        

    }).catch((err) => {
        Category.find().then(categories => {
            res.render('threads/add', {
            categories: categories,
            thread: threads
            })
        })
        res.locals.globalError = err

    })

}
module.exports.all = (req, res) => {
    let id = req.params.id
    let pageSize = 3
    let page = Number(req.query.page) || 1
    let search = req.query.search
    let query = Thread.find()

    if (search) {
        query = query.where('title').regex(new RegExp(search, 'i'))
    }

    query.sort('-date').populate('creator').skip((page - 1) * pageSize).limit(pageSize).then((thread) => {
        Answer.find({ thread: thread._id }).sort('-date').populate('creator').then(() => {
            res.render('threads/all', {
                threads: thread,
                hasPrevPage: page > 1,
                hasNextPage: thread.length === pageSize,
                prevPage: page - 1,
                nextPage: page + 1,
                search: search
            })
        })

    })



}
module.exports.details = (req, res) => {
    let id = req.params.id
    Thread.findById(id).populate('creator').then((thread) => {
        Answer.find({ thread: thread._id }).populate('creator').sort('-date').then(answers => {
            res.render('threads/details', {
                thread: thread,
                answers: answers
            })
        })

    })


}
module.exports.profile = (req, res) => {
    let id = req.params.id
    let userId = req.params._id

    Thread.find({ user: userId }).populate('creator').then((threads) => {
        Answer.find({ threads: threads._id }).populate('creator').then((answers) => {

            res.render('profile/me', {
                threads: threads,
                answers: answers

            })

        })
    })
}
module.exports.deleteThreadGet = (req, res) => {
    let id = req.params.id
    Thread.findById(id).then(thread => {
        res.render('threads/delete', thread)


    })
}
module.exports.deleteThreadPost = (req, res) => {
    let id = req.params.id
    Thread.findById(id).then(thread => {
        Thread.remove(thread).then(() => {
            res.redirect('/')
        })
    })

}
module.exports.like = (req, res) => {
    let id = req.params.id 
    Thread.findById(id).populate('creator').then(thread => {
        thread.likes = thread.likes + 1
        thread.save().then(thread => {
            User.findByIdAndUpdate(req.user._id, {$addToSet: {likedThreads: thread._id}}).then((user) => {
                res.redirect(`/post/${thread._id}/${thread.title}`)
            })
        })
    })
}
module.exports.dislike = (req, res) => {
    let id = req.params.id
    Thread.findById(id).populate('creator').then(thread => {
        thread.likes = thread.likes - 1
        thread.save().then(thread => {
            User.findByIdAndUpdate(req.user._id, {$pull: {likedThreads: {$in: [thread._id]}}}).then((user) => {
                res.redirect(`/post/${thread._id}/${thread.title}`)
            })
        })
    })
}
module.exports.viewThreadGet = (req, res) => {
    let id = req.params.id 
    Thread.findById(id).populate('creator').then(thread => {
        Answer.find({thread: thread._id.toString()}).populate('creator').sort('date').then(answers => {
            thread.views = thread.views + 1
            thread.save().then(thread => {
                if(req.user) {
                    res.render('threads/view', {
                        thread: thread,
                        answers: answers,
                        //hasLiked: req.user.likedThreads.indexOf(thread._id) > -1
                    })
                } else {
                    res.render('threads/view', {
                        thread: thread,
                        answers: answers
                    })
                }
            })
        })
    })
}