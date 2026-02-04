const fetchAllUsers = require("../models/users_model")

const getAllUsersService = () => {
    return fetchAllUsers();
}

module.exports = getAllUsersService;
