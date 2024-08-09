const express = require('express')
const router = express.Router()
const { list, create, remove, update, listbyID, listbyidtech, listbycaseid, casestatusupdate, listbyIduser, listbyIduserstatuscase } = require('../Controllers/ManageCase')
const { auth } = require('../Middleware/auth')

router.get('/Case', /* auth, */ list)
router.get('/Case/:case_id', listbyID)
router.get('/caseid/:case_id', listbycaseid)
router.get('/Casetech/:technician_id', listbyidtech)
router.get('/caseuser/:user_id', listbyIduser)
router.get('/caseuserstatus/:user_id', listbyIduserstatuscase)
router.post('/Case', create)
router.delete('/Case/:case_id', remove)
router.put('/Case/:case_id', update)
router.patch('/Case/:case_id', casestatusupdate)

module.exports = router
