const express = require("express");
const topicsRouter = require("./routers/topic_routes")
const articlesRouter = require("./routers/articles_routes")
const usersRouter = require("./routers/users_routes")
const app = express();
app.use(express.json());

app.use('/api/topics', topicsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/users', usersRouter);



module.exports = app



