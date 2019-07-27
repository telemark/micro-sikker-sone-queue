const mongo = require('../lib/mongo')
const logger = require('../lib/logger')

async function addQueue (request, response) {
  const db = await mongo()
  const queue = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'queue-add', 'addQueue'])
  const data = request.body
  data.isQueued = true
  data.timeStamp = new Date().getTime()
  try {
    const result = await queue.insertOne(data)
    logger('info', ['api', 'queue-add', 'addQueue', 'success'])
    response.json(result)
  } catch (error) {
    logger('error', ['api', 'queue-add', 'addQueue', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(addQueue)
