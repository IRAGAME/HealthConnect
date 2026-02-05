const { DataTypes } = require("pool");
const pool = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\config\db.js");
const User = pool.define("User",
{
id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true },
nom: {type: DataTypes.STRING(100), allowNull: false },
email: {type: DataTypes.STRING(100), allowNull: false, unique: true },
motdepasse: {type: DataTypes.STRING(255), allowNull: false },
role: {type: DataTypes.STRING(20), allowNull: false }
},
 {tableName: "User",timestamps: false}
);
module.exports = User;