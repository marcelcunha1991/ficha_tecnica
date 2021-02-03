const Sequelize = require("sequelize");
const conn = require("../database/database");
const Alerta = require("./Alertas");
const Maquina = require("../Maquinas/Maquinas");

const AlertasAbertos = conn.define('alertasAbertosAutomata',{
    status:{
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
});


AlertasAbertos.belongsTo(Alerta);
AlertasAbertos.belongsTo(Maquina);


module.exports = AlertasAbertos;