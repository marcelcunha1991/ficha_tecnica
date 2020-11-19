const Sequelize = require("sequelize");
const conn = require("../database/database");


const ParametrosAtuais = conn.define('parametrosAtuais',{

    mac: Sequelize.STRING,
    prodShot: Sequelize.FLOAT,
    dwellPressure: Sequelize.FLOAT,
    cycleTime: Sequelize.FLOAT,
   


})

// ParametrosAtuais.sync({force: true});

module.exports = ParametrosAtuais;