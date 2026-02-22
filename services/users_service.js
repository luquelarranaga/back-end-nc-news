const NotFoundError = require("../errors/NotFoundError");
const exportObject = require("../models/users_model");
const { fetchAllUsers } = exportObject;
const { fetchUser } = exportObject;

const getAllUsersService = () => {
  return fetchAllUsers();
};

const getUserService = async (username) => {
  const user = await fetchUser(username);

  if (user === undefined) {
    throw new NotFoundError("Username not found!");
  } else {
    return user;
  }
};

module.exports = { getAllUsersService, getUserService };
