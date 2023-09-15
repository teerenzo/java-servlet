const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      req.token = token

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({message:'Not authorized'})
    }
  }

  if (!token) {
    res.status(401).json({message:'Not authorized, no token'})
  }
})

module.exports = { protect }