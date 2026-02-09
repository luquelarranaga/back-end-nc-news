const db = require("../db/connection");
const InvalidInputError = require("../errors/InvalidInputError");

function isOrderValid(order) {
  const validOrder = ["asc", "desc"];

  if (validOrder.includes(order) === false) {
    throw new InvalidInputError("Invalid query");
  }
  return true;
}

module.exports = isOrderValid;
