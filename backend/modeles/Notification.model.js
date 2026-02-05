const { DataTypes } = require("pool");
const pool = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\config\db.js");
const User = require ("C:\Users\User\Documents\GitHub\HealthConnect\backend\modeles\User.model.js");
const Notification = pool.define(" Notification",
{
    id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    type: {type: DataTypes.STRING(20)},
    message:{ type: DataTypes.TEXT},
    sent_at:{type: DataTypes.DATE},
    status: {type: DataTypes.STRING(20)}
},
{tableName: "Notification",timestamps: false}
);
Notification.belongsTo(User, { foreignKey: "User_id"});
User.hasMany(Notification,{ foreignKey:"User_id"});
module.exports = Notification;