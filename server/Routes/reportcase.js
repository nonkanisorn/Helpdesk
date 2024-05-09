const express = require('express')
const router = express.Router()
const {list, create,remove, update} = require('../Controllers/reportcase')

router.get('/Case',list)


module.exports = router