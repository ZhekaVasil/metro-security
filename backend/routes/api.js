const express = require("express");
const usersRouter = require("./users");
const questionsRouter = require("./questions");

const app = express();

app.use("/users/", usersRouter);
app.use("/questions/", questionsRouter);

module.exports = app;
