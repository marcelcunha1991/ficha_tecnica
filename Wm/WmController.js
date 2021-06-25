
const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const Maquinas = require("../Maquinas/Maquinas");
dotenv.config(); //PARA TESTES, COMENTE ESSE E DESCOMENTE O DEBAIXO

// dotenv.config({path: path.resolve(__dirname, '../.env.example')});

const ParametrosReaisHaitianJupyter = require("../ParametrosTempoReal/ParametrosReaisHaitianJupyter");
const FichaTecnicaPastoreInjetores = require("../Ficha/FichaPastore/FichaTecnicaPastoreInjetores");

 var listaParametrosCorrelacionados =     [
	["TEMPERATURA_ZONA_1","cilindro1"],
   ["TEMPERATURA_ZONA_2","cilindro2"],
   ["TEMPERATURA_ZONA_3","cilindro3"],
   ["TEMPERATURA_ZONA_4","cilindro4"],
   ["TEMPERATURA_ZONA_5","cilindro5"],
   ["TEMPERATURA_ZONA_6","cilindro6"],
   ["TEMPERATURA_ZONA_7","cilindro7"],
   ["INJECAO_POSICAO_5","posInjecao1"],
   ["INJECAO_POSICAO_4","posInjecao2"],
   ["INJECAO_POSICAO_3","posInjecao3"],
   ["INJECAO_POSICAO_2","posInjecao4"],
   ["INJECAO_POSICAO_1","posInjecao5"],
   ["INJECAO_PRESSAO_5","presInjecao1"],
   ["INJECAO_PRESSAO_4","presInjecao2"],
   ["INJECAO_PRESSAO_3","presInjecao3"],
   ["INJECAO_PRESSAO_2","presInjecao4"],
   ["INJECAO_PRESSAO_1","presInjecao5"],
   ["INJECAO_FLUXO_5","fluxoInjecao1"],
   ["INJECAO_FLUXO_4","fluxoInjecao2"],
   ["INJECAO_FLUXO_3","fluxoInjecao3"],
   ["INJECAO_FLUXO_2","fluxoInjecao4"],
   ["INJECAO_FLUXO_1","fluxoInjecao5"],
   ["TEMPO_DISPARO","tempoDisparo"],
   ["TEMPO_INJECAO","pressaoInj"],
   ["RECALQUE_PRESSAO_5","presRecalque1"],
   ["RECALQUE_PRESSAO_4","presRecalque2"],
   ["RECALQUE_PRESSAO_3","presRecalque3"],
   ["RECALQUE_PRESSAO_2","presRecalque4"],
   ["RECALQUE_PRESSAO_1","presRecalque5"],
   ["RECALQUE_FLUXO_5","fluxoRecalque1"],
   ["RECALQUE_FLUXO_4","fluxoRecalque2"],
   ["RECALQUE_FLUXO_3","fluxoRecalque3"],
   ["RECALQUE_FLUXO_2","fluxoRecalque4"],
   ["RECALQUE_FLUXO_1","fluxoRecalque5"],
   ["RECALQUE_TEMPO_5","tempoRecalque1"],
   ["RECALQUE_TEMPO_4","tempoRecalque2"],
   ["RECALQUE_TEMPO_3","tempoRecalque3"],
   ["RECALQUE_TEMPO_2","tempoRecalque4"],
   ["RECALQUE_TEMPO_1","tempoRecalque5"],
   ["DOSAGEM_PARTIDA_1","partDosagem1"],
   ["DOSAGEM_PARTIDA_2","partDosagem2"],
   ["DOSAGEM_PARTIDA_3","partDosagem3"],
   ["DOSAGEM_PARTIDA_4","partDosagem4"],
   ["DOSAGEM_PARTIDA_5","partDosagem5"],
   ["DOSAGEM_PRESSAO_1","presDosagem1"],
   ["DOSAGEM_PRESSAO_2","presDosagem2"],
   ["DOSAGEM_PRESSAO_3","presDosagem3"],
   ["DOSAGEM_PRESSAO_4","presDosagem4"],
   ["DOSAGEM_PRESSAO_5","presDosagem5"],
   ["DOSAGEM_FLUXO_1","fluxoDosagem1"],
   ["DOSAGEM_FLUXO_2","fluxoDosagem2"],
   ["DOSAGEM_FLUXO_3","fluxoDosagem3"],
   ["DOSAGEM_FLUXO_4","fluxoDosagem4"],
   ["DOSAGEM_FLUXO_5","fluxoDosagem5"],
   ["DOSAGEM_CONTRAPRESSAO_1","CPDosagem1"],
   ["DOSAGEM_CONTRAPRESSAO_2","CPDosagem2"],
   ["DOSAGEM_CONTRAPRESSAO_3","CPDosagem3"],
   ["DOSAGEM_CONTRAPRESSAO_4","CPDosagem4"],
   ["DOSAGEM_CONTRAPRESSAO_5","CPDosagem5"],
   ["TEMPO_DOSAGEM","tempoDosagem"],
   ["FECHAMENTO_POSICAO_1","posFecha1"],
   ["FECHAMENTO_POSICAO_2","posFecha2"],
   ["FECHAMENTO_POSICAO_3","posFecha3"],
   ["FECHAMENTO_POSICAO_PROTECAO_MOLDE","protMPos"],
   ["FECHAMENTO_POSICAO_ALTA_PRESSAO","AltaPresPos"],
   ["FECHAMENTO_PRESSAO_1","presFecha1"],
   ["FECHAMENTO_PRESSAO_2","presFecha2"],
   ["FECHAMENTO_PRESSAO_3","presFecha3"],
   ["FECHAMENTO_PRESSAO_PROTECAO_MOLDE","protMPres"],
   ["FECHAMENTO_PRESSAO_ALTA_PRESSAO","AltaPresPres"],
   ["FECHAMENTO_FLUXO_1","fluxoFecha1"],
   ["FECHAMENTO_FLUXO_2","fluxoFecha2"],
   ["FECHAMENTO_FLUXO_3","fluxoFecha3"],
   ["FECHAMENTO_FLUXO_PROTECAO_MOLDE","protMFluxo"],
   ["FECHAMENTO_FLUXO_ALTA_PRESSAO","AltaPresFluxo"],
   ["TEMPO_PROTECAO_MOLDE","tempoProtMolde"],
   ["TEMPO_FECHAMENTO","tempoFecha"],
   ["ABERTURA_POSICAO_5","posAbertura1"],
   ["ABERTURA_POSICAO_4","posAbertura2"],
   ["ABERTURA_POSICAO_3","posAbertura3"],
   ["ABERTURA_POSICAO_2","posAbertura4"],
   ["ABERTURA_POSICAO_1","posAbertura5"],
   ["ABERTURA_PRESSAO_5","presAbertura1"],
   ["ABERTURA_PRESSAO_4","presAbertura2"],
   ["ABERTURA_PRESSAO_3","presAbertura3"],
   ["ABERTURA_PRESSAO_2","presAbertura4"],
   ["ABERTURA_PRESSAO_1","presAbertura5"],
   ["ABERTURA_FLUXO_5","fluxoAbertura1"],
   ["ABERTURA_FLUXO_4","fluxoAbertura2"],
   ["ABERTURA_FLUXO_3","fluxoAbertura3"],
   ["ABERTURA_FLUXO_2","fluxoAbertura4"],
   ["ABERTURA_FLUXO_1","fluxoAbertura5"],
   ["TEMPO_RESFRIAMENT0","resfriamento"],
   ["TEMPO_ABERTURA","tempoAbertura"],
   ["EXTRACAO_POSICAO_AVANCO_1","posAvanco1"],
   ["EXTRACAO_POSICAO_AVANCO_2","posAvanco2"],
   ["EXTRACAO_POSICAO_AVANCO_3","posAvanco3"],
   ["EXTRACAO_POSICAO_RECUO_3","posRecuo1"],
   ["EXTRACAO_POSICAO_RECUO_2","posRecuo2"],
   ["EXTRACAO_POSICAO_RECUO_1","posRecuo3"],
   ["EXTRACAO_PRESSAO_AVANCO_1","presAvanco1"],
   ["EXTRACAO_PRESSAO_AVANCO_2","presAvanco2"],
   ["EXTRACAO_PRESSAO_AVANCO_3","presAvanco3"],
   ["EXTRACAO_PRESSAO_RECUO_3","presRecuo1"],
   ["EXTRACAO_PRESSAO_RECUO_2","presRecuo2"],
   ["EXTRACAO_PRESSAO_RECUO_1","presRecuo3"],
   ["EXTRACAO_FLUXO_AVANCO_1","fluxoAvanco1"],
   ["EXTRACAO_FLUXO_AVANCO_2","fluxoAvanco2"],
   ["EXTRACAO_FLUXO_AVANCO_3","fluxoAvanco3"],
   ["EXTRACAO_FLUXO_RECUO_3","fluxoRecuo1"],
   ["EXTRACAO_FLUXO_RECUO_2","fluxoRecuo2"],
   ["EXTRACAO_FLUXO_RECUO_1","fluxoRecuo3"],
   ["RADIAL_PRESSAO_ENTRADA_1","radialPresEntrada1"],
   ["RADIAL_PRESSAO_SAIDA_1","radialPresSaida1"],
   ["RADIAL_PRESSAO_ENTRADA_2","radialPresEntrada2"],
   ["RADIAL_PRESSAO_SAIDA_2","radialPresSaida2"],
   ["RADIAL_PRESSAO_ENTRADA_3","radialPresEntrada3"],
   ["RADIAL_PRESSAO_SAIDA_3","radialPresSaida3"],
   ["RADIAL_FLUXO_ENTRADA_1","radialFluxoEntrada1"],
   ["RADIAL_FLUXO_SAIDA_1","radialFluxoSaida1"],
   ["RADIAL_FLUXO_ENTRADA_2","radialFluxoEntrada2"],
   ["RADIAL_FLUXO_SAIDA_2","radialFluxoSaida2"],
   ["RADIAL_FLUXO_ENTRADA_3","radialFluxoEntrada3"],
   ["RADIAL_FLUXO_SAIDA_3","radialFluxoSaida3"],
   ["RADIAL_ACT_POSICAO_ENTRADA_1","radialPosEntrada1"],
   ["RADIAL_ACT_POSICAO_SAIDA_1","radialPosSaida1"],
   ["RADIAL_ACT_POSICAO_ENTRADA_2","radialPosEntrada2"],
   ["RADIAL_ACT_POSICAO_SAIDA_2","radialPosSaida2"],
   ["RADIAL_ACT_POSICAO_ENTRADA_3","radialPosEntrada3"],
   ["RADIAL_ACT_POSICAO_SAIDA_3","radialPosSaida3"],
   ["RADIAL_ACT_TEMPO_ENTRADA_1","radialTempoEntrada1"],
   ["RADIAL_ACT_TEMPO_SAIDA_1","radialTempoSaida1"],
   ["RADIAL_ACT_TEMPO_ENTRADA_2","radialTempoEntrada2"],
   ["RADIAL_ACT_TEMPO_SAIDA_2","radialTempoSaida2"],
   ["RADIAL_ACT_TEMPO_ENTRADA_3","radialTempoEntrada3"],
   ["RADIAL_ACT_TEMPO_SAIDA_3","radialTempoSaida3"],
   ["RADIAL_SCRCOUNT_ENTRADA_1","radialSCREntrada1"],
   ["RADIAL_SCRCOUNT_SAIDA_1","radialSCRSaida1"],
   ["RADIAL_SCRCOUNT_ENTRADA_2","radialSCREntrada2"],
   ["RADIAL_SCRCOUNT_SAIDA_2","radialSCRSaida2"],
   ["RADIAL_SCRCOUNT_ENTRADA_3","radialSCREntrada3"],
   ["RADIAL_SCRCOUNT_SAIDA_3","radialSCRSaida3"]
	]


