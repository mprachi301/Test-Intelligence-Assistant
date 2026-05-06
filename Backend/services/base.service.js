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
const testcases = [];

const featureResponse = (title) => {
    if (!title) {
        throw new Error('Title is required');
    }

    const response ={
        id: idCount++,
        name: title
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

    testcases.push(response);
    return response;
}

const getTestcasesByFeatureId = (featureId) => {
    const testcase = testcases.filter(t => t.featureId === Number(featureId));
    return testcase;
}

const deleteTestcaseById = (featureId, testcaseId) => {
    const testcaseIndex = testcases.findIndex(t => t.featureId === Number(featureId) && t.id === Number(testcaseId));
    if (testcaseIndex === -1) {
        return { error: 'Testcase not found' };
    }
    testcases.splice(testcaseIndex, 1);
    return { message: 'Testcase deleted successfully' };
}

const deleteFeatureById = (featureId) => {
    const testcases = getTestcasesByFeatureId(featureId);
    testcases.forEach(tc => {
        deleteTestcaseById(featureId, tc.id);
    });
    const featureIndex = features.findIndex(f => f.id === Number(featureId));
    if (featureIndex === -1) {
        return { error: 'Feature not found' };
    }
    features.splice(featureIndex, 1);
    return { message: 'Feature deleted successfully' };
}

const missingTypesResponse = (featureId) => {
    const testcases = getTestcasesByFeatureId(featureId);
    const existingTypes = new Set(testcases.map(t => t.type.toLowerCase()));
    const missingTypes = REQUIRED_TYPES.filter(type => !existingTypes.has(type.toLowerCase()));
    console.log(missingTypes);
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