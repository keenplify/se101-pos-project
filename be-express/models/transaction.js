const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("transactions", {
  remarks: {
    type: DataTypes.STRING,
  },
  total_price: {
    type: DataTypes.DOUBLE,
  },
  state: {
    type: DataTypes.ENUM(["PROCESSING", "PAID", "CANCELLED"]),
    allowNull: false,
    defaultValue: "PROCESSING",
  },
  type: {
    type: DataTypes.ENUM(["CASH", "EWALLET"]),
  },
});
Model.associate = ({ TransactedVariant, Employee, EWallet }) => {
  Model.hasMany(TransactedVariant);

  Model.belongsTo(EWallet);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
};

module.exports = Model;
