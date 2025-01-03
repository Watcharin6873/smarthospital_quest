const express = require('express')
const router = express.Router()
const { authCheck } = require('../Middleware/Auth')
const {
    getHospitalOnProv
} = require('../Controllers/Hospitals')


router.get('/getHospitalOnProv/:province',authCheck, getHospitalOnProv)


module.exports = router