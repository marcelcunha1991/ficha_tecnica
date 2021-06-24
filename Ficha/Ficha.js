const Sequelize = require("sequelize");
const conn = require("../database/database");
const Clientes = require("../Clientes/Clientes");
const Moldes = require("../Moldes/Moldes");
const Maquinas = require("../Maquinas/Maquinas");
const Produtos = require("../Produtos/Produtos");
const MateriaPrima = require("../MateriaPrima/MateriasPrimas");

const Ficha = conn.define('ficha',{
    
    maquina:Sequelize.STRING,   
    VI1_min: Sequelize.FLOAT,
    VI1_max: Sequelize.FLOAT,
    VI2_min: Sequelize.FLOAT,
    VI2_max: Sequelize.FLOAT,
    VI3_min: Sequelize.FLOAT,
    VI3_max: Sequelize.FLOAT,
    VI4_min: Sequelize.FLOAT,
    VI4_max: Sequelize.FLOAT,
    VI5_min: Sequelize.FLOAT,
    VI5_max: Sequelize.FLOAT,
    VI6_min: Sequelize.FLOAT,
    VI6_max: Sequelize.FLOAT,
    VI7_min: Sequelize.FLOAT,
    VI7_max: Sequelize.FLOAT,
    VI8_min: Sequelize.FLOAT,
    VI8_max: Sequelize.FLOAT,
    VI9_min: Sequelize.FLOAT,
    VI9_max: Sequelize.FLOAT,
    VI10_min: Sequelize.FLOAT,
    VI10_max: Sequelize.FLOAT,
    VH1_min: Sequelize.FLOAT,
    VH1_max: Sequelize.FLOAT,
    VH2_min: Sequelize.FLOAT,
    VH2_max: Sequelize.FLOAT,
    PI1_min: Sequelize.FLOAT,
    PI1_max: Sequelize.FLOAT,
    LS4_min: Sequelize.FLOAT,
    LS4_max: Sequelize.FLOAT,
    LS4A_min: Sequelize.FLOAT,
    LS4A_max: Sequelize.FLOAT,
    codigo: Sequelize.STRING,
    modelo: Sequelize.STRING,
    revisao: Sequelize.INTEGER
})


//Ficha.sync();

module.exports = Ficha;