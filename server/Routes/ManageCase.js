const express = require('express')
const router = express.Router()
const { list, create, remove, update, listbyID } = require('../Controllers/ManageCase')
const { auth } = require('../Middleware/auth')

router.get('/Case', auth, list)
router.get('/Case/:case_id', listbyID)
router.post('/Case', create)
router.delete('/Case/:case_id', remove)
router.put('/Case/:case_id', update)

module.exports = router
