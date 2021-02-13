require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../build")));

//To allow cross-origin requests
app.use(cors());
//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
  if(err.name == "UnauthorizedError"){
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
