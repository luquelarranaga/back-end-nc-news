const db = require("../db/connection");
const InvalidInputError = require("../errors/InvalidInputError");

function isSortByValid(sort_by) {
  const validSortBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ]; //query db directly?

  if (validSortBy.includes(sort_by) === false) {
    return false;
  }
  return true;
}

module.exports = isSortByValid;
