const Sequelize = require("sequelize");
const conn = require("../database/database");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin",salt);

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
   },
   isAdmin: {
      type: Sequelize.STRING,
      allowNull: true
   },
   justificativa: Sequelize.TEXT,
   usuario: Sequelize.TEXT,
})

// User.sync();

// User.create({
//     nome:"admin",
//     email:"admin@email.com",
//     password:hash,
//     matricula:"00000"        
// })

module.exports = User;