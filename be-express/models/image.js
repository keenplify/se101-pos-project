const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("images", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Variant, Category }) => {
  Model.hasMany(Employee, { constraints: false, foreignKeyConstraint: false });
  Model.hasMany(Variant);
  Model.hasMany(Category);

  Model.belongsTo(Employee, { foreignKey: "createdBy" });
};

module.exports = Model;
