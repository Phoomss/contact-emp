module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define("archive", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        contract_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })

    return Archive
}