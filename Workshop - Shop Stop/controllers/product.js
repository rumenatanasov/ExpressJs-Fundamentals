const Product = require('../models/Product')
const Category = require('../models/Category')
const path = require('path')





module.exports.addGet = (req, res) => {
  Category.find().then((categories) => {
    res.render('product/add', { categories: categories })
  })
}
module.exports.addPost = (req, res) => {
  let productObj = req.body
  productObj.image = '\\' + req.file.path
  productObj.creator = req.user._id

  Product.create(productObj).then((product) => {
    Category.findById(product.category).then((category) => {
      category.products.push(product._id)
      category.save()
    })
    res.redirect('/')
  })
}
module.exports.editGet = (req, res) => {
  let id = req.params.id
  Product.findById(id).then(product => {
    if (!product) {
      res.sendStatus(404)
      return
    }
    if(product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
    Category.find().then((categories) => {
      res.render('product/edit-view', {
        product: product,
        categories: categories
      })
    })
    } else {
      res.redirect(`/?error=${encodeURIComponent('You cannot edit this product!')}`)
    }
  })
}
module.exports.editPost = (req, res) => {
  let id = req.params.id
  let editedProduct = req.body

  Product.findById(id).then((product) => {
    if (!product) {
      res.redirect(
        `/?error=${encodeURIComponent('error=Product was not found')}`)
      return

    }
    if (product.creator.equals(req.user.id) || req.user.roles.indexOf('Admin') >= 0) {
      product.name = editedProduct.name
      product.description = editedProduct.description
      product.price = editedProduct.price

      if (req.file) {
        product.image = '\\' + req.file.path
      }


      if (product.category.toString() !== editedProduct.category) {
        Category.findById(product.category).then((currentCategory) => {
          Category.findById(editedProduct.category).then((nextCategory) => {
            let index = currentCategory.products.indexOf(product._id)
            if (index >= 0) {
              currentCategory.products.splice(index, 1)
            }
            currentCategory.save()

            product.category = editedProduct.category

            product.save().then(() => {
              res.redirect(
                '/?success=' + encodeURIComponent('Component was edited successfully')
              )
            })
          })
        })
      } else {
        product.save().then(() => {
          res.redirect(
            '/?success=' + encodeURIComponent('Product was edited successfully'))

        })
      }
    } else {
      res.redirect(`/?error=${encodeURIComponent('You cannot edit this product!')}`)
    }
  })
}

module.exports.deleteGet = (req, res) => {
  let id = req.params.id;
  Product.findById(id).then(product => {
    if (!product) {
      res.sendStatus(404);
      return;
    }

    if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
      res.render('product/delete', { product: product });
    } else {
      res.redirect(`/?error=${encodeURIComponent('You cannot delete this product!')}`);
    }
  })
}
module.exports.deletePost = (req, res) => {
  let id = req.params.id
  let deletedProduct = req.body

  Product.findById(id).then((product) => {
    if (!product) {
      res.redirect(
        `/?error=${encodeURIComponent('error=Product was not found')}`)
      return

    }
    if (product.creator.equals(req.user.id) || req.user.roles.indexOf('Admin') >= 0) {
      Category.find().then(() => {
         Product.remove(product).then(() => {
        res.redirect(
          '/?success=' + encodeURIComponent('Product was deleted successfully')
        )
      })
      })
    } else {
         res.redirect(`/?error=${encodeURIComponent('You cannot delete this product!')}`)
    }

  })
}
module.exports.buyGet = (req, res) => {
  let id = req.params.id
  Product.findById(id).then(product => {
    if (!product) {
      res.sendStatus(404)
      return
    }
    Category.find().then((categories) => {
      res.render('product/buy', {
        product: product,
        categories: categories
      })
    })
  })
}
module.exports.buyPost = (req, res) => {
  let productId = req.params.id

  Product.findById(productId).then(product => {
    if (product.buyer) {
      let error = `error=${encodeURIComponent('Product was already bought!')}`
      res.redirect(`/${error}`)
      return
    }
    product.save().then(() => {
      req.user.boughtProducts.push(productId)
      req.user.save().then(() => {
        res.redirect('/')
      })
    })
  })

}


