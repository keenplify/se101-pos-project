const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("transactedvariants", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  Model.associate = ({ Employee }) => {
    Model.belongsTo(Employee);
  };
  
  module.exports = Model;