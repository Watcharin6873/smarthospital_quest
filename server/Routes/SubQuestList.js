const express = require('express')
const router = express.Router()
const { getSubQuetList } = require('../Controllers/SubQuestList')
const { authCheck } = require('../Middleware/Auth')

router.get('/getSubQuetList', authCheck, getSubQuetList)

module.exports = router