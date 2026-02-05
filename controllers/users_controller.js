const getAllUsersService = require("/Users/malula/NORTHCODERS/projects/nc-news-BE/services/users_service.js")

const getAllUsers = async (req, res) => {
    const users = await getAllUsersService()

    return res.status(200).send({users: users})
}

module.exports = getAllUsers;