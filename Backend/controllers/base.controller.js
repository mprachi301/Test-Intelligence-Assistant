const indexService = require('../services/base.service')

const getBaseRoute = (req, res) => {
    const response = indexService.getBaseResponse();
    res.status(200).json(response)
};

const postFeaturesRoute = (req, res) => {
    try {
        const {title} = req.body;
        res.status(200).json(indexService.featureResponse(title))
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getFeaturesRoute = (req, res) => {
    try {
        const data = indexService.getFeaturesResponse();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getFeaturesRouteById = (req, res) => {
    try {
        const {id} = req.params;
        const data = indexService.getFeaturesResponseById(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postTestcasesRoute = (req, res) => {
    try {
        const featureId = Number(req.params.id);
        const {title, type, tag} = req.body;
        res.status(200).json(indexService.testcaseResponse(featureId, title, type, tag))
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getTestcasesRouteByFeatureId = (req, res) => {
    try {
        const featureId = Number(req.params.id);
        const data = indexService.getTestcasesByFeatureId(featureId)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

const deleteTestcaseRouteById = (req, res) => {
    try {
        const featureId = Number(req.params.featureId)
        const testcaseId = Number(req.params.testcaseId)
        const data = indexService.deleteTestcaseById(featureId, testcaseId)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteFeatureRouteById = (req, res) => {
    try {
        const featureId = Number(req.params.id)
        const data = indexService.deleteFeatureById(featureId)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const missingTypesRoute = (req, res) => {
    try {
        const featureId = Number(req.params.id)
        const data = indexService.missingTypesResponse(featureId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getBaseRoute,
    postFeaturesRoute, 
    getFeaturesRoute, 
    getFeaturesRouteById, 
    postTestcasesRoute, 
    getTestcasesRouteByFeatureId,
    deleteTestcaseRouteById,
    deleteFeatureRouteById,
    missingTypesRoute
};
