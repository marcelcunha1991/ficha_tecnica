const Sequelize = require("sequelize");
const conn = require("../database/database");

const MateriasPrimas = conn.define('materiaprima',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//MateriasPrimas.sync();

module.exports = MateriasPrimas;