const db = require("../db/connection");
const InvalidInputError = require("../errors/InvalidInputError");

async function isTopicValid(topic) {
  const result = await db.query(`SELECT topic FROM articles`);
  const { rows } = result;
  const databaseTopics = rows.map((row) => row.topic);
  // console.log(
  //   "topic valid result in function>>>>",
  //   databaseTopics.includes(topic) ? true : false,
  // );
  return databaseTopics.includes(topic) ? true : false;
}

module.exports = isTopicValid;
