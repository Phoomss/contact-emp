module.exports = (sequelize, DataTypes) => {
    const Department2 = sequelize.define("department2", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department3_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })

    return Department2
}