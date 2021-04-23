const Sequelize = require("sequelize");
const conn = require("../database/database");

const Tipo = conn.define('tipos',{

    tipo:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },


})


// Tipo.sync();

module.exports = Tipo;

    