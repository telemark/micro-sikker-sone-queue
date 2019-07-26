const mongojs = require('mongojs')
const db = mongojs(process.env.MONGODB_CONNECTION)
const queue = db.collection(process.env.MONGODB_COLLECTION)
const logger = require('../lib/logger')

async function addQueue (request, response) {
  logger('info', ['api', 'queue-add', 'addQueue'])
  const data = request.body
  data.isQueued = true
  data.timeStamp = new Date().getTime()
  queue.save(data, (error, result) => {
    if (error) {
      logger('error', ['api', 'queue-add', 'addQueue', error])
      response.status(500)
      response.send(error)
    } else {
      logger('info', ['api', 'queue-add', 'addQueue', 'success'])
      response.json(result)
    }
  })
}

module.exports = require('../lib/check-token')(addQueue)
