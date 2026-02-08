const db = require("../db/connection");

const deleteComment = async (comment_id) => {
  try {
    const result = await db.query(
      `
        DELETE FROM comments WHERE comment_id = $1
        `,
      [comment_id],
    );

    console.log("result in model layer>>>", result);
    const { rowCount } = result;
    return rowCount;
  } catch (err) {
    return err;
  }
};

module.exports = deleteComment;
