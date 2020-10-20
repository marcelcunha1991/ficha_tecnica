const Sequelize = require("sequelize");
const conn = require("../database/database");

const Clientes = conn.define('clientes',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

// Clientes.sync({force: true});

module.exports = Clientes;