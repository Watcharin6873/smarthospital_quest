const express = require('express')
const router = express.Router()
const {
    createSubQuest,
    createSubQuestList,
    getListSubQuests,
    getListSubQuestsForEvaluate,
    getSubQuestById,
    updateSubQuest,
    removeSubQuest,
    getSubQuestByCatId
} = require('../Controllers/SubQuest')
const {authCheck, adminCheck} = require('../Middleware/Auth')


router.post('/createSubQuest', authCheck, adminCheck, createSubQuest)

router.post('/createSubQuestList', authCheck, adminCheck, createSubQuestList)

router.get('/getListSubQuests', authCheck, adminCheck, getListSubQuests)

router.get('/getListSubQuestsForEvaluate/:questId', authCheck, getListSubQuestsForEvaluate)

router.get('/getSubQuestById/:id', authCheck, adminCheck, getSubQuestById)

router.get('/getSubQuestByCatId', authCheck, getSubQuestByCatId)

router.put('/updateSubQuest', authCheck, adminCheck, updateSubQuest)

router.delete('/removeSubQuest/:id', authCheck, adminCheck, removeSubQuest)


module.exports = router