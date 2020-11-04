const Sequelize = require("sequelize");

const conn = new Sequelize('fichatecnica','root','sa123',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    timezone:"-04:00"
})


module.exports = conn;