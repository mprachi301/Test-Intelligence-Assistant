const { REQUIRED_TYPES } = require('../staticData');

const getBaseResponse = () => {
    return {
        status: 'OK',
        message: 'API is running',
        timestamp: new Date()
    };
};

let idCount = 1;
let testIdCount = 1;
const features = [];

const featureResponse = (title) => {
    if (!title) {
        throw new Error('Title is required');
    }

    const response ={
        id: idCount++,
        name: title,
        testcases: []
    }

    features.push(response);
    return response;
}

const getFeaturesResponse = () => {
    return features;
}

const getFeaturesResponseById = (id) => {
    const feature = features.find(f => f.id === Number(id));
    return feature ? feature : { error: 'Feature not found' }
}

const testcaseResponse = (featureId, title, type, tag) => {
    if (!featureId || !title || !type || !tag) {
        throw new Error('All fields are required');
    }

    const response = {
        id: testIdCount++,
        featureId,
        title,
        type,
        tag
    }

    const tcFeature = features.find(f => f.id === Number(featureId));
    if (tcFeature) {
        tcFeature.testcases.push(response);
    }else {
        throw new Error('Feature not found for the given featureId');
    }
    return response;
}

const getTestcasesByFeatureId = (featureId) => {
    const relatedTestcases = features.find(f => f.id === Number(featureId))?.testcases || "Testcases not found for this feature";
    return relatedTestcases;
}

const deleteTestcaseById = (featureId, testcaseId) => {
    const tcFeature = features.find(f => f.id === Number(featureId));
    const testcaseIndex = tcFeature.testcases.findIndex(t => t.id === Number(testcaseId));
    if (testcaseIndex === -1) {
        return { error: 'Testcase not found' };
    }
    tcFeature.testcases.splice(testcaseIndex, 1);
    return { message: 'Testcase deleted successfully' };
}

const deleteFeatureById = (featureId) => {
    const featureIndex = features.findIndex(f => f.id === Number(featureId));
    if (featureIndex === -1) {
        return { error: 'Feature not found' };
    }
    features.splice(featureIndex, 1);
    return { message: 'Feature deleted successfully' };
}

const missingTypesResponse = (featureId) => {
    const relatedTestcases = getTestcasesByFeatureId(featureId);
    const existingTypes = new Set(relatedTestcases.map(t => t.type.toLowerCase()));
    const missingTypes = REQUIRED_TYPES.filter(type => !existingTypes.has(type.toLowerCase()));
    const response = {
        featureId,
        featureName: features.find(f => f.id === Number(featureId))?.name || 'unknown',
        coverage: {
            present: [...existingTypes],
            missing: missingTypes
        }
    }
    return response;
}

module.exports = {
    getBaseResponse,
    featureResponse,
    getFeaturesResponse,
    getFeaturesResponseById,
    testcaseResponse,
    getTestcasesByFeatureId,
    deleteTestcaseById,
    deleteFeatureById,
    missingTypesResponse
};