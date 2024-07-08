"use strict";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employees", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    positionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  // Define associations
  Employee.hasMany(Employee, { foreignKey: "parentId", as: "children" });
  Employee.belongsTo(Employee, { foreignKey: "parentId", as: "parent" });

  return Employee;
};
