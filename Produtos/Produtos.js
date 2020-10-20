const Sequelize = require("sequelize");
const conn = require("../database/database");

const Produtos = conn.define('produtos',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Produtos.sync({force: true});

module.exports = Produtos;