const logger = require('./logger')

const requrestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---:')
    next()
}

const unknownEndpoint = (request, response) => {
    response.stats(404).send({ error: 'Unknown Endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }

    next()
}

module.exports = {
    requrestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}