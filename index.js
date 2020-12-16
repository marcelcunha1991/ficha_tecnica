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
const Fichas = require("./Ficha/Ficha");
const ParametrosTecnicos = require("./Ficha/Parametros");
const ParametrosReal = require("./ParametrosTempoReal/ParametrosReal");
const ParametrosAtuais = require("./Ficha/ParametrosAtuais");
const cron = require("node-cron");
var nodemailer = require('nodemailer');
const userController = require("./Login/LoginController");
const maquinasController = require("./Maquinas/MaquinasController");
const produtosConctroller = require("./Produtos/ProdutosController");
const materiaPrimaConctroller = require("./MateriaPrima/MateriaPrimaController");
const moldesConctroller = require("./Moldes/MoldesController");
const clientesConctroller = require("./Clientes/ClientesController");
const fichasConctroller = require("./Ficha/FichaController");
const ParametrosRealController = require("./ParametrosTempoReal/ParametrosRealController");


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




// cron.schedule("*/5 * * * *", () => {


//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'marcel.silva1991@gmail.com',
//           pass: 'Marcel21003839'
//         }
//       });


//     var mailOptions = {
//         from: 'marcel.silva1991@gmail.com',
//         to: 'marcel.silva1991@gmail.com',
//         subject: 'Variação fora do esperado',
//         text: 'That was easy!'
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// });

app.listen(3000,'192.168.0.3',() => {
    console.log("Servidor Rodando");
})


// app.listen(3000,'192.168.0.17',() => {
//     console.log("Servidor Rodando");
// })


// app.listen(3000,'localhost',() => {
//         console.log("Servidor Rodando");
//     })