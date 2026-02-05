const express = require("express");
const topicsRouter = require("./routers/topic_routes");
const articlesRouter = require("./routers/articles_routes");
const usersRouter = require("./routers/users_routes");

const app = express();
app.use(express.json());

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/articles/:article_id", articlesRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found!" });
});

module.exports = app;
