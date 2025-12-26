// id userId toEmail title body status scheduleAt sentAt

module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define('Emails', {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        userId:{type: DataTypes.INTEGER, allowNull: false}, // sender
        toEmail: { // receiver (@email)
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isEmail: true,
            },
        },
        title: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: { // emails inner text
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: { 
            type: DataTypes.ENUM('pending', 'sent', 'failed'),
            defaultValue: 'pending',
        },
        scheduledAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        sentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },{
        tableName: 'emails'
    });
    return Email
};