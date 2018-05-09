// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')
const helmet = require('helmet')

// Utilities
const handlers = require('./lib/handlers')
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
router.use(jwt({secret: config.JWT_SECRET}).unless({path: ['/']}))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handlers.frontpage)
router.put('/queue', handleQueue.addQueue)
router.get('/queue/next', handleQueue.getNext)
router.delete('/queue/:id', handleQueue.deleteFromQueue)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
