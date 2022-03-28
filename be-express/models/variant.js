const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("variants", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  }
});

Model.associate = ({ Employee, Product, Image, TransactedVariant }) => {
  Model.belongsTo(Employee);
  Model.belongsTo(Product);
  Model.hasOne(Image);
  Model.hasMany(TransactedVariant);
};

module.exports = Model;