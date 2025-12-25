const { DataTypes } =require('sequelize');
const sequelize = require('../config/db');

const Habit = sequelize.define('Habit', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{type: DataTypes.STRING,
    allowNull: true
},

},{
    tableName: 'habits',
    timestamps: false
});

Habit.associate = (models) => {
    Habit.belongsTo(models.User, {
        foreignKey: 'id'
    })
}
module.exports = Habit;