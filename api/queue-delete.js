const { ObjectId } = require('mongodb')
const mongo = require('../lib/mongo')
const logger = require('./logger')

function getParams (path) {
  const list = path.split('/')
  return {
    id: list.pop()
  }
}

async function deleteFromQueue (request, response) {
  const db = await mongo()
  const queue = db.collection(process.env.MONGODB_COLLECTION)
  logger('info', ['api', 'queue-delete', 'deleteFromQueue'])
  const params = getParams(request.url)
  const { id } = params
  const queueId = ObjectId(id)
  logger('info', ['api', 'queue-delete', 'deleteFromQueue', 'id', id])
  try {
    const result = await queue.deleteOne({ _id: queueId })
    logger('info', ['api', 'queue-delete', 'deleteFromQueue', 'id', id, 'deleted'])
    response.json(result)
  } catch (error) {
    logger('error', ['api', 'queue-delete', 'deleteFromQueue', 'id', id, error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(deleteFromQueue)
