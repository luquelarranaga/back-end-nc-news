const exportObject = require("../models/users_model");
const { fetchAllUsers } = exportObject;
const { fetchUser } = exportObject;

const getAllUsersService = () => {
  return fetchAllUsers();
};

const getUserService = (username) => {
  return fetchUser(username);
};

module.exports = { getAllUsersService, getUserService };
