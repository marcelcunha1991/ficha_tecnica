const Sequelize = require("sequelize");

const conn = new Sequelize('fichatecnica','root','sa123',{
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    timezone:"-04:00"
})

// const conn = new Sequelize('fichatecnica', 'root', 'sa123', {
//     host: 'localhost',
//     dialect: 'mssql',
//     timezone:"-04:00",
//     dialectOptions: {
//         options: {
//             encrypt: true,
//         }
//     }
//   });

//   var conn = new Sequelize({
//     dialect: 'mssql',
//     dialectModulePath: 'sequelize-msnodesqlv8',
//     dialectOptions: {
//       instanceName: 'MSSQLSERVER01',
//       trustedConnection: true
//     },
//     host: 'localhost',
//     database: 'fichatecnica'
//   });

module.exports = conn;