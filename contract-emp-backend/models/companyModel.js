module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("company", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
    })

    return Company
}