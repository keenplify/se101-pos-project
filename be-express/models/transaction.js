const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("transactions", {
    remarks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
    },
});
Model.associate = ({ Employee }) => {
    Model.belongsTo(Employee);
  };
  
  module.exports = Model;