const dbconfig = require('../config/dbconfig.js')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        port: dbconfig.PORT,
        dialect: dbconfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle
        }
    }
        
)

sequelize.authenticate()
.then(() => {
    console.log('connected...')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.archive = require('./archiveModel')(sequelize, DataTypes)
db.company = require('./companyModel')(sequelize, DataTypes)
db.contract = require('./contractModel')(sequelize, DataTypes)
db.employee = require('./employeeModel')(sequelize, DataTypes)
db.department1 = require('./department1.js')(sequelize, DataTypes)
db.department2 = require('./department2.js')(sequelize, DataTypes)
db.department3 = require('./department3.js')(sequelize, DataTypes)
db.user = require('./userModel')(sequelize, DataTypes)

db.company.hasMany(db.contract, { foreignKey: "company_id", as:"contract" })
db.contract.belongsTo(db.company, {foreignKey: "company_id", as: "company"})
db.company.hasMany(db.user, {foreignKey: "company_id", as:"users" })
db.user.belongsTo(db.company, {foreignKey: "company_id", as:"company" })

// สร้างความสัมพันธ์ระหว่างแผนกกับฝ่าย
db.department1.hasMany(db.department2, { foreignKey: 'department1_id', as: 'department2' });
db.department2.belongsTo(db.department1, { foreignKey: 'department1_id', as: 'department1' });

// สร้างความสัมพันธ์ระหว่างฝ่ายกับกอง
db.department2.hasMany(db.department3, { foreignKey: 'department2_id', as: 'department3' });
db.department3.belongsTo(db.department2, { foreignKey: 'department2_id', as: 'department2' });

// db.department1.hasMany(db.department3, { foreignKey: 'department1_id', as: 'department3' });
// db.department3.belongsTo(db.department1, { foreignKey: 'department1_id', as: 'department1' });


db.employee.belongsToMany(db.contract, { through: db.archive, foreignKey: 'employee_id' });
db.contract.belongsToMany(db.employee, { through: db.archive, foreignKey: 'contract_id' });
db.archive.belongsTo(db.employee, { foreignKey: 'employee_id' });
db.archive.belongsTo(db.contract, { foreignKey: 'contract_id' });


db.sequelize.sync({force: false})
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db