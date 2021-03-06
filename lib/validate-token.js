const jwt = require('jsonwebtoken')
const logger = require('./logger')

module.exports = async token => {
  logger('info', ['validate-token', 'start'])
  const verifiedToken = process.env.JWT_SECRET ? jwt.verify(token, process.env.JWT_SECRET) : true
  logger('info', ['validate-token', 'success'])
  return verifiedToken
}
