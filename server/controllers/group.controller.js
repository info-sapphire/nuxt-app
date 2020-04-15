const CodedError = require('../libraries/CodedError')
const Group = require('../models/Group')
const { roles } = require('../config')

module.exports.list = async (req, res, next) => {
  try {
    const groups = await Group.find().sort({ position: 1 })

    return next(
      new CodedError('SUCCESS', {
        data: {
          groups,
          roles
        }
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.create = async (req, res, next) => {
  const { name, key, description, position } = req.body

  const group = new Group({
    name,
    key,
    description,
    position,
    roles: []
  })

  try {
    await group.save()

    return next(
      new CodedError('CREATED', {
        message: 'Группа создана',
        data: group
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.update = async (req, res, next) => {
  const { roles } = req.body

  try {
    const group = await Group.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { roles } },
      { new: true, useFindAndModify: false }
    )
    return next(
      new CodedError('SUCCESS', {
        data: group
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}

module.exports.remove = async (req, res, next) => {
  const { id } = req.params

  try {
    await Group.deleteOne({ _id: id })

    return next(
      new CodedError('SUCCESS', {
        data: id
      })
    )
  } catch (error) {
    return next(new CodedError('CODE_ERROR', { message: error.message }))
  }
}
