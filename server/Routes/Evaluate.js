const express = require('express')
const router = express.Router()
const {
    saveEvaluates,
    getListEvaluateByHosp,
    getListEvaluateByProv,
    getListEvaluateByZone,
    refreshEvaluate,
    getEvaluateById,
    updatePointEvaluate,
    saveDocuments,
    saveEvidenceAll,
    getDocumentsFromEvaluate,
    getDocumentsByEvaluateByHosp,
    truncateTable,
    sumEvaluateByHosp
} = require('../Controllers/Evaluate')
const {authCheck} = require('../Middleware/Auth')
const {uploadFile} = require('../Middleware/UploadFile')
const {uploadAllTypeFile} = require('../Middleware/UploadAllTypeFile')


router.post('/saveEvaluates',authCheck, saveEvaluates)

router.get('/getListEvaluateByHosp/:hcode',authCheck, getListEvaluateByHosp)

router.get('/getListEvaluateByProv/:province',authCheck, getListEvaluateByProv)

router.get('/getListEvaluateByZone/:zone',authCheck, getListEvaluateByZone)

router.get('/refreshEvaluate',authCheck, refreshEvaluate)

router.get('/sumEvaluateByHosp',authCheck, sumEvaluateByHosp)

router.get('/getEvaluateById/:id',authCheck, getEvaluateById)

router.put('/updatePointEvaluate',authCheck, updatePointEvaluate)

router.post('/saveDocuments',authCheck, uploadFile, saveDocuments)

router.post('/saveEvidenceAll',authCheck, uploadAllTypeFile, saveEvidenceAll)

router.get('/getDocumentsFromEvaluate', authCheck, getDocumentsFromEvaluate)

router.get('/getDocumentsByEvaluateByHosp', authCheck, getDocumentsByEvaluateByHosp)

router.delete('/truncateTable', authCheck, truncateTable)



module.exports = router