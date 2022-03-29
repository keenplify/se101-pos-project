const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("logs", {
 
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Model.associate = ({ Employee, Product, Categories, Variants, Transaction }) => {
  Model.belongsTo(Employee);
  Model.belongsTo(Product);
  Model.belongsTo(Categories);
  Model.belongsTo(Variants);
  Model.belongsTo(Transaction);
};

module.exports = Model;