const codes = require('./codes')

const NAME = 'CodedError'

/** Class representing a CodedError */
class CodedError extends Error {
  /**
   * Create an error
   * @param {number} code - Error code
   * @param {object} params - Error parameters. Optional
   * @param {number} params.status - HTTP status override
   * @param {string} params.message - Error message override
   */
  constructor(code = 0, params = {}) {
    const props = { ...codes.get(code), ...params, name: NAME }

    super(props.message)

    for (const key in props) {
      this[key] = props[key]
    }
  }
}

module.exports = CodedError

module.exports.codes = codes
module.exports.get = codes.get
module.exports.use = codes.use
