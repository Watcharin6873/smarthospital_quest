const express = require('express')
const router = express.Router()
const { 
    getListUsers,
    getListUsersByProv,
    getListUsersByZone,
    getListUserById,
    changeStatus,
    changeRole,
    changeLevel,
    changeObjective,
    removeUser
 } = require('../Controllers/User')
 const {authCheck, adminCheck} = require('../Middleware/Auth')

router.get('/getListUsers',authCheck,adminCheck, getListUsers)

router.get('/getListUsersByProv',authCheck, getListUsersByProv)

router.get('/getListUsersByZone',authCheck, getListUsersByZone)

router.get('/getListUserById/:id',authCheck, adminCheck, getListUserById)

router.put('/changeStatus',authCheck, adminCheck, changeStatus)

router.put('/changeRole',authCheck, adminCheck, changeRole)

router.put('/changeLevel',authCheck, adminCheck, changeLevel)

router.put('/changeObjective',authCheck, adminCheck, changeObjective)

router.delete('/removeUser/:id',authCheck, adminCheck, removeUser)


module.exports = router