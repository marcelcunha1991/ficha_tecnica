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
const LimitesFichaTecnicaToshiba = require("./Ficha/LimitesFichaTecnicaToshiba");
const ParametrosReaisToshiba = require("./ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("./ParametrosTempoReal/ParametrosReaisAutomata");
const ParametrosReaisHaitianJupyter = require("./ParametrosTempoReal/ParametrosReaisHaitianJupyter");
const LimiteParametrosToshiba = require("./ParametrosTempoReal/LimiteParametrosToshiba");
const LimiteParametrosAutomata = require("./ParametrosTempoReal/LimiteParametrosAutomata");
const Tipo = require("./Tipo/Tipo");
const Alertas = require("./Alertas/Alertas");
const AlertasAbertos = require("./Alertas/AlertasAbertos");
const FichaPastorePerifericos = require("./Ficha/FichaPastore/FichaTecnicaPastorePerifericos");
const FichaPastoreInjetores = require("./Ficha/FichaPastore/FichaTecnicaPastoreInjetores");
const RevisaoLimitesFichaTecnicaToshiba = require("./Revisao/RevisaoLimitesFichaTecnicaToshiba");
const RevisaoFichaTecnicaPastoreInjetores = require("./Revisao/RevisaoFichaTecnicaPastoreInjetores");
const RevisaoFichaTecnicaPastorePerifericos = require("./Revisao/RevisaoFichaTecnicaPastorePerifericos");

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
const revisaoController = require("./Revisao/RevisaoController");
const acessoVfWebController = require("./Acesso_Vf_Web/Acesso_Vf_WebController");
const WmController = require("./Wm/WmController");

const bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin",salt);

var listParametros = ["TEMPERATURA_ZONA_1",
"TEMPERATURA_ZONA_2",
"TEMPERATURA_ZONA_3",
"TEMPERATURA_ZONA_4",
"TEMPERATURA_ZONA_5",
"TEMPERATURA_ZONA_6",
"TEMPERATURA_ZONA_7",
"TEMPERATURA_BICO",
"PRESSAO_INJEC_MAX",
"PROTEC_MOLDE_MAX",
"FORCA_FECHAMENTO",
"TEMPO_INJEC_REAL",
"TEMPO_RECALQUE",
"TEMPO_ABERTURA_PLACA_MOVEL",
"TEMPO_FECHAMENTO_PLACA_MOVEL",
"TEMPO_EXTRACAO",
"TEMPO_DOSAGEM",
"TEMPO_RESFRIAMENTO",
"TEMPO_CICLO",
"VELOCIDADE_INJECAO_1",
"VELOCIDADE_INJECAO_1_mm",
"VELOCIDADE_INJECAO_2",
"VELOCIDADE_INJECAO_2_mm",
"VELOCIDADE_INJECAO_3 ",
"VELOCIDADE_INJECAO_3_mm",
"VELOCIDADE_INJECAO_4",
"VELOCIDADE_INJECAO_4_mm",
"VELOCIDADE_INJECAO_5",
"VELOCIDADE_INJECAO_5_mm",
"VELOCIDADE_INJECAO_6",
"VELOCIDADE_INJECAO_6_mm",
"VELOCIDADE_INJECAO_7",
"VELOCIDADE_INJECAO_7_mm",
"VELOCIDADE_INJECAO_8",
"VELOCIDADE_INJECAO_8_mm",
"VELOCIDADE_INJECAO_9",
"VELOCIDADE_INJECAO_9_mm",
"VELOCIDADE_INJECAO_10",
"VELOCIDADE_INJECAO_10_mm",
"RECALQUE_PRESSAO_1",
"RECALQUE_TEMPO_1",
"RECALQUE_FLUXO_1",
"RECALQUE_PRESSAO_2",
"RECALQUE_TEMPO_2",
"RECALQUE_FLUXO_2",
"RECALQUE_PRESSAO_3",
"RECALQUE_TEMPO_3",
"RECALQUE_FLUXO_3",
"RECALQUE_PRESSAO_4",
"RECALQUE_TEMPO_4",
"RECALQUE_FLUXO_4",
"RECALQUE_PRESSAO_5",
"RECALQUE_TEMPO_5",
"RECALQUE_FLUXO_5",
"VALVE_GATE_DELAY_TIME_1",
"VALVE_GATE_DELAY_TIME_2",
"VALVE_GATE_DELAY_TIME_3",
"VALVE_GATE_DELAY_TIME_4",
"VALVE_GATE_DELAY_TIME_5",
"VALVE_GATE_ACTIVE_TIME_1",
"VALVE_GATE_ACTIVE_TIME_2",
"VALVE_GATE_ACTIVE_TIME_3",
"VALVE_GATE_ACTIVE_TIME_4",
"VALVE_GATE_ACTIVE_TIME_5",
"SQ_RETARDO_11",
"CAMARA_QUENTE_TEMPERATURA_1",
"CAMARA_QUENTE_TEMPERATURA_2",
"CAMARA_QUENTE_TEMPERATURA_3",
"CAMARA_QUENTE_TEMPERATURA_4",
"CAMARA_QUENTE_TEMPERATURA_5",
"CAMARA_QUENTE_TEMPERATURA_6",
"CAMARA_QUENTE_TEMPERATURA_7",
"CAMARA_QUENTE_TEMPERATURA_8",
"CAMARA_QUENTE_TEMPERATURA_9",
"CAMARA_QUENTE_TEMPERATURA_10",
"CAMARA_QUENTE_TEMPERATURA_11",
"CAMARA_QUENTE_TEMPERATURA_12",
"CAMARA_QUENTE_TEMPERATURA_13",
"CAMARA_QUENTE_TEMPERATURA_14",
"CAMARA_QUENTE_TEMPERATURA_15",
"CAMARA_QUENTE_TEMPERATURA_16",
"DOSAGEM_PARTIDA_1",
"DOSAGEM_PRESSAO_1",
"DOSAGEM_FLUXO_1",
"DOSAGEM_CONTRAPRESSAO_1",
"DOSAGEM_PARTIDA_2",
"DOSAGEM_PRESSAO_2",
"DOSAGEM_FLUXO_2",
"DOSAGEM_CONTRAPRESSAO_2",
"DOSAGEM_PARTIDA_3",
"DOSAGEM_PRESSAO_3",
"DOSAGEM_FLUXO_3",
"DOSAGEM_CONTRAPRESSAO_3",
"DOSAGEM_PARTIDA_4",
"DOSAGEM_PRESSAO_4",
"DOSAGEM_FLUXO_4",
"DOSAGEM_CONTRAPRESSAO_4",
"DOSAGEM_PARTIDA_5",
"DOSAGEM_PRESSAO_5",
"DOSAGEM_FLUXO_5",
"DOSAGEM_CONTRAPRESSAO_5",
"INJECAO_POSICAO_1",
"INJECAO_POSICAO_2",
"INJECAO_POSICAO_3",
"INJECAO_POSICAO_4",
"INJECAO_POSICAO_5",
"INJECAO_PRESSAO_1",
"INJECAO_PRESSAO_2",
"INJECAO_PRESSAO_3",
"INJECAO_PRESSAO_4",
"INJECAO_PRESSAO_5",
"INJECAO_FLUXO_1",
"INJECAO_FLUXO_2",
"INJECAO_FLUXO_3",
"INJECAO_FLUXO_4",
"INJECAO_FLUXO_5",
"TEMPO_DISPARO",
"TEMPO_INJECAO",
"POSICAO_RECALQUE",
"CURSO_DOSAGEM",
"RPM_ROSCA",
"CONTRA_PRESS_MAXIMA",
"FECHAMENTO_POSICAO_1",
"FECHAMENTO_POSICAO_2",
"FECHAMENTO_POSICAO_3",
"FECHAMENTO_POSICAO_PROTECAO_MOLDE",
"FECHAMENTO_POSICAO_ALTA_PRESSAO",
"FECHAMENTO_PRESSAO_1",
"FECHAMENTO_PRESSAO_2",
"FECHAMENTO_PRESSAO_3",
"FECHAMENTO_PRESSAO_PROTECAO_MOLDE",
"FECHAMENTO_PRESSAO_ALTA_PRESSAO",
"FECHAMENTO_FLUXO_1",
"FECHAMENTO_FLUXO_2",
"FECHAMENTO_FLUXO_3",
"FECHAMENTO_FLUXO_PROTECAO_MOLDE",
"FECHAMENTO_FLUXO_ALTA_PRESSAO",
"TEMPO_PROTECAO_MOLDE",
"TEMPO_FECHAMENTO",
"ABERTURA_POSICAO_1",
"ABERTURA_POSICAO_2",
"ABERTURA_POSICAO_3",
"ABERTURA_POSICAO_4",
"ABERTURA_POSICAO_5",
"ABERTURA_PRESSAO_1",
"ABERTURA_PRESSAO_2",
"ABERTURA_PRESSAO_3",
"ABERTURA_PRESSAO_4",
"ABERTURA_PRESSAO_5",
"ABERTURA_FLUXO_1",
"ABERTURA_FLUXO_2",
"ABERTURA_FLUXO_3",
"ABERTURA_FLUXO_4",
"ABERTURA_FLUXO_5",
"TEMPO_RESFRIAMENT0",
"TEMPO_ABERTURA",
"EXTRACAO_POSICAO_AVANCO_1",
"EXTRACAO_POSICAO_AVANCO_2",
"EXTRACAO_POSICAO_AVANCO_3",
"EXTRACAO_POSICAO_RECUO_1",
"EXTRACAO_POSICAO_RECUO_2",
"EXTRACAO_POSICAO_RECUO_3",
"EXTRACAO_PRESSAO_AVANCO_1",
"EXTRACAO_PRESSAO_AVANCO_2",
"EXTRACAO_PRESSAO_AVANCO_3",
"EXTRACAO_PRESSAO_RECUO_1",
"EXTRACAO_PRESSAO_RECUO_2",
"EXTRACAO_PRESSAO_RECUO_3",
"EXTRACAO_FLUXO_AVANCO_1",
"EXTRACAO_FLUXO_AVANCO_2",
"EXTRACAO_FLUXO_AVANCO_3",
"EXTRACAO_FLUXO_RECUO_1",
"EXTRACAO_FLUXO_RECUO_2",
"EXTRACAO_FLUXO_RECUO_3",
"RADIAL_PRESSAO_ENTRADA_1",
"RADIAL_PRESSAO_ENTRADA_2",
"RADIAL_PRESSAO_ENTRADA_3",
"RADIAL_PRESSAO_SAIDA_1",
"RADIAL_PRESSAO_SAIDA_2",
"RADIAL_PRESSAO_SAIDA_3",
"RADIAL_FLUXO_ENTRADA_1",
"RADIAL_FLUXO_ENTRADA_2",
"RADIAL_FLUXO_ENTRADA_3",
"RADIAL_FLUXO_SAIDA_1",
"RADIAL_FLUXO_SAIDA_2",
"RADIAL_FLUXO_SAIDA_3",
"RADIAL_ACT_POSICAO_ENTRADA_1",
"RADIAL_ACT_POSICAO_ENTRADA_2",
"RADIAL_ACT_POSICAO_ENTRADA_3",
"RADIAL_ACT_POSICAO_SAIDA_1",
"RADIAL_ACT_POSICAO_SAIDA_2",
"RADIAL_ACT_POSICAO_SAIDA_3",
"RADIAL_ACT_TEMPO_ENTRADA_1",
"RADIAL_ACT_TEMPO_ENTRADA_2",
"RADIAL_ACT_TEMPO_ENTRADA_3",
"RADIAL_ACT_TEMPO_SAIDA_1",
"RADIAL_ACT_TEMPO_SAIDA_2",
"RADIAL_ACT_TEMPO_SAIDA_3",
"RADIAL_SCRCOUNT_ENTRADA_1",
"RADIAL_SCRCOUNT_ENTRADA_2",
"RADIAL_SCRCOUNT_ENTRADA_3",
"RADIAL_SCRCOUNT_SAIDA_1",
"RADIAL_SCRCOUNT_SAIDA_2",
"RADIAL_SCRCOUNT_SAIDA_3",
"NUMERO_REPETICOES",
"REF_MOLDE_LF",
"REF_MOLDE_LM",
"VAP_MINIMO",
"VAP_MAXIMO",
"PROG_MACHO_FUNC_E1",
"PROG_MACHO_FUNC_S1",
"PROG_MACHO_FUNC_E2",
"PROG_MACHO_FUNC_S2",
"PROG_MACHO_POSICAO_E1",
"PROG_MACHO_POSICAO_S1",
"PROG_MACHO_POSICAO_E2",
"PROG_MACHO_POSICAO_S2",
"PROG_MACHO_PARADA_E1",
"PROG_MACHO_PARADA_S1",
"PROG_MACHO_PARADA_E2",
"PROG_MACHO_PARADA_S2",
"PROG_MACHO_CDENTRO_E1",
"PROG_MACHO_CDENTRO_S1",
"PROG_MACHO_CDENTRO_E2",
"PROG_MACHO_CDENTRO_S2",
"PROG_MACHO_CFORA_E1",
"PROG_MACHO_CFORA_S1",
"PROG_MACHO_CFORA_E2",
"PROG_MACHO_CFORA_S2",
"PROG_MACHO_RETARDO_E1",
"PROG_MACHO_RETARDO_S1",
"PROG_MACHO_RETARDO_E2",
"PROG_MACHO_RETARDO_S2",
"PROG_MACHO_TATUACAO_E1",
"PROG_MACHO_TATUACAO_S1",
"PROG_MACHO_TATUACAO_E2",
"PROG_MACHO_TATUACAO_S2",
"PROG_MACHO_PRESSAO_E1",
"PROG_MACHO_PRESSAO_S1",
"PROG_MACHO_PRESSAO_E2",
"PROG_MACHO_PRESSAO_S2",
"PROG_MACHO_VELOCIDADE_E1",
"PROG_MACHO_VELOCIDADE_S1",
"PROG_MACHO_VELOCIDADE_E2",
"PROG_MACHO_VELOCIDADE_S2",
"PROG_MACHO_DETENTE_E1",
"PROG_MACHO_DETENTE_S1",
"PROG_MACHO_DETENTE_E2",
"PROG_MACHO_DETENTE_S2",
"TEMPERATURA_AGUA_TORRE", 
"TEMPERATURA_AGUA_GELADA",
"PRESSAO_AGUA_TORRE",
"PRESSAO_AGUA_GELADA"
 ]

//view engine
app.set('view engine','ejs');

//Session
app.use(session({
   secret: "qualquercoisa",
   resave: true,
   cookie:{
      maxAge: 30000
   },
   saveUninitialized: true,
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
app.use("/",revisaoController);
app.use("/",acessoVfWebController);
app.use("/",WmController);



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
//    Tipo.sync();
//    Maquinas.sync();
//    User.sync();
//    Produtos.sync();
//    MateriaPrima.sync();
//    Moldes.sync();
//    Clientes.sync();
//    FichaTecnicaToshiba.sync();
//    LimitesFichaTecnicaToshiba.sync();
//    ParametrosReaisToshiba.sync();   
//    ParametrosReaisAutomata.sync();        
//    ParametrosReaisHaitianJupyter.sync();        
//    LimiteParametrosToshiba.sync();
//    LimiteParametrosAutomata.sync();
//    Alertas.sync();
//    AlertasAbertos.sync();
//    FichaPastoreInjetores.sync();
//    FichaPastorePerifericos.sync();
//    RevisaoFichaTecnicaPastoreInjetores.sync();
//    RevisaoFichaTecnicaPastorePerifericos.sync();
//    RevisaoLimitesFichaTecnicaToshiba.sync();


//    User.create({
//       nome:"admin",
//       email:"admin@email.com",
//       password:hash,
//       matricula:"00000",        
//       isAdmin:"1",        
//    })

//    Tipo.create({
//       tipo:"Toshiba"
//    });
//    Tipo.create({
//       tipo:"Automata OPTIN"
//    })
//    Tipo.create({
//       tipo:"Haitian Jupyter"
//    })


rulesMediator();


function rulesMediator(){

    // A base de regras pode ser encontrada no seguinte link
    // https://www.ermontoro.com/post/2018/09/05/regras-para-avaliar-cartas-de-controle-cep

    ParametrosReaisHaitianJupyter.findAll(
        { limit: 30, order: [ [ 'createdAt', 'DESC' ]] }
        ).then( parametros => {

            //Regra 1: Um ponto mais do que 3 desvios padrão de distância da média. 
            rule1(parametros);

            //Regra 2: Nove ou mais pontos consecutivos de um mesmo lado da média.
            rule2(parametros);

            //Regra 3: Seis ou mais pontos consecutivos crescente ou decrescente. 
            rule3(parametros);

            //Regra 4: Quatorze pontos consecutivos ou mais de forma alternada, acima e abaixo da média.  
            rule4(parametros);

            //Regra 5: Dois ou mais pontos de três consecutivos mais do que dois desvios padrão da média na mesma direção. 
            rule5(parametros);

             //Regra 7: Quinze pontos em sequência todos dentro da região de um desvio padrão.  
             rule7(parametros);

             //Regra 8: Oito pontos consecutivos, mas nenhum dentro da faixa de ± 1 desvio padrão, mesmo dos dois lados da linha média.  
             rule8(parametros);
      })    
}


function rule1(iterator){

    for(var j =0; j < listParametros.length; j++){
            
        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){
          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let desvioPadrao = calculaDesvioPadrao(listaParametros);
        let media = calculaMedia(listaParametros);

        for(var i =0; i < iterator.length; i++){
            
         if((iterator[i].get(listParametros[j]) > (3*desvioPadrao)+media)){
             console.log("enviar Email ")
         }
        }


      }
    
  
  }

  function rule2(iterator){

    var numbersUpMedian = 0;

    
    for(var j =0; j < listParametros.length; j++){
            
        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){
          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);

        for(var i =0; i < listaParametros.length; i++){
            
         if(listaParametros[i] > media ){
            numbersUpMedian = numbersUpMedian + 1;
         }
        }

        if(numbersUpMedian >= 9){
            console.log("enviar Email ")
        }


      }
    
  }

  function rule3(iterator){

    var growPoints = 0;
    var descPoints = 0;

    
    for(var j =0; j < listParametros.length; j++){
            
        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){
          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);

        for(var i =0; i < listaParametros.length; i++){
            
        if(i > 0){
            if(listaParametros[i] > listaParametros[i-1]){
                growPoints = growPoints + 1;
                descPoints = 0;
            }else if (listaParametros[i] < listaParametros[i-1]){
                descPoints = descPoints + 1;
                growPoints = 0;
            }
        }

        if(growPoints >= 6 || descPoints >=6){
            console.log("enviar Email ")
        }

        }

       


      }
    
  }

  function rule4(iterator){

    var  sequenceFlow= 0;

    for(var j =0; j < listParametros.length; j++){
            
        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){
          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);

        for(var i =0; i < listaParametros.length; i++){
            
        if(i>0){

            if(listaParametros[i] > media && listaParametros[i-1] < media ){
                sequenceFlow = sequenceFlow + 1;
            }else if(listaParametros[i] < media && listaParametros[i-1] > media){
                sequenceFlow = sequenceFlow + 1;
            }else{
                sequenceFlow = 0;
            }

        }

        if(sequenceFlow >= 14){
            console.log("enviar Email ")
        }

        }

      }
    
  }

  function rule5(iterator){

    var  sequenceFlow= 0;

    for(var j =0; j < listParametros.length; j++){
            
        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){
          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);
        let desvioPadrao = calculaDesvioPadrao(listaParametros);

        for(var i =0; i < listaParametros.length; i++){
            
        if(i>1){
            var matchs = 0;
            if(listaParametros[i] > listaParametros[i-1]  && listaParametros[i-1] > listaParametros[i-2]){
                if(listaParametros[i] > media + 2*desvioPadrao){
                    matchs = matchs + 1;
                }
                if(listaParametros[i-1] > media + 2*desvioPadrao){
                    matchs = matchs + 1;
                }
                if(listaParametros[i-2] > media + 2*desvioPadrao){
                    matchs = matchs + 1;
                }

                if(matchs >= 2){
                    console.log("enviar Email ")
                }
            }else if(listaParametros[i] < listaParametros[i-1]  && listaParametros[i-1] < listaParametros[i-2]){
                if(listaParametros[i] < media - 2*desvioPadrao){
                    matchs = matchs + 1;
                }
                if(listaParametros[i-1] < media - 2*desvioPadrao){
                    matchs = matchs + 1;
                }
                if(listaParametros[i-2] < media - 2*desvioPadrao){
                    matchs = matchs + 1;
                }

                if(matchs >= 2){
                    console.log("enviar Email ")
                }
            }

        }

      
        }

      }
    
  }

  function rule7(iterator){

    for(var j =0; j < listParametros.length; j++){
        var matchs = 0;

        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);
        let desvioPadrao = calculaDesvioPadrao(listaParametros);

        for(var i =0; i < listaParametros.length; i++){

            if(i>0){
            
                if(listaParametros[i] < media + desvioPadrao || listaParametros[i] > media - desvioPadrao ){
                    matchs = matchs + 1;
                }else{
                    matchs = 0;
                }

            }

            if(matchs >= 15){
                console.log("enviar Email ")
            }
      
        }

      }
    
  }

  function rule8(iterator){

    for(var j =0; j < listParametros.length; j++){
        var matchs = 0;

        var listaParametros = [];

        for(var i =0; i < iterator.length; i++){          
          listaParametros.push(iterator[i].get(listParametros[j]))
        }

        let media = calculaMedia(listaParametros);
        let desvioPadrao = calculaDesvioPadrao(listaParametros);

        for(var i =0; i < listaParametros.length; i++){

            if(i>0){
            
                if(listaParametros[i] > media + desvioPadrao || listaParametros[i] < media - desvioPadrao ){
                    matchs = matchs + 1;
                }else{
                    matchs = 0;
                }

            }

            if(matchs >= 8){
                console.log("enviar Email ")
            }
      
        }

      }
    
  }



  function calculaDesvioPadrao(lista){
    let media = lista.reduce((total, valor) => total+valor/lista.length, 0);
    let variancia = lista.reduce((total, valor) => total + Math.pow(media - valor, 2)/lista.length, 0);
    let desvioPadrao = Math.sqrt(variancia);

    return desvioPadrao;
 }

 function calculaMedia(lista){
    let media = lista.reduce((total, valor) => total+valor/lista.length, 0);
    return media;
 }
app.listen(3000,"0.0.0.0",() => {
    console.log("Servidor Rodando");
})
