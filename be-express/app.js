const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

require("./libraries/sequelize");
require("./models");
require("./libraries/passport");
require("./libraries/createadmin.js");

const productsRouter = require("./routes/products");
const employeesRouter = require("./routes/employees");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/employees", employeesRouter);

module.exports = app;
