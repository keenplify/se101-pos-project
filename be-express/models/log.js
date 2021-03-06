const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");
const withPagination = require('sequelize-cursor-pagination');

const Model = sequelize.define("logs", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Product, Category, Variant, Transaction }) => {
  Model.belongsTo(Employee, { foreignKey: "createdBy" });
  Model.belongsTo(Product);
  Model.belongsTo(Category);
  Model.belongsTo(Variant);
  Model.belongsTo(Transaction);
};

withPagination({
  methodName: "paginate",
  primaryKeyField: "id"
})(Model)

module.exports = Model;
