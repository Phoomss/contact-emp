module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true
        },
        role: {
            type: DataTypes.ENUM('admin','card','company'),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })

    return User
}