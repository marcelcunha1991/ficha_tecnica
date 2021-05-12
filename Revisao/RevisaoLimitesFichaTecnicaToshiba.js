const Sequelize = require("sequelize");
const conn = require("../database/database");
const Clientes = require("../Clientes/Clientes");
const Moldes = require("../Moldes/Moldes");
const Maquinas = require("../Maquinas/Maquinas");
const Produtos = require("../Produtos/Produtos");
const MateriaPrima = require("../MateriaPrima/MateriasPrimas");
const Ficha = require("../Ficha/LimitesFichaTecnicaToshiba");

const RevisaoLimitesFichaTecnicaToshiba = conn.define('revisao_limites_ficha_tecnica_toshiba',{
   revisao: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   idFichaTecnica:{
      type: Sequelize.INTEGER,
      model: 'limites_ficha_tecnica_toshiba', // <<< Note, its table's name, not object name
      key: 'id'
   },
   maq:{
      type: Sequelize.INTEGER,
      model: 'maquinas', // <<< Note, its table's name, not object name
      key: 'id'
   },   
   VI1_min: {type: Sequelize.FLOAT, allowNull: true},
   VI1_max: {type: Sequelize.FLOAT, allowNull: true},
   VI2_min: {type: Sequelize.FLOAT, allowNull: true},
   VI2_max: {type: Sequelize.FLOAT, allowNull: true},
   VI3_min: {type: Sequelize.FLOAT, allowNull: true},
   VI3_max: {type: Sequelize.FLOAT, allowNull: true},
   VI4_min: {type: Sequelize.FLOAT, allowNull: true},
   VI4_max: {type: Sequelize.FLOAT, allowNull: true},
   VI5_min: {type: Sequelize.FLOAT, allowNull: true},
   VI5_max: {type: Sequelize.FLOAT, allowNull: true},
   VI6_min: {type: Sequelize.FLOAT, allowNull: true},
   VI6_max: {type: Sequelize.FLOAT, allowNull: true},
   VI7_min: {type: Sequelize.FLOAT, allowNull: true},
   VI7_max: {type: Sequelize.FLOAT, allowNull: true},
   VI8_min: {type: Sequelize.FLOAT, allowNull: true},
   VI8_max: {type: Sequelize.FLOAT, allowNull: true},
   VI9_min: {type: Sequelize.FLOAT, allowNull: true},
   VI9_max: {type: Sequelize.FLOAT, allowNull: true},
   VI10_min: {type: Sequelize.FLOAT, allowNull: true},
   VI10_max: {type: Sequelize.FLOAT, allowNull: true},
   VH1_min: {type: Sequelize.FLOAT, allowNull: true},
   VH1_max: {type: Sequelize.FLOAT, allowNull: true},
   VH2_min: {type: Sequelize.FLOAT, allowNull: true},
   VH2_max: {type: Sequelize.FLOAT, allowNull: true},
   PI1_min: {type: Sequelize.FLOAT, allowNull: true},
   PI1_max: {type: Sequelize.FLOAT, allowNull: true},
   LS4_min: {type: Sequelize.FLOAT, allowNull: true},
   LS4_max: {type: Sequelize.FLOAT, allowNull: true},
   LS4A_min: {type: Sequelize.FLOAT, allowNull: true},
   LS4A_max: {type: Sequelize.FLOAT, allowNull: true},
   codigo: Sequelize.STRING,
   modelo: Sequelize.STRING
})

Clientes.hasMany(RevisaoLimitesFichaTecnicaToshiba);
Moldes.hasMany(RevisaoLimitesFichaTecnicaToshiba);
Maquinas.hasMany(RevisaoLimitesFichaTecnicaToshiba);
Produtos.hasMany(RevisaoLimitesFichaTecnicaToshiba);
MateriaPrima.hasMany(RevisaoLimitesFichaTecnicaToshiba);


// Ficha.sync();

module.exports = RevisaoLimitesFichaTecnicaToshiba;