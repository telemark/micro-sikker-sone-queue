const mongojs = require('mongojs')
const db = mongojs(process.env.MONGODB_CONNECTION)
const queue = db.collection(process.env.MONGODB_COLLECTION)
const logger = require('../lib/logger')

async function getNext (request, response) {
  logger('info', ['api', 'queue-next', 'getNext'])
  queue.find({ isQueued: true }).sort({ timeStamp: 1 }).limit(1, (error, documents) => {
    if (error) {
      logger('error', ['api', 'queue-next', 'getNext', error])
      response.status(500)
      response.send(error)
    } else {
      if (documents.length === 1) {
        logger('info', ['api', 'queue-next', 'getNext', 'success', documents[0]._id])
      } else {
        logger('info', ['api', 'queue-next', 'getNext', 'success', 'no documents in queue'])
      }
      response.json(documents)
    }
  })
}

module.exports = require('../lib/check-token')(getNext)
