const getAllTopicsService = require("/Users/malula/NORTHCODERS/projects/nc-news-BE/services/topic_service.js")

const getAllTopics = async (req, res) => {
    const topics = await getAllTopicsService()

    return res.status(200).send(topics)
}

module.exports = getAllTopics;