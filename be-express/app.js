const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const sequelize = require("./libraries/sequelize");
const models = require("./models");
const passport = require("./libraries/passport");

const productsRouter = require("./routes/products");
const employeesRouter = require("./routes/employees");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/employees", employeesRouter);

module.exports = app;
