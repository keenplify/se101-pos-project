const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("e-wallets", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      is: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/i, //Regex for 11 digits phone number only
    },
  },
  account_name: {
    type: DataTypes.ENUM(["GCASH", "PAYMAYA"]),
    allowNull: false,
  },
});
Model.associate = ({ Transaction, Employee }) => {
  Model.hasMany(Transaction);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
};

module.exports = Model;
