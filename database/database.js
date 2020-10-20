const Sequelize = require("sequelize");

const conn = new Sequelize('fichatecnica','root','sa123',{
    host: 'localhost',
    dialect: 'mysql',
    timezone:"-04:00"
})

module.exports = conn;