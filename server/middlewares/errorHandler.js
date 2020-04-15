const { zeroCode } = require('../libraries/CodedError/codes')

module.exports = (err, req, res, next) => {
  const code = err.code ? err.code : 'ERROR_HANDLER'
  const status = err.status ? err.status : zeroCode.status
  const message = err.message ? err.message : zeroCode.message

  const response = { status, code, message }

  if (err.data) {
    response.data = err.data
  }

  console.log({ status, code, message })

  res.status(status).json(response)
}
