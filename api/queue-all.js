const mongojs = require('mongojs')
const db = mongojs(process.env.MONGODB_CONNECTION)
const queue = db.collection(process.env.MONGODB_COLLECTION)
const logger = require('../lib/logger')

async function getAll (request, response) {
  logger('info', ['api', 'queue-all', 'getAll'])
  queue.find({ isQueued: true }, (error, documents) => {
    if (error) {
      logger('error', ['api', 'queue-all', 'getAll', error])
      response.status(500)
      response.send(error)
    } else {
      if (documents.length > 0) {
        logger('info', ['api', 'queue-all', 'getAll', 'documents', documents.length, 'success'])
      } else {
        logger('info', ['api', 'queue-all', 'getAll', 'no documents in queue', 'success'])
      }
      response.json(documents)
    }
  })
}

module.exports = require('../lib/check-token')(getAll)
