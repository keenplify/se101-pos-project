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
const categoriesRouter = require("./routes/categories");
const variantsRouter = require("./routes/variants")
const transactedvariantsRouter = require("./routes/transactedvariants");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/variants", variantsRouter);
app.use("/api/transactedvariants", transactedvariantsRouter);

module.exports = app;
