const express = require("express");
const app = express();
const conn = require("./database/database");
const bodyparser = require("body-parser");
const session = require("express-session");
const User = require("./Login/User");
const Maquinas = require("./Maquinas/Maquinas");
const Produtos = require("./Produtos/Produtos");
const MateriaPrima = require("./MateriaPrima/MateriasPrimas");
const Moldes = require("./Moldes/Moldes");
const Clientes = require("./Clientes/Clientes");

const FichaTecnicaToshiba = require("./Ficha/FichaTecnicaToshiba");
const FichaTecnicaHaitianJupter = require("./Ficha/FichaTecnicaHaitianJypter");
const LimitesFichaTecnicaToshiba = require("./Ficha/LimitesFichaTecnicaToshiba");
const ParametrosReaisToshiba = require("./ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("./ParametrosTempoReal/ParametrosReaisAutomata");
const ParametrosReaisHaitianJupyter = require("./ParametrosTempoReal/ParametrosReaisHaitianJupyter");
const LimiteParametrosToshiba = require("./ParametrosTempoReal/LimiteParametrosToshiba");
const LimiteParametrosAutomata = require("./ParametrosTempoReal/LimiteParametrosAutomata");
const LimiteParametrosHaitianJupyter = require("./ParametrosTempoReal/LimiteParametrosHaitianJupyter");
const Tipo = require("./Tipo/Tipo");
const Alertas = require("./Alertas/Alertas");
const AlertasAbertos = require("./Alertas/AlertasAbertos");

const cron = require("node-cron");
var nodemailer = require('nodemailer');
const userController = require("./Login/LoginController");
const alertasController = require("./Alertas/AlertasController");
const maquinasController = require("./Maquinas/MaquinasController");
const produtosConctroller = require("./Produtos/ProdutosController");
const materiaPrimaConctroller = require("./MateriaPrima/MateriaPrimaController");
const moldesConctroller = require("./Moldes/MoldesController");
const clientesConctroller = require("./Clientes/ClientesController");
const fichasConctroller = require("./Ficha/FichaController");
const tiposConctroller = require("./Tipo/TipoController");
const ParametrosRealController = require("./ParametrosTempoReal/ParametrosRealController");

const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin",salt);


//view engine
app.set('view engine','ejs');

//Session
app.use(session({
        secret: "qualquercoisa",
        cookie:{
            maxAge: 30000
        }  
}))

//body parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());


//static
app.use(express.static('public'));

// Controllers
app.use("/",userController);
app.use("/",maquinasController);
app.use("/",produtosConctroller);
app.use("/",materiaPrimaConctroller);
app.use("/",moldesConctroller);
app.use("/",clientesConctroller);
app.use("/",fichasConctroller);
app.use("/",ParametrosRealController);
app.use("/",tiposConctroller);
app.use("/",alertasController);



//database
conn
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco bem sucedida");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/",(req,res) =>{
    res.render("login/index")
})

app.get("/",(req,res) =>{
    res.render("login/index")
})


//Cria Tabelas
//     Tipo.sync();
//     Maquinas.sync();
//     User.sync();
//     Produtos.sync();
//     MateriaPrima.sync();
//     Moldes.sync();
//     Clientes.sync();
//     FichaTecnicaToshiba.sync();
//     FichaTecnicaHaitianJupter.sync();
//     LimitesFichaTecnicaToshiba.sync();
//     ParametrosReaisToshiba.sync();   
//     ParametrosReaisAutomata.sync();     
//     ParametrosReaisHaitianJupyter.sync(); 
//     LimiteParametrosToshiba.sync();
//     LimiteParametrosAutomata.sync();
//     Alertas.sync();
//     AlertasAbertos.sync();
//     LimiteParametrosHaitianJupyter.sync();


//     User.create({
//     nome:"admin",
//     email:"admin@email.com",
//     password:hash,
//     matricula:"00000"        
// })

//     Tipo.create({
//         tipo:"Toshiba"
//     });
//     Tipo.create({
//         tipo:"Automata OPTIN"
//     })
//     Tipo.create({
//         tipo:"Haitian Jupyter"
//     })
   
    

    
    
app.listen(3000,"0.0.0.0",() => {
    console.log("Servidor Rodando");
})

