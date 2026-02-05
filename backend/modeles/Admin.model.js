const { DataTypes } = require("pool");
const pool = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\config\db.js");
const User = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\modeles\User.model.js");
const Admin = pool.define("Admin",
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
},
{tableName: "Admin",timestamps: false}
);
Admin.belongsTo(User, { foreignKey: "User_id"});
module.exports = Admin;