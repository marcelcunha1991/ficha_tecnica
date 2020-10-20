const Sequelize = require("sequelize");
const conn = require("../database/database");
const Clientes = require("../Clientes/Clientes");
const Moldes = require("../Moldes/Moldes");
const Maquinas = require("../Maquinas/Maquinas");
const Produtos = require("../Produtos/Produtos");
const MateriaPrima = require("../MateriaPrima/MateriasPrimas");

const Ficha = conn.define('ficha',{
    cliente:{
        type: Sequelize.INTEGER,
        model: 'clientes', // <<< Note, its table's name, not object name
        key: 'id'
    },
    produto:{
        type: Sequelize.INTEGER,
        model: 'produtos', // <<< Note, its table's name, not object name
        key: 'id'
    },
    maquina:{
        type: Sequelize.INTEGER,
        model: 'maquinas', // <<< Note, its table's name, not object name
        key: 'id'
    },
    materiaprima:{
        type: Sequelize.INTEGER,
        model: 'materiaprimas', // <<< Note, its table's name, not object name
        key: 'id'
    },
    molde:{
        type: Sequelize.INTEGER,
        model: 'moldes', // <<< Note, its table's name, not object name
        key: 'id'
    },
    codigo: Sequelize.STRING,
    modelo: Sequelize.STRING,
    revisao: Sequelize.INTEGER
})

Clientes.hasMany(Ficha);
Moldes.hasMany(Ficha);
Maquinas.hasMany(Ficha);
Produtos.hasMany(Ficha);
MateriaPrima.hasMany(Ficha);

// Ficha.sync({force: true});

module.exports = Ficha;