const express = require("express");
const topicsRouter = require("./routers/topic_routes");
const articlesRouter = require("./routers/articles_routes");
const usersRouter = require("./routers/users_routes");
const commentsRouter = require("./routers/comments_routes");
const NotFoundError = require("./errors/NotFoundError");
const InvalidInputError = require("./errors/InvalidInputError");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

//MIDDLEWARE CHAIN

app.use("/api", express.static("public"));

app.use("/api/articles", articlesRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/topics", topicsRouter);

app.use("/api/users", usersRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found!" });
});

//ERROR HANDLING MIDDLEWARE CHAIN
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err instanceof InvalidInputError) {
    res.status(400).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
