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
  },
});

Model.associate = ({ Employee, Product, Log, Image }) => {
  Model.hasOne(Log);
  Model.hasMany(Product);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
  Model.belongsTo(Image);
};

module.exports = Model;
