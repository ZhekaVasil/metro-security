const express = require("express");
const usersRouter = require("./users");
const questionsRouter = require("./questions");
const answersRouter = require("./answers");

const app = express();

app.use("/users/", usersRouter);
app.use("/questions/", questionsRouter);
app.use("/answers/", answersRouter);

module.exports = app;
