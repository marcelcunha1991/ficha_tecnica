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
    }
})

// Moldes.sync({force: true});

module.exports = Moldes;