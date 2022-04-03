const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("transactions", {
    remarks: {
        type: DataTypes.STRING,
    },
    total_price: {
        type: DataTypes.INTEGER,
    },
    state: {
        type: DataTypes.ENUM(["PROCESSING", "PAID", "CANCELLED"]),
        allowNull: false,
        defaultValue: "PROCESSING"
    },
    type: {
        type: DataTypes.ENUM(["CASH", "EWALLET"]),
        allowNull: false
    },
});
Model.associate = ({ Employee, EWallet }) => {
    Model.belongsTo(EWallet);

    Model.belongsTo(Employee);
  };
  
  module.exports = Model;