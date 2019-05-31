// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')
const helmet = require('helmet')

// Utilities
const handleQueue = require('./lib/handle-queue')
const config = require('./config')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS & HELMET
router.use(cors())
router.use(helmet({
  noSniff: false
}))

// JWT
router.use(jwt({ secret: config.JWT_SECRET }))
router.use(handleUnauthorized)

// ROUTES
router.put('/queue', handleQueue.addQueue)
router.get('/queue/next', handleQueue.getNext)
router.get('/queue/all', handleQueue.getAll)
router.delete('/queue/:id', handleQueue.deleteFromQueue)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
