const Sequelize = require("sequelize");
const conn = require("../database/database");

const ParametrosMedios = conn.define('parametrosMedios',{

    maquina:{
        type: Sequelize.INTEGER,
        model: 'maquinas', // <<< Note, its table's name, not object name
        key: 'id'
    },   

    prodShotMin: Sequelize.FLOAT,
    prodShotMax: Sequelize.FLOAT,
    cycleTimeMin: Sequelize.FLOAT,
    cycleTimeMax: Sequelize.FLOAT,
    dwellPressureMin: Sequelize.FLOAT,
    dwellPressureMax: Sequelize.FLOAT,
    
    ok_prodShotMin: Sequelize.FLOAT,
    ok_prodShotMax: Sequelize.FLOAT,
    printShotMin: Sequelize.FLOAT,
    printShotMax: Sequelize.FLOAT,
    fillingTimeMin: Sequelize.FLOAT,
    fillingTimeMax: Sequelize.FLOAT,
    chargingTimeMin: Sequelize.FLOAT,
    chargingTimeMax: Sequelize.FLOAT,
    takeoutTimeMin: Sequelize.FLOAT,
    takeoutTimeMax: Sequelize.FLOAT,
    dwellChnagePositionMin: Sequelize.FLOAT,
    dwellChnagePositionMax: Sequelize.FLOAT,
    minumumCushionPositionMin: Sequelize.FLOAT,
    minumumCushionPositionMax: Sequelize.FLOAT,
    cushionPositionMin: Sequelize.FLOAT,
    cushionPositionMax: Sequelize.FLOAT,
    injetStartPositionMin: Sequelize.FLOAT,
    injetStartPositionMax: Sequelize.FLOAT,
    maxInjectPressureMin: Sequelize.FLOAT,
    maxInjectPressureMax: Sequelize.FLOAT,
    screwRotationSpeedMin: Sequelize.FLOAT, 
    screwRotationSpeedMax: Sequelize.FLOAT
    

})


// ParametrosMedios.sync({force: true});


module.exports = ParametrosMedios;