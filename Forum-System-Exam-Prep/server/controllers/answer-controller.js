const Answer = require('../data/Answer')
const Thread = require('../data/Thread')

module.exports.addPost = (req, res) => {
   if(req.user.isBlocked) {
        res.redirect('/')
        return
    }
    let threadId = req.params.id
    let userId = req.user._id
    let answerReq = req.body

    Answer.create({
        content: answerReq.content,
        thread: threadId,
        creator: userId
    }).then(answer => {
        Thread.findById(threadId).populate('creator').then(thread => {
            thread.answers.push(answer._id)
            thread.lastAnswerDate = answer.date
            thread.save().then((thread) => {
                Answer.find({ thread: thread._id.toString() }).populate('creator').sort('date').then(answers => {
                    res.redirect(`/thread/${threadId}/${thread.title}`)
                })

            })
        })
    })
}
module.exports.deleteAnswer = (req, res) => {
    let id = req.params.id
    Answer.find(id).then(answer => {
        res.render('answer/delete', answer)
    })
}
module.exports.deleteAnswerPost = (req, res) => {
    let id = req.params.id
    Answer.findById(id).then((answer) => {
        Answer.remove(answer).then(() => {
            res.redirect('/thread/all')
        })
    })
}  