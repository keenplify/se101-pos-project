const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("tokens", {
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.associate = ({ Employee }) => {
  Model.belongsTo(Employee);
};

Model.registerEvents = (models) => {};

module.exports = Model;
