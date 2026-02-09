const commentService = require("../services/comments_service");

const getComment = async (req, res, next) => {
  const { comment_id } = req.params;

  const regex = /^\d+/;
  console.log("regex result>>>>", regex.test(comment_id));
  if (regex.test(comment_id) === false) {
    return res.status(400).send({ msg: "Invalid comment!" });
  }
  const rowCount = await commentService(comment_id);

  if (rowCount === 1) {
    return res.status(200).send({ msg: "comment deleted" }); //sendStatus(204), 204 doesn't send a body
  }
};

module.exports = getComment;
