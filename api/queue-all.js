const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

async function getAll (request, response) {
  const db = await mongo()
  const queue = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'queue-all', 'getAll'])
  try {
    const documents = await queue.find({ isQueued: true }).toArray()
    if (documents.length > 0) {
      logger('info', ['api', 'queue-all', 'getAll', 'documents', documents.length, 'success'])
    } else {
      logger('info', ['api', 'queue-all', 'getAll', 'no documents in queue', 'success'])
    }
    response.json(documents)
  } catch (error) {
    logger('error', ['api', 'queue-all', 'getAll', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(getAll)
