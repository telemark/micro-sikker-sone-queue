const mongojs = require('mongojs')
const db = mongojs(process.env.MONGODB_CONNECTION)
const queue = db.collection(process.env.MONGODB_COLLECTION)
const logger = require('./logger')

function getParams (path) {
  const list = path.split('/')
  return {
    id: list.pop()
  }
}

async function deleteFromQueue (request, response) {
  logger('info', ['api', 'queue-delete', 'deleteFromQueue'])
  const params = getParams(request.url)
  const { id } = params
  const queueId = mongojs.ObjectId(id)
  logger('info', ['api', 'queue-delete', 'deleteFromQueue', 'id', id])
  queue.remove({ _id: queueId }, (error, result) => {
    if (error) {
      logger('error', ['api', 'queue-delete', 'deleteFromQueue', 'id', id, error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['api', 'queue-delete', 'deleteFromQueue', 'id', id, 'deleted'])
      response.json(result)
    }
  })
}

module.exports = require('../lib/check-token')(deleteFromQueue)
