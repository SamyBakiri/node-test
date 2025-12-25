const { DataTypes } =require('sequelize');
const sequelize = require('../config/db');

const habit = sequelize.define('habit', {
    name:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull: true},

},{
    tableName: 'habits',
    timestamps: false
});
module.exports = habit;