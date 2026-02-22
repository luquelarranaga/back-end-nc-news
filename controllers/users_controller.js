const exportObject = require("../services/users_service.js");
const { getAllUsersService } = exportObject;
const { getUserService } = exportObject;

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();

  return res.status(200).send({ users: users });
};

const getUser = async (req, res) => {
  const { username } = req.params;
  const regex = /([\d\w_])+/;
  if (regex.test(username) === false) {
    return res.status(400).send({ msg: "Invalid username!" });
  }
  const user = await getUserService(username);
  return res.status(200).send({ user: user });
};

module.exports = { getAllUsers, getUser };
