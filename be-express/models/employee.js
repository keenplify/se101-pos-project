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
    type: DataTypes.ENUM(["ADMIN", "CASHIER"]),
    allowNull: false,
  },
});

Model.associate = ({
  Employee,
  Product,
  Token,
  Image,
  Log,
  Transaction,
  Variant,
  Category,
  EWallet,
}) => {
  Model.hasMany(Employee, { foreignKey: "createdBy" });
  Model.hasMany(Product, { foreignKey: "createdBy" });
  Model.hasMany(Token, { foreignKey: "createdBy" });
  Model.hasMany(Log, { foreignKey: "createdBy" });
  Model.hasMany(Transaction, { foreignKey: "createdBy" });
  Model.hasMany(Variant, { foreignKey: "createdBy" });
  Model.hasMany(Category, { foreignKey: "createdBy" });
  Model.hasMany(EWallet, { foreignKey: "createdBy" });
  Model.hasMany(Image, { foreignKey: "createdBy" });

  Model.belongsTo(Image, { constraints: false, foreignKeyConstraint: false });
  Model.belongsTo(Employee, { foreignKey: "createdBy" });
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
