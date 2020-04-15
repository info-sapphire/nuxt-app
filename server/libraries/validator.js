module.exports = (validate, body = {}) => {
  const errors = []

  Object.entries(validate).forEach(([key, value]) => {
    const { required, min, max } = value

    if (required !== undefined && required) {
      if (!(key in body) || Boolean(body[key]) === false) {
        errors.push({ [key]: `${key} field is required` })
      }
    }

    if (min !== undefined && min > 0) {
      if (key in body && body[key].length < min) {
        errors.push({ [key]: `min length for ${key} field is ${min}` })
      }
    }

    if (max !== undefined && max > 0) {
      if (key in body && body[key].length > max) {
        errors.push({ [key]: `max length for ${key} field is ${max}` })
      }
    }
  })

  return errors
}
