module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define("archive", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,   
        },
        contract_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        org_id: {
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