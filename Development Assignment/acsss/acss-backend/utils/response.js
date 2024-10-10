// utils/response.js

const createResponse = (statusCode, statusDescription, data = null) => {
    return {
        statusCode,
        statusDescription,
        data,
    };
};

module.exports = createResponse;
