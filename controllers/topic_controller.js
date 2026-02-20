const getAllTopicsService = require("../services/topic_service.js");

const getAllTopics = async (req, res) => {
  const topics = await getAllTopicsService();

  return res.status(200).send({ topics: topics });
};

module.exports = getAllTopics;
