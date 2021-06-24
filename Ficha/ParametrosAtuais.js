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

    temperature_hen: Sequelize.FLOAT, 
    temperature_hn: Sequelize.FLOAT, 
    temperature_h1: Sequelize.FLOAT, 
    temperature_h2: Sequelize.FLOAT, 
    temperature_h3: Sequelize.FLOAT, 
    temperature_h4: Sequelize.FLOAT, 
    temperature_h5: Sequelize.FLOAT, 
    temperature_oil: Sequelize.FLOAT, 
    temperature_hop: Sequelize.FLOAT, 
   


})

//ParametrosAtuais.sync();

module.exports = ParametrosAtuais;