const express = require('express')
const router = express.Router()
const { register, login, currentUser } = require('../Controllers/auth')
const { auth } = require('../Middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/current-user', auth, currentUser)
module.exports = router
