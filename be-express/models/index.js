const { Sequelize } = require("sequelize");
const sequelize = require("../libraries/sequelize");
const { hashSync } = require("bcrypt");

const Employee = require("./employee");
const Product = require("./product");
const Token = require("./token");
const EWallet = require("./e-wallet");
const Transaction = require("./transaction");
const TransactedVariant = require("./transactedvariant");
const Variant = require("./variant");
const Image = require("./image");
const Category = require("./category");
const Log = require("./log");

const models = {
  Product,
  Employee,
  Token,
  EWallet,
  Transaction,
  TransactedVariant,
  Variant,
  Image,
  Category,
  Log,
};

Object.values(models).forEach((model) => {
  model.associate && model.associate(models);
  model.registerEvents && model.registerEvents(models);
});

module.exports = models;
