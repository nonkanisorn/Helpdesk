const express = require('express')
const router = express.Router()
const {list, create,remove, update} = require('../Controllers/ManageCase')

router.get('/Case',list)
router.post('/Case',create)
router.delete('/Case/:case_id',remove)
router.put('/Case/:case_id',update)

module.exports = router