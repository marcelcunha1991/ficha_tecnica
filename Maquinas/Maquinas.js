const Sequelize = require("sequelize");
const conn = require("../database/database");
const Tipo = require("../Tipo/Tipo")

var Maquinas = conn.define('maquinas',{
   descricao:{
      type: Sequelize.STRING,
      allowNull: false
   },
   numeroMaquina:{
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
   },
   justificativa: Sequelize.TEXT,
   usuario: Sequelize.TEXT,
    
})

Maquinas.belongsTo(Tipo)

module.exports = Maquinas;