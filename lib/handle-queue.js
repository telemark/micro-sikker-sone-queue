const { json, send } = require('micro')
const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const queue = db.collection('queue')
const logger = require('./logger')

module.exports.addQueue = async (request, response) => {
  logger('info', ['handle-queue', 'addQueue'])
  const data = await json(request)
  data.isQueued = true
  data.timeStamp = new Date().getTime()
  queue.save(data, (error, result) => {
    if (error) {
      logger('error', ['handle-queue', 'addQueue', error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-queue', 'addQueue', 'success'])
      send(response, 200, result)
    }
  })
}

module.exports.getNext = async (request, response) => {
  logger('info', ['handle-queue', 'getNext'])
  queue.find({isQueued: true}).sort({timeStamp: 1}).limit(1, (error, documents) => {
    if (error) {
      logger('error', ['handle-queue', 'getNext', error])
      send(response, 500, error)
    } else {
      if (documents.length === 1) {
        logger('info', ['handle-queue', 'getNext', 'success', documents[0]._id])
      } else {
        logger('info', ['handle-queue', 'getNext', 'success', 'no documents in queue'])
      }
      send(response, 200, documents)
    }
  })
}

module.exports.deleteFromQueue = async (request, response) => {
  logger('info', ['handle-queue', 'deleteFromQueue'])
  const { id } = request.params
  const queueId = mongojs.ObjectId(id)
  logger('info', ['handle-queue', 'deleteFromQueue', 'id', id])
  queue.remove({'_id': queueId}, (error, result) => {
    if (error) {
      logger('error', ['handle-queue', 'deleteFromQueue', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handle-queue', 'deleteFromQueue', 'id', id, 'deleted'])
      send(response, 200, result)
    }
  })
}
