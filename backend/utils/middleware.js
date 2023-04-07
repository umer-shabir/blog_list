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

const errorHandler = (error, request, respone, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return respone.status(400).send({ error: 'Malformatted id'})
    } else if (error.name === 'ValidationError') {
        return respone.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requrestLogger,
    unknownEndpoint,
    errorHandler
}