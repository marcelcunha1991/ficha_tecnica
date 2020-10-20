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


const userController = require("./Login/LoginController");
const maquinasController = require("./Maquinas/MaquinasController");
const produtosConctroller = require("./Produtos/ProdutosController");
const materiaPrimaConctroller = require("./MateriaPrima/MateriaPrimaController");
const moldesConctroller = require("./Moldes/MoldesController");
const clientesConctroller = require("./Clientes/ClientesController");
const fichasConctroller = require("./Ficha/FichaController");


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






app.listen(3000,() => {
    console.log("Servidor Rodando");
})