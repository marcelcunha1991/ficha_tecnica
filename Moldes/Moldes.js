const Sequelize = require("sequelize");
const conn = require("../database/database");

const Moldes = conn.define('moldes',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    justificativa: Sequelize.TEXT,
    usuario: Sequelize.TEXT,
})

// Moldes.sync();

module.exports = Moldes;