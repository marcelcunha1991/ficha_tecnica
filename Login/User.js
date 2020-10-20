const Sequelize = require("sequelize");
const conn = require("../database/database");

const User = conn.define('users',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

// User.sync({force: true});

module.exports = User;