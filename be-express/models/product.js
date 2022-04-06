const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Variant, Category, Log }) => {
  Model.hasOne(Log);
  Model.hasMany(Variant);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
  Model.belongsTo(Category);
};

module.exports = Model;
