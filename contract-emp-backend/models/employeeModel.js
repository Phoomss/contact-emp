module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employee", {
        title:{
            type: DataTypes.ENUM('นาย','นาง','นางสาว','น.ส.','Mr.','Mrs.','Ms.'),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        e_num: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        e_Idcard: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        org_telephone: {
            type: DataTypes.STRING(20),
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