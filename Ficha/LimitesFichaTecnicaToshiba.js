const Sequelize = require("sequelize");
const conn = require("../database/database");
const Clientes = require("../Clientes/Clientes");
const Moldes = require("../Moldes/Moldes");
const Maquinas = require("../Maquinas/Maquinas");
const Produtos = require("../Produtos/Produtos");
const MateriaPrima = require("../MateriaPrima/MateriasPrimas");

const Ficha = conn.define('limites_ficha_tecnica_toshiba',{
    
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
    codigo: {type: Sequelize.STRING, allowNull: true},
    modelo: {type: Sequelize.STRING, allowNull: true},
    revisao: {type: Sequelize.INTEGER, allowNull: true}
})

Clientes.hasMany(Ficha);
Moldes.hasMany(Ficha);
Maquinas.hasMany(Ficha);
Produtos.hasMany(Ficha);
MateriaPrima.hasMany(Ficha);

// Ficha.sync();

module.exports = Ficha;