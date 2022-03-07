const { DataTypes } = require("sequelize");
const sequelize = require("../libraries/sequelize");

const Model = sequelize.define("employees", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(["Admin", "Cashier"]),
    allowNull: false,
  },
});

Model.associate = ({ Employee, Product, Token }) => {
  Model.hasMany(Employee);
  Model.hasMany(Product);
  Model.hasMany(Token);

  Model.belongsTo(Employee);
};

Model.registerEvents = ({ Token }) => {
  Model.beforeDestroy(async (employee) => {
    const tokens = await Token.findAll({
      where: {
        employeeId: employee.id,
      },
    });
    tokens.foreach((token) => token.destroy());
  });
};

module.exports = Model;