router.get("/trigger",  (req,res) => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false, // use SSL
        port: 587,
        auth: {
          user: 'wmmailcentral@gmail.com',
          pass: 'marcelft131291'
        },        
      tls: {
          rejectUnauthorized: false
      }
      });
      
      var mailOptions = {
        from: 'wmmailcentral@gmail.com',
        to: process.env.SEND_EMAIL_TO,
        subject: 'WM ALERTA',
        text: 'Parâmetros tendendo a sair dos limites esperados'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.redirect("/fichas")
 
     
 })

 router.get("/getParametrosForaPlanejado",  (req,res) => {

  var resposta = []

  var bar = new Promise((resolve, reject) => {
    Maquinas.findAll()
    .then(maquinas => {    

      maquinas.forEach((maquina, index, array) => {

        ParametrosReaisHaitianJupyter.findAll({
          limit: 1,
          where: {
            mac: maquina.mac
          },
          order: [ [ 'createdAt', 'DESC' ]]
        }).then(parametros => {

          FichaTecnicaPastoreInjetores.findAll({
            limit: 1,
            where: {
              maq: maquina.id
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(ficha => {

            for(var i =0; i < listaParametrosCorrelacionados.length; i++){
              if(parametros[0][listaParametrosCorrelacionados[i][0]] > ficha[0][listaParametrosCorrelacionados[i][1]] + (ficha[0][listaParametrosCorrelacionados[i][1]]/10)){
                console.log("inserido na lista")
                resposta.push({"parametro" : listaParametrosCorrelacionados[i][0],
                               "valorAtual" : parametros[0][listaParametrosCorrelacionados[i][0]],
                                "valorEsperado":ficha[0][listaParametrosCorrelacionados[i][1]]} 
                                );
              }

              if (i === listaParametrosCorrelacionados.length -1) resolve();

            }    

           
            
          })
       
        }); 

        
    });
 
 });
});

bar.then(() => {
  res.send({"Parametros" : resposta } );
});

})




 
module.exports = { router };