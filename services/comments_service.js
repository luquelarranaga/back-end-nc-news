const deleteComment = require("../models/comments_model");

const commentService = async (comment_id) => {
  return await deleteComment(comment_id);
};

module.exports = commentService;
