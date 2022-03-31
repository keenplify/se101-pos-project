const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("images", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee, Variant }) => {
  Model.belongsTo(Employee);
  Model.belongsTo(Variant);
};

module.exports = Model;