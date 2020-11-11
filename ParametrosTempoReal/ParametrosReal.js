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
    cycleTimeMax: Sequelize.FLOAT
    

})


// ParametrosMedios.sync({force: true});


module.exports = ParametrosMedios;