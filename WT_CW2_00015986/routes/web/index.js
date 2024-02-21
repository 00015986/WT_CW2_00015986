const express = require('express')
const user_router = require('./user')

const router = express.Router()

// registering child routers
router.use('/user', user_router)

module.exports = router