const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

async function getNext (request, response) {
  const db = await mongo()
  const queue = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'queue-next', 'getNext'])
  try {
    const documents = await queue.find({ isQueued: true }).sort({ timeStamp: 1 }).limit(1).toArray()
    if (documents.length === 1) {
      logger('info', ['api', 'queue-next', 'getNext', 'success', documents[0]._id])
    } else {
      logger('info', ['api', 'queue-next', 'getNext', 'success', 'no documents in queue'])
    }
    response.json(documents)
  } catch (error) {
    logger('error', ['api', 'queue-next', 'getNext', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(getNext)
