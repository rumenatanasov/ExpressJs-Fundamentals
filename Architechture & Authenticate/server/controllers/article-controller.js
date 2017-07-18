const Article = require('../data/Article')
let paginate = require('mongoose-paginate')
module.exports.articleGet = (req, res) => {
    res.render('article/add')
}
module.exports.articlePost = (req, res) => {
    let articles = req.body
    Article.create(articles).then((article) => {
        res.redirect('/')
    })
}
module.exports.allGet = (req, res) => {
    let pageSize = 2
    let page = parseInt(req.query.page) || 1
    let search = req.query.search
    let queryData = req.query
    let query = Article.find({})
    if (search) {
        query = query.where('title').regex(new RegExp(search, 'i'))
    }

    query.sort('-createdOn').skip((page - 1) * pageSize).limit(pageSize).then((articles) => {

        let data = { articles: articles }
        if (req.query.error) {
            data.error = req.query.error
        } else if (req.query.success) {
            data.success = req.query.success
        }
        res.render('article/all', {
            articles: articles,
            hasPrevPage: page > 1,
            hasNextPage: articles.length > 0,
            prevPage: page - 1,
            nextPage: page + 1
        })
    })


}
module.exports.detailsArticle = (req, res) => {
    let id = req.params.id
    Article.findById(id).then((article) => {

        let data = { article: article }
        res.render('article/details', data)
    })
}
module.exports.editGet = (req, res) => {
  res.render('article/edit')
}
module.exports.editPost = (req, res) => {
    let id = req.params.id
    let editArticle = req.body
    Article.findById(id).then((article) => {
     
         // if (article.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
            article.title = editArticle.title
            article.description = editArticle.description
            article.save().then(() => {
                res.redirect(
                    '/?success=' + encodeURIComponent('Article was edited successfully')
                )
            })
         //  } else {
         //      res.send('Maduri')
         //  }
    })
}


