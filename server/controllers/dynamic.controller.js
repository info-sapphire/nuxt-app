const CodedError = require('../libraries/CodedError')
const Product = require('../models/dynamic/Product')

module.exports.list = async (req, res, next) => {
  try {
    const products = await Product.find().populate('created.user', 'email')

    return next(
      new CodedError('SUCCESS', {
        data: products
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
module.exports.tree = (req, res, next) => {}
module.exports.create = async (req, res, next) => {
  try {
    const { title, description } = req.body

    if ([title, description].includes(undefined)) {
      return next(
        new CodedError('BAD_REQUEST', {
          message: 'Не хватает обязательных полей'
        })
      )
    }

    const product = new Product({
      title,
      description,
      created: { user: req.user.userId }
    })

    await product.save()

    return next(
      new CodedError('SUCCESS', {
        data: product
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
module.exports.get = (req, res, next) => {}
module.exports.update = (req, res, next) => {}
module.exports.remove = async (req, res, next) => {
  try {
    let method, remove

    if (typeof req.params.id !== 'undefined') {
      remove = req.params.id
      method = 'deleteOne'
    } else {
      remove = req.body.list
      method = 'deleteMany'
    }

    await Product[method]({ _id: remove })

    return next(
      new CodedError('SUCCESS', {
        data: Array.isArray(remove) ? remove : [remove]
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
