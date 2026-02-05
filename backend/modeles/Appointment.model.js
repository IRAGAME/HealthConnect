const { DataTypes } = require("pool");
const pool = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\config\db.js");
const User = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\modeles\User\User.model.js");
const Docteur = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\modeles\Docteur.model.js");
const Appointment = pool.define("Appointment",
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    date:{ type: DataTypes.DATE,allowNull: false},
    status: {type: DataTypes.STRING(20),defaultvalue: "En attente"}
},
{tableName: "Appointment",timestamps: false}
);
Appointment.belongsTo(User, { foreignKey:"patient_id"});
Appointment.belongsTo(Docteur, { foreignKey:"docteur_id"});
module.exports = Appointment;