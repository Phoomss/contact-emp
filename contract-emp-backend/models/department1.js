module.exports = (sequelize, DataTypes) => {
    const Department1 = sequelize.define("department1", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department2_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        department3_id: {
            type: DataTypes.INTEGER,
            allowNull: true 
        },
    })

    return Department1
}