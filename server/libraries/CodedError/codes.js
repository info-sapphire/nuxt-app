const zeroCode = {
  message: 'Unknown error',
  status: 500
}

const codes = {}

/**
 *
 * @param {number|string} code - Error code
 * @returns {object} - Error
 */
const get = code =>
  code in codes ? { ...codes[code], code } : { ...zeroCode, code }

/**
 *
 * @param {object} input - Map error
 */
const use = (code, status, message) => {
  codes[code] = { ...zeroCode, code, status, message }
}

module.exports = { get, use, zeroCode }
