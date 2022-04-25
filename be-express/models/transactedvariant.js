const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("transactedvariants", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Transaction, Variant }) => {
  Model.belongsTo(Employee, { foreignKey: "createdBy" });
  Model.belongsTo(Transaction);
  Model.belongsTo(Variant);
};

module.exports = Model;
