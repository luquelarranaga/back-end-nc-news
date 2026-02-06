const express = require("express");
const topicsRouter = require("./routers/topic_routes");
const articlesRouter = require("./routers/articles_routes");
const usersRouter = require("./routers/users_routes");
const NotFoundError = require("./errors/NotFoundError");

const app = express();
app.use(express.json());

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/articles/:article_id", articlesRouter);

app.all("/*path", (req, res, next) => {
  return res.status(404).send({ msg: "Path not found!" });
});

//ERROR HANDLING
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
