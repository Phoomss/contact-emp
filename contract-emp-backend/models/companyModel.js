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
            type: DataTypes.STRING(20),
            allowNull: false
        },
        old_company_id:{
          type: DataTypes.STRING(10),
          allowNull:true
        }
    })

    return Company
}