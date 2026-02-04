const express = require("express");
const app = express();
app.use(express.join());
const topicsRouter = require("./routers/topic_routes")

app.use('/api/topics', topicsRouter);

module.export = app



