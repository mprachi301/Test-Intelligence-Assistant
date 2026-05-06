const express = require('express')
const router = express.Router()
const indexController = require('../controllers/base.controller')

router.get('/', indexController.getBaseRoute);
router.post('/features', indexController.postFeaturesRoute)
router.get('/features/:id', indexController.getFeaturesRouteById)
router.get('/features', indexController.getFeaturesRoute)
router.post('/features/:id/testcases', indexController.postTestcasesRoute)
router.get('/features/:id/testcases', indexController.getTestcasesRouteByFeatureId)
router.delete('/features/:featureId/testcases/:testcaseId', indexController.deleteTestcaseRouteById)
router.delete('/features/:id', indexController.deleteFeatureRouteById)
router.get('/features/:id/analysis', indexController.missingTypesRoute)
module.exports = router;