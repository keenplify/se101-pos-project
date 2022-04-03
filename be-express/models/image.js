const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("images", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Variant, Category }) => {
  Model.hasMany(Employee);
  Model.hasMany(Variant);
  Model.hasMany(Category);
};

module.exports = Model;