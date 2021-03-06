const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("variants", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
});

Model.associate = ({ Employee, Product, Image, TransactedVariant }) => {
  Model.belongsTo(Employee, { foreignKey: "createdBy" });
  Model.belongsTo(Product);
  Model.belongsTo(Image);

  Model.hasMany(TransactedVariant);
};

module.exports = Model;
