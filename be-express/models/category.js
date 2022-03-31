const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("categories", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Model.associate = ({ Employee, Product, Log }) => {
  Model.belongsTo(Employee);
  Model.belongsTo(Product);
  Model.hasOne(Log);

};

module.exports = Model;