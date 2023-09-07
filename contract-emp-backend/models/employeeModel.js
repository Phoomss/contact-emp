module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        e_num: {
            type: DataTypes.STRING,
            allowNull: true
        },
        e_Idcard: {
            type: DataTypes.STRING(13),
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createby: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    return Employee
}