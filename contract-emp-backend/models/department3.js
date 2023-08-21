module.exports = (sequelize, DataTypes) => {
    const Department3 = sequelize.define("department3", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Department3
}