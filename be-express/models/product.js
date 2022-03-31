const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Model.associate = ({ Employee, Variant, Category, Log }) => {
  Model.hasOne(Category);
  Model.hasOne(Log);
  Model.hasMany(Variant);
  
  Model.belongsTo(Employee);

};

module.exports = Model;
