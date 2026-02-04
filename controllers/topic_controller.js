const getAllTopicsService = require("/Users/malula/NORTHCODERS/projects/nc-news-BE/services/topic_service.js")

const getAllTopics = (req, res) => {
    getAllTopicsService()
    .then((topics) => {
        return res.status(200).send(topics)
    })
}

module.exports = getAllTopics;