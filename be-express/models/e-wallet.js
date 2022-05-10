const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("e-wallets", {
  type: {
    type: DataTypes.ENUM(["GCASH", "PAYMAYA"]),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Model.associate = ({ Transaction, Employee }) => {
  Model.hasMany(Transaction);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
};

module.exports = Model;
