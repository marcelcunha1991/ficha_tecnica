const Sequelize = require("sequelize");
const conn = require("../database/database");


const ParametrosAtuais = conn.define('parametrosAtuais',{

    mac: Sequelize.STRING,
    prodShot: Sequelize.FLOAT,
    dwellPressure: Sequelize.FLOAT,
    cycleTime: Sequelize.FLOAT,
    ok_prodShot: Sequelize.FLOAT,
    printShot: Sequelize.FLOAT,
    fillingTime: Sequelize.FLOAT,
    chargingTime: Sequelize.FLOAT,
    takeoutTime: Sequelize.FLOAT,
    dwellChnagePosition: Sequelize.FLOAT,
    minumumCushionPosition: Sequelize.FLOAT,
    cushionPosition: Sequelize.FLOAT,
    injetStartPosition: Sequelize.FLOAT,
    maxInjectPressure: Sequelize.FLOAT,
    screwRotationSpeed: Sequelize.FLOAT, 
   


})

// ParametrosAtuais.sync({force: true});

module.exports = ParametrosAtuais;