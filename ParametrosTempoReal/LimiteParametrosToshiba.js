const Sequelize = require("sequelize");
const conn = require("../database/database");

const ParametrosMedios = conn.define('limite_parametros_reais_toshiba',{

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
    screwRotationSpeedMax: Sequelize.FLOAT,

    temperature_henMin: Sequelize.FLOAT, 
    temperature_henMax: Sequelize.FLOAT,
    temperature_hnMin: Sequelize.FLOAT, 
    temperature_hnMax: Sequelize.FLOAT,
    temperature_h1Min: Sequelize.FLOAT, 
    temperature_h1Max: Sequelize.FLOAT,
    temperature_h2Min: Sequelize.FLOAT, 
    temperature_h2Max: Sequelize.FLOAT,
    temperature_h3Min: Sequelize.FLOAT, 
    temperature_h3Max: Sequelize.FLOAT,
    temperature_h4Min: Sequelize.FLOAT, 
    temperature_h4Max: Sequelize.FLOAT,
    temperature_h5Min: Sequelize.FLOAT, 
    temperature_h5Max: Sequelize.FLOAT,
    temperature_oilMin: Sequelize.FLOAT, 
    temperature_oilMax: Sequelize.FLOAT,
    temperature_hopMin: Sequelize.FLOAT, 
    temperature_hopMax: Sequelize.FLOAT,
    

})


// ParametrosMedios.sync();


module.exports = ParametrosMedios;