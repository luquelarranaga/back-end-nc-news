const fetchAllTopics = require("../models/topics_model")

const getAllTopicsService = () => {
    return fetchAllTopics();
}

module.exports = getAllTopicsService;

