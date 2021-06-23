const Sequelize = require("sequelize");
const conn = require("../database/database");
const Tipo = require("../Tipo/Tipo");

const Alertas = conn.define('alertasAutomata',{
    codigo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    justificativa: Sequelize.TEXT,
    usuario: Sequelize.TEXT,
    
})

Alertas.belongsTo(Tipo);
// Clientes.sync({force: true});

module.exports = Alertas;