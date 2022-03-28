const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee }) => {
  Model.belongsTo(Employee);
};

module.exports = Model;