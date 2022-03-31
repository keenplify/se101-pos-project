const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("logs", {
 
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Model.associate = ({ Employee, Product, Category, Variant, Transaction }) => {
  Model.belongsTo(Employee);
  Model.belongsTo(Product);
  Model.belongsTo(Category);
  Model.belongsTo(Variant);
  Model.belongsTo(Transaction);
};

module.exports = Model;