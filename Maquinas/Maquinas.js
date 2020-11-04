const Sequelize = require("sequelize");
const conn = require("../database/database");

const Maquinas = conn.define('maquinas',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mac: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    peso: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Maquinas.sync({force: true});

module.exports = Maquinas;