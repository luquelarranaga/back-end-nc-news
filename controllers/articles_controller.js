const exportObject = require("../services/articles_service");
const { getAllArticlesService } = exportObject;
const { getArticleIDService } = exportObject;
const { getArticleCommentsService } = exportObject;
const { addCommentService } = exportObject;
const { updateVotesService } = exportObject;

const getAllArticles = async (req, res) => {
  const articles = await getAllArticlesService();

  return res.status(200).send({ articles: articles });
};

const getArticleID = async (req, res, next) => {
  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  try {
    const articleID = await getArticleIDService(article_id);
    return res.status(200).send({ article: articleID });
  } catch (err) {
    next(err);
  }
};

const getArticleComments = async (req, res, next) => {
  const { article_id } = req.params; // {article_id: '1;}
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  try {
    const comments = await getArticleCommentsService(article_id);
    return res.status(200).send({ comments: comments });
  } catch (err) {
    next(err);
  }
};

const postArticleComment = async (req, res, next) => {
  const newComment = req.body;
  const commentKeys = Object.keys(newComment);
  if (
    commentKeys.includes("username") === false ||
    commentKeys.includes("body") === false ||
    commentKeys.length !== 2
  ) {
    return res
      .status(400)
      .send({ msg: "Invalid comment, missing username/body" });
  }

  const { article_id } = req.params;
  const regex = /^\d+/;
  if (regex.test(article_id) === false) {
    return res.status(400).send({ msg: "Invalid ID data type!" });
  }

  try {
    const comment = await addCommentService(newComment, article_id);
    return res.status(201).send({ comment: comment });
  } catch (err) {
    next(err);
  }
};

const patchArticleVotes = async (req, res, next) => {
  const votes = req.body;
  const article_id = req.params;
  console.log("body request >> ", req.body);
  // const commentKeys = Object.keys(newComment);
  // console.log("comment keys >>>", JSON.stringify(commentKeys));
  // if (
  //   commentKeys.includes("username") === false ||
  //   commentKeys.includes("body") === false ||
  //   commentKeys.length !== 2
  // ) {
  //   return res
  //     .status(400)
  //     .send({ msg: "Invalid comment, missing username/body" });
  // }
  // const { article_id } = req.params;
  // const regex = /^\d+/;
  // if (regex.test(article_id) === false) {
  //   return res.status(400).send({ msg: "Invalid ID data type!" });
  // }
  try {
    const updatedArticle = await updateVotesService(votes, article_id);
    return res.status(201).send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllArticles,
  getArticleID,
  getArticleComments,
  postArticleComment,
  patchArticleVotes,
};
