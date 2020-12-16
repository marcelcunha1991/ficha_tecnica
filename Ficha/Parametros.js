const Sequelize = require("sequelize");
const conn = require("../database/database");


const Parametros = conn.define('parametros',{

    mac: Sequelize.STRING,
    VI1: Sequelize.FLOAT,
    VI2: Sequelize.FLOAT,
    VI3: Sequelize.FLOAT,
    VI4: Sequelize.FLOAT,
    VI5: Sequelize.FLOAT,
    VI6: Sequelize.FLOAT,
    VI7: Sequelize.FLOAT,
    VI8: Sequelize.FLOAT,
    VI9: Sequelize.FLOAT,
    VI10: Sequelize.FLOAT,
    VH1: Sequelize.FLOAT,
    VH2: Sequelize.FLOAT,
    PI1: Sequelize.FLOAT,
    LS4: Sequelize.FLOAT,
    LS4A: Sequelize.FLOAT,

})


Parametros.sync();


module.exports = Parametros;