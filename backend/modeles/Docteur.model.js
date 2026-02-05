const { DataTypes } = require("pool");
const pool = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\config\db.js");
const User = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\modeles\User.model.js");
const Docteur = pool.define("Docteur", 
{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    specialite: { type: DataType.STRING(100), allowNull: false },
    avaliability: { type: DataTypes.STRING(100)}
}, 
{tableName: "Docteur",timestamps: false}
);
Doctor.belongsTo(User, { foreignkey: "User_id"});
module.exports = Docteur;