const { Sequelize } = require("sequelize");
const sequelize = require("../libraries/sequelize");
const { hashSync } = require("bcrypt");

const Employee = require("./employee");
const Product = require("./product");
const Token = require("./token");
const Variant = require ("./variant");
const Image = require ("./image")

const models = {
  Product,
  Employee,
  Token,
  Variant,
  Image,
};

Object.values(models).forEach((model) => {
  model.associate && model.associate(models);
  model.registerEvents && model.registerEvents(models);
});

// Create genesis admin (Admin #1) after 2.5 seconds
setTimeout(() => {
  Employee.findOrCreate({
    where: {
      id: 1,
    },
    defaults: {
      firstName: "Genesis",
      lastName: "Admin",
      password: hashSync("admin", 10),
      type: "Admin",
      employeeId: 1,
    },
  })
    .then(() => console.log("Genesis admin sucessfully created."))
    .catch((err) => {
      console.log(err);
    });
}, 2500);

module.exports = models;
