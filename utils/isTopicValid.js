const db = require("../db/connection");
const InvalidInputError = require("../errors/InvalidInputError");

async function isTopicValid(topic) {
  if (topic === null) return true;

  const result = await db.query(`SELECT topic FROM articles`);
  const { rows } = result;
  const databaseTopics = rows.map((row) => row.topic);

  return databaseTopics.includes(topic) ? true : false;
}

module.exports = isTopicValid;
