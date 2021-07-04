require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const imageRouter = require("./routes/image");
const apiResponse = require("./helpers/apiResponse");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../build")));

//To allow cross-origin requests
app.use(cors());
//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);
app.use("/api/images/", imageRouter);

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
