const express = require('express')
const router = express.Router()
const {
    saveEvaluates,
    getListEvaluateAll,
    getEvaluateByHosp,
    getListEvaluateByHosp,
    getListEvaluateByProv,
    getListEvaluateByZone,
    refreshEvaluate,
    getEvaluateById,
    updateChoiceEvaluate,
    saveDocuments,
    saveEvidenceAll,
    getEvidenceFromEvaluate,
    getDocumentsByEvaluateByHosp,
    truncateTable,
    sumEvaluateByHosp,
    saveEvaluates2,
    uploadFileById,
    ssjChangeStatusApprove,
    zoneChangeStatusApprove
} = require('../Controllers/Evaluate')
const {authCheck} = require('../Middleware/Auth')
const {uploadFile} = require('../Middleware/UploadFile')
const {uploadAllTypeFile} = require('../Middleware/UploadAllTypeFile')


router.post('/saveEvaluates',authCheck, saveEvaluates)

router.get('/getListEvaluateAll', getListEvaluateAll)

router.post('/saveEvaluates2',authCheck, uploadAllTypeFile, saveEvaluates2)

router.get('/getListEvaluateByHosp/:hcode',authCheck, getListEvaluateByHosp)

router.get('/getListEvaluateByProv/:province',authCheck, getListEvaluateByProv)

router.get('/getListEvaluateByZone/:zone',authCheck, getListEvaluateByZone)

router.get('/refreshEvaluate',authCheck, refreshEvaluate)

router.get('/sumEvaluateByHosp',authCheck, sumEvaluateByHosp)

router.get('/getEvaluateByHosp',authCheck, getEvaluateByHosp)

router.get('/getEvaluateById/:id',authCheck, getEvaluateById)

router.put('/updateChoiceEvaluate',authCheck, updateChoiceEvaluate)

router.post('/saveDocuments',authCheck, uploadFile, saveDocuments)

router.post('/saveEvidenceAll',authCheck, uploadAllTypeFile, saveEvidenceAll)

router.put('/uploadFileById/:id',authCheck, uploadAllTypeFile, uploadFileById)

router.put('/ssjChangeStatusApprove',authCheck, ssjChangeStatusApprove)

router.put('/zoneChangeStatusApprove',authCheck, zoneChangeStatusApprove)

router.get('/getEvidenceFromEvaluate', authCheck, getEvidenceFromEvaluate)

router.get('/getDocumentsByEvaluateByHosp', authCheck, getDocumentsByEvaluateByHosp)

router.delete('/truncateTable', authCheck, truncateTable)



module.exports = router