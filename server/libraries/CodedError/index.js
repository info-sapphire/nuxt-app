const CoddedError = require('./factory')

CoddedError.use('SERVER_ERROR', 500, 'Internal Server Error')
CoddedError.use('CODE_ERROR', 500, 'Something went wrong')
CoddedError.use('NOT_FOUND', 404, 'Not found')
CoddedError.use('ACCESS_DENIED', 403, 'Access denied')
CoddedError.use('INVALID_USER', 403, 'Incorrect username or password')
CoddedError.use('BAD_REQUEST', 400, 'Invalid form data')
CoddedError.use('UNAUTHORIZED', 401, 'Your token expired or not exist')
CoddedError.use('CONFLICT', 409, 'Conflict')
CoddedError.use('SUCCESS', 200, 'OK')
CoddedError.use('CREATED', 201, 'Created')

module.exports = CoddedError
