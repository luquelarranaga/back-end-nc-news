const commentService = require("../services/comments_service");

const getComment = async (req, res, next) => {
  const { comment_id } = req.params;
  console.log("comment_id in controller>>>", comment_id);
  const rowCount = await commentService(comment_id);

  if (rowCount === 1) {
    return res.status(204).send("comment deleted");
  }
};

module.exports = getComment;
