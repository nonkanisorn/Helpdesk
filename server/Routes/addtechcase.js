const express = require('express')
const router = express.Router()
const {patch} = require('../Controllers/addtechcase')

router.patch('/addtechcase/:case_id',patch)


module.exports = router