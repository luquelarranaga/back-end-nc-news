const db = require("../db/connection");
const NotFoundError = require("../errors/NotFoundError");
const doesCommentExist = require("../utils/doesCommentExist");

const deleteComment = async (comment_id) => {
  if ((await doesCommentExist(comment_id)) === false) {
    throw new NotFoundError("Comment not found!");
  }
  try {
    const result = await db.query(
      `
        DELETE FROM comments WHERE comment_id = $1 RETURNING *
        `,
      [comment_id],
    );

    const { rowCount } = result;
    return rowCount;
  } catch (err) {
    return err;
  }
};

module.exports = deleteComment;
