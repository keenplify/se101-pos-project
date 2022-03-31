const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("e-wallets", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
Model.associate = ({ Employee }) => {
    Model.belongsTo(Employee);
  };
  
  module.exports = Model;
  
