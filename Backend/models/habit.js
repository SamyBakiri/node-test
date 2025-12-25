module.exports = (sequelize, DataTypes) => {
    const Habit = sequelize.define('Habit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'habits',
        timestamps: false
    });

    Habit.associate = (models) => {
        Habit.belongsTo(models.User, {
            foreignKey: 'userid'
        });
    };

    return Habit;
};