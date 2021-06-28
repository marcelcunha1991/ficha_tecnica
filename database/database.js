const Sequelize = require("sequelize");

// const conn = new Sequelize('fichatecnica','root','sa123',{
//     host: 'localhost',
//     dialect: 'mysql',
//     port:3306,
//     timezone:"-04:00"
// })

//  const conn = new Sequelize('fichatecnica', 'INJETPTC', 'InJPtC#D@',{
// 	 host: 'sahdamvpsql007',
//      dialect: 'mssql',
// 	 logging:false,
//      dialectOptions:{
// 		 encrypt:true
		
// 	 }
//  });

const conn = new Sequelize('fichatecnicaHonda','postgres','1234',{
   host: 'localhost',   
   dialect: 'postgres',
})
 
 conn.authenticate().then(() => {
 console.log("conexao bem sucedida")}).catch(err => {
	 console.log("Erro: ", err);
 });
 
 /*var Connection = require('tedious').Connection;  

    var config = {  
        server: 'sahdamvpsql007',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'injetptc', //update me
                password: 'InJPtC#D@'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'fichatecnica'  //update me
        }
    };  
    var conn = new Connection(config);  
    conn.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
    });  */
	
	
	

/*const conn = new Sequelize('FICHATECNICA', 'INJETPTC', 'InJPtC#D@', {
    host: '10.146.2.23',
    dialect: 'mssql',
    timezone:"-04:00",
    dialectOptions: {
        options: {
            encrypt: true,
        }
    }
  }); */

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