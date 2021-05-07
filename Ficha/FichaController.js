const express = require("express");
const router = express.Router();
const FichaTecnicaToshiba = require("./FichaTecnicaToshiba");
const LimitesFichaTecnicaToshiba = require("./LimitesFichaTecnicaToshiba");
const ParametrosReaisToshiba = require("../ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("../ParametrosTempoReal/ParametrosReaisAutomata");
const AlertasAbertosAutomata = require("../Alertas/AlertasAbertos");
const Alertas = require("../Alertas/Alertas");
const Tipo = require("../Tipo/Tipo");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");
const Maquinas = require("../Maquinas/Maquinas");
var nodemailer = require('nodemailer');
const LimiteParametrosToshiba = require("../ParametrosTempoReal/LimiteParametrosToshiba");
const LimiteParametrosAutomata = require("../ParametrosTempoReal/LimiteParametrosAutomata");
const FichaTecnicaPastoreInjetores = require("../Ficha/FichaPastore/FichaTecnicaPastoreInjetores");
const FichaPastorePerifericos = require("../Ficha/FichaPastore/FichaTecnicaPastorePerifericos");
const RevisaoLimitesFichaTecnicaToshiba = require("../Revisao/RevisaoLimitesFichaTecnicaToshiba");
const RevisaoFichaTecnicaPastoreInjetores = require("../Revisao/RevisaoFichaTecnicaPastoreInjetores");
const RevisaoFichaTecnicaPastorePerifericos = require("../Revisao/RevisaoFichaTecnicaPastorePerifericos");

router.get("/fichas/:maquina?",  (req,res) => {     
   var maquinas;

   var dsMaquina = "",
   dsMaquina = req.params.maquina;


   Maquinas.findAll().then(maquina => {
      maquinas = maquina;
   })

   FichaTecnicaToshiba.findAll().then(fichas => {   
      res.render("fichas/index",{
         fichas:fichas,
         dsMaquina : dsMaquina,
         maquinas: maquinas,
         tabela:"",
         nav_maquinas : "",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "active",
         nav_alertas:""
      })
   });

    
})

router.get("/fichasUltimo/maquina/:id",  (req,res) => {
   
   var maquinaId= req.params.id;      

   Maquinas.findOne({
      where: {
         id: maquinaId
      },
      include: [{
         model: Tipo,
         required: true
      }]
   }).then(maquina => {   
      switch(maquina.tipo.id){

         case 1:
               
            ParametrosReaisToshiba.findAll({
               limit: 1,
               where: {
                  mac: maquina.mac
               },
               order: [ [ 'createdAt', 'DESC' ]]
            }).then(output => {
         
               console.log(output[0])
               res.send(output[0])
               
            }); 
            break;

         case 2: 

            ParametrosReaisAutomata.findAll({
               limit: 1,
               where: {
               mac: maquina.mac
               },
               order: [ [ 'createdAt', 'DESC' ]]
            }).then(output => {
      
               console.log(output[0])
               res.send(output[0])
               
            }); 
            break;
         

               
      }


      
   })      

})

router.get("/parametrosMediosReais/maquina/:id",  (req,res) => {
   
   var maquinaId= req.params.id;

   console.log(maquinaId)

   Maquinas.findOne({
      where: {
         id: maquinaId
      },include: [{
         model: Tipo,
         required: true
         }]
   }).then(maquina => {    

      if(maquina.tipo.id == 1) {
         LimiteParametrosToshiba.findAll({
            limit: 1,
            where: {
               maquina: maquina.id
            },
            include: [{
               model: Maquinas,
               required: true
               }],
            order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {
   
            console.log(output[0])
            res.send(output[0])
            
         }); 
      }else if (maquina.tipo.id == 2) {

         LimiteParametrosAutomata.findAll({
            limit: 1,
            where: {
               maquina: maquina.id
            },
            order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {
   
            console.log(output[0])
            res.send(output[0])
            
         }); 
      }

      
   })      

})

router.get("/fichas/maquina/:id",  (req,res) => {
   
   var maquinaId= req.params.id;      

   Maquinas.findOne({
      where: {
         id: maquinaId
      }
   }).then(maquina => {     
      
      FichaTecnicaToshiba.findAll({
         limit: 1,
         where: {
            mac: maquina.mac
         },
         order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {

         res.send(output[0])
         
         }); 
   })   


    

})
router.get("/getAlertasAbertos/:id",  (req,res) => {

   AlertasAbertosAutomata.findAll({
      where:{
         maquinaId : parseInt(req.params.id),
         status:true
      },
      include: [{
         model: Alertas,
         required: true
         }]
   }).then(result => {
      res.send(result)
   })

})

router.get("/ficha/getFicha/:macMaquina",  (req,res) => {

   var maquinaMac= req.params.macMaquina;




   Maquinas.findOne({
      where: {
         mac : maquinaMac
      }
   }).then(output => {

      FichaTecnicaToshiba.findOne({
         where: {
            maquina : output.id
         }
      }).then(output => {
   
      
   
   
         res.send(output)
         
         }); 
      
   }); 


   

})

router.get("/novaficha",  (req,res) => {

   var maquinas;

   Maquinas.findAll({
      include: [{
         model: Tipo,
         required: true,
         attributes:['tipo']
      }]
   }).then(maquina => {
      maquinas = maquina;
   })
    
   FichaTecnicaToshiba.findAll().then((fichas) => {
      res.render("fichas/new",{        
         maquinas: maquinas,    
         nav_maquinas : "",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "active",
         nav_alertas:"",
         count: 0,
         teste: ""
      })
   });
})

router.post("/fichas/createToshiba",(req,res) => {
   var maquina = req.body.maquinaToshiba;
   var VI1_min = req.body.VI1_min;
   var VI1_max = req.body.VI1_max;
   var VI2_min = req.body.VI2_min;
   var VI2_max = req.body.VI2_max;
   var VI3_min = req.body.VI3_min;
   var VI3_max = req.body.VI3_max;
   var VI4_min = req.body.VI4_min;
   var VI4_max = req.body.VI4_max;
   var VI5_min = req.body.VI5_min;
   var VI5_max = req.body.VI5_max;
   var VI6_min = req.body.VI6_min;
   var VI6_max = req.body.VI6_max;
   var VI7_min = req.body.VI7_min;
   var VI7_max = req.body.VI7_max;
   var VI8_min = req.body.VI8_min;
   var VI8_max = req.body.VI8_max;
   var VI9_min = req.body.VI9_min;
   var VI9_max = req.body.VI9_max;
   var VI10_min = req.body.VI10_min;
   var VI10_max = req.body.VI10_max;
   var VH1_min = req.body.VH1_min;
   var VH1_max = req.body.VH1_max;
   var VH2_min = req.body.VH2_min;
   var VH2_max = req.body.VH2_max;
   var PI1_min = req.body.PI1_min;
   var PI1_max = req.body.PI1_max;
   var LS4_min = req.body.LS4_min;
   var LS4_max = req.body.LS4_max;
   var LS4A_min = req.body.LS4A_min;
   var LS4A_max = req.body.LS4A_max;    
   

   LimitesFichaTecnicaToshiba.create({
      maq: maquina,
      VI1_min: VI1_min,
      VI1_max: VI1_max,
      VI2_min: VI2_min,
      VI2_max: VI2_max,
      VI3_min: VI3_min,
      VI3_max: VI3_max,
      VI4_min: VI4_min,
      VI4_max: VI4_max,
      VI5_min: VI5_min,
      VI5_max: VI5_max,
      VI6_min: VI6_min,
      VI6_max: VI6_max,
      VI7_min: VI7_min,
      VI7_max: VI7_max,
      VI8_min: VI8_min,
      VI8_max: VI8_max,
      VI9_min: VI9_min,
      VI9_max: VI9_max,
      VI10_min: VI10_min,
      VI10_max: VI10_max,
      VH1_min: VH1_min,
      VH1_max: VH1_max,
      VH2_min: VH2_min,
      VH2_max: VH2_max,
      PI1_min: PI1_min,
      PI1_max: PI1_max,
      LS4_min: LS4_min,
      LS4_max: LS4_max,
      LS4A_min: LS4A_min,
      LS4A_max: LS4A_max,
   }).then(data => {
      
      //*salvando os dados antigos no banco de revisao antes do usuario fazer a edição
      RevisaoLimitesFichaTecnicaToshiba.create({
         idFichaTecnica: data.id,
         maq: maquina,
         VI1_min: VI1_min,
         VI1_max: VI1_max,
         VI2_min: VI2_min,
         VI2_max: VI2_max,
         VI3_min: VI3_min,
         VI3_max: VI3_max,
         VI4_min: VI4_min,
         VI4_max: VI4_max,
         VI5_min: VI5_min,
         VI5_max: VI5_max,
         VI6_min: VI6_min,
         VI6_max: VI6_max,
         VI7_min: VI7_min,
         VI7_max: VI7_max,
         VI8_min: VI8_min,
         VI8_max: VI8_max,
         VI9_min: VI9_min,
         VI9_max: VI9_max,
         VI10_min: VI10_min,
         VI10_max: VI10_max,
         VH1_min: VH1_min,
         VH1_max: VH1_max,
         VH2_min: VH2_min,
         VH2_max: VH2_max,
         PI1_min: PI1_min,
         PI1_max: PI1_max,
         LS4_min: LS4_min,
         LS4_max: LS4_max,
         LS4A_min: LS4A_min,
         LS4A_max: LS4A_max,

      }).then(() => {
         res.redirect("/novaficha");
      })
   })
})

router.post("/parametros/insert",(req,res) => {
 

   var mac = req.body.mac;
   
   var VI1 = req.body.VI1;
   var VI2 = req.body.VI2;
   var VI3 = req.body.VI3;
   var VI4 = req.body.VI4;
   var VI5 = req.body.VI5;
   var VI6 = req.body.VI6;
   var VI7 = req.body.VI7;
   var VI8 = req.body.VI8;
   var VI9 = req.body.VI9;
   var VI10 = req.body.VI10;
   var VH1 = req.body.VH1;
   var VH2 = req.body.VH2;
   var PI1 = req.body.PI1;
   var LS4 = req.body.LS4;
   var LS4A = req.body.LS4A;
   

   FichaTecnicaToshiba.create({
      mac:mac,
      VI1: VI1,
      VI2:VI2,
      VI3: VI3,
      VI4: VI4,
      VI5: VI5,
      VI6: VI6,
      VI7: VI7,
      VI8: VI8,
      VI9: VI9,
      VI10: VI10,
      VH1: VH1,
      VH2: VH2,
      PI1: PI1,
      LS4: LS4,
      LS4A: LS4A,
   }).then(() => {
      res.redirect("/fichas");
   })
})

router.post("/parametrosAtuais/insertAlarm",(req,res) => {

   console.log(req.body);

   var alarmes = req.body.alarmes;
   var mac = req.body.mac;
   var tipo = req.body.tipo;

   Maquinas.findOne({
      where: {
         mac: mac
      }
   }).then(maquina => {     

      alarmes.forEach(element => {



         if (tipo == "2"){
               AlertasAbertosAutomata.findAll({
                  where:{
                     alertasAutomatumId : parseInt(element),
                     maquinaId: maquina.id
                  }
               }).then(alertaAberto => {
                  if (alertaAberto === null) {
                     console.log('Alarme Aberto');
                     }else{

                     alertaAberto.forEach(element => {
                           element.update({
                              status:false
                           });
                     });                        
                     }
   
                     AlertasAbertosAutomata.create({
                        alertasAutomatumId : parseInt(element),
                        maquinaId:maquina.id
                     })
               })
         }
         
         
      });       
      
   })


   res.sendStatus(200);

})

function insertDataToshiba(body){

   Maquinas.findOne({
      where: {
         mac: body.mac
      }
   }).then(maquina => {     
      
      ParametrosReaisToshiba.findAll({
         limit: 1,
         where: {
            maquina: maquina.mac
         },
         order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {

         if(output.cycleTimeMin > cycleTime || output.cycleTimeMin < cycleTime ){
            sendMail("Cycle Time fora do esperado");
         }else if (output.dwellPressureMin > dwellPressure || output.dwellPressureMin < dwellPressure ){
            sendMail("Dwell Pressure fora do esperado");
         }
         
         }); 
   })

   ParametrosReaisToshiba.create(body).then(() => {
      res.redirect("/fichas");
   })



}

function insertDataAutomata(body){

   Maquinas.findOne({
      where: {
         mac: body.mac
      }
   }).then(maquina => {     
      
      ParametrosReaisAutomata.findAll({
         limit: 1,
         where: {
            maquina: maquina.mac
         },
         order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {

         if(output.cycleTimeMin > cycleTime || output.cycleTimeMin < cycleTime ){

            sendMail("Cycle Time fora do esperado");
         }else if (output.dwellPressureMin > dwellPressure || output.dwellPressureMin < dwellPressure ){
            sendMail("Dwell Pressure fora do esperado");
         }
         
         }); 
   })

   ParametrosReaisAutomata.create(body).then((result) => {
      return result;
   }).catch(error =>{
      return error;
   })

}

router.post("/parametrosAtuais/insert",(req,res) => {
 
   console.log(req.body)
   var tipo = req.body.tipo;

   switch(parseInt(tipo)){
      case 1:
         insertDataToshiba(req.body);
         res.sendStatus(200);
      case 2:
         insertDataAutomata(req.body);
         res.sendStatus(200);
      
   }
  
})

function emailSender(texto){

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'marcel.silva1991@gmail.com',
         pass: 'Marcel21003839'
      }
   });

   var mailOptions = {
      from: 'marcel.silva1991@gmail.com',
      to: 'marcel.silva1991@gmail.com',
      subject: 'Variação fora do esperado',
      text: texto
   };

   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
}

router.post("/fichas/update",(req,res) => {

   var id = req.body.id;
   var maquina = req.body.maquina;
   var VI1_min = req.body.VI1_min;
   var VI1_max = req.body.VI1_max;
   var VI2_min = req.body.VI2_min;
   var VI2_max = req.body.VI2_max;
   var VI3_min = req.body.VI3_min;
   var VI3_max = req.body.VI3_max;
   var VI4_min = req.body.VI4_min;
   var VI4_max = req.body.VI4_max;
   var VI5_min = req.body.VI5_min;
   var VI5_max = req.body.VI5_max;
   var VI6_min = req.body.VI6_min;
   var VI6_max = req.body.VI6_max;
   var VI7_min = req.body.VI7_min;
   var VI7_max = req.body.VI7_max;
   var VI8_min = req.body.VI8_min;
   var VI8_max = req.body.VI8_max;
   var VI9_min = req.body.VI9_min;
   var VI9_max = req.body.VI9_max;
   var VI10_min = req.body.VI10_min;
   var VI10_max = req.body.VI10_max;
   var VH1_min = req.body.VH1_min;
   var VH1_max = req.body.VH1_max;
   var VH2_min = req.body.VH2_min;
   var VH2_max = req.body.VH2_max;
   var PI1_min = req.body.PI1_min;
   var PI1_max = req.body.PI1_max;
   var LS4_min = req.body.LS4_min;
   var LS4_max = req.body.LS4_max;
   var LS4A_min = req.body.LS4A_min;
   var LS4A_max = req.body.LS4A_max;    
   

   LimitesFichaTecnicaToshiba.update({
      VI1_min:  VI1_min,
      VI1_max: VI1_max,
      VI2_min: VI2_min,
      VI2_max: VI2_max,
      VI3_min: VI3_min,
      VI3_max: VI3_max,
      VI4_min: VI4_min,
      VI4_max: VI4_max,
      VI5_min: VI5_min,
      VI5_max: VI5_max,
      VI6_min: VI6_min,
      VI6_max: VI6_max,
      VI7_min: VI7_min,
      VI7_max: VI7_max,
      VI8_min: VI8_min,
      VI8_max: VI8_max,
      VI9_min: VI9_min,
      VI9_max: VI9_max,
      VI10_min: VI10_min,
      VI10_max: VI10_max,
      VH1_min: VH1_min,
      VH1_max: VH1_max,
      VH2_min: VH2_min,
      VH2_max: VH2_max,
      PI1_min: PI1_min,
      PI1_max: PI1_max,
      LS4_min: LS4_min,
      LS4_max: LS4_max,
      LS4A_min: LS4A_min,
      LS4A_max: LS4A_max,
   },{
      where:{
         id:id
      }
   }).then(() => {

      //*salvando os dados antigos no banco de revisao antes do usuario fazer a edição
      RevisaoLimitesFichaTecnicaToshiba.create({
         idFichaTecnica: id,
         maq: maquina,
         VI1_min: VI1_min,
         VI1_max: VI1_max,
         VI2_min: VI2_min,
         VI2_max: VI2_max,
         VI3_min: VI3_min,
         VI3_max: VI3_max,
         VI4_min: VI4_min,
         VI4_max: VI4_max,
         VI5_min: VI5_min,
         VI5_max: VI5_max,
         VI6_min: VI6_min,
         VI6_max: VI6_max,
         VI7_min: VI7_min,
         VI7_max: VI7_max,
         VI8_min: VI8_min,
         VI8_max: VI8_max,
         VI9_min: VI9_min,
         VI9_max: VI9_max,
         VI10_min: VI10_min,
         VI10_max: VI10_max,
         VH1_min: VH1_min,
         VH1_max: VH1_max,
         VH2_min: VH2_min,
         VH2_max: VH2_max,
         PI1_min: PI1_min,
         PI1_max: PI1_max,
         LS4_min: LS4_min,
         LS4_max: LS4_max,
         LS4A_min: LS4A_min,
         LS4A_max: LS4A_max,

      }).then(() => {
         res.redirect("/ficha/lista");
      })

   })
    
   
})

router.post("/fichas/deleteToshiba",(req,res) => {
   var id = req.body.id;
   if (id != undefined){

      if(!isNaN(id)){

         LimitesFichaTecnicaToshiba.destroy({
            where:{
               id:id
            }
         }).then(() => {
            RevisaoLimitesFichaTecnicaToshiba.destroy({
               where:{
                  idFichaTecnica: id
               }
            }).then(() => {
               res.redirect("/ficha/lista");
            })
         })

      }else{
         res.redirect("/fichas");
      }
   }else{
      res.redirect("/fichas");
   }
})

router.get("/ficha/lista",(req,res) => {
   var maquinas;

   Maquinas.findAll({
      include: [{
         model: Tipo,
         required: true,
         attributes:['tipo']
      }]
   }).then(maquina => {
      maquinas = maquina;
      res.render("fichas/list", {
         maquinas: maquina,
         nav_maquinas : "",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "active",
         nav_alertas:"",
      })
   })
})

router.get("/ficha/lista/:id/:maquina",(req,res) => {
   var id = req.params.id;
   var maquina = req.params.maquina;

   if (maquina === "Toshiba") {
      LimitesFichaTecnicaToshiba.findAll({
         where: {
            maq: id
         }
      }).then(ficha => {
         res.send(ficha)
      })

   } else if (maquina === "HAITIAN") {
      FichaTecnicaPastoreInjetores.findAll({
         where: {
            maq: id
         }
      }).then(injetor => {
         res.send(injetor)
      })
   }
})

router.get("/fichas/editToshiba/:id",(req,res) => {

   var id = req.params.id;

   if(isNaN(id)){
      res.redirect("/fichas")
   }

   LimitesFichaTecnicaToshiba.findByPk(id).then(ficha => {
      res.render("fichas/editToshiba",{
         ficha:ficha, 
         nav_maquinas : "",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "active",
         nav_alertas:"",
         count: 0
      })

   }).catch(erro => {
      res.redirect("/ficha/lista");
   })  

})


router.get("/fichas/editHaitian/:id",(req,res) => {

   var id = req.params.id;
   var perifericos;

   if(isNaN(id)){
      res.redirect("/fichas")
   }

   FichaPastorePerifericos.findByPk(id).then(periferico => {
      perifericos = periferico
   })

   FichaTecnicaPastoreInjetores.findByPk(id).then(injetor => {

      res.render("fichas/editHaitian",{
         injetor:injetor, 
         perifericos:perifericos, 
         nav_maquinas : "",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "active",
         nav_alertas:"",
         count: 0,
         iteration: 0,
         
      })
   })
})

// *CRIANDO FICHA PASTORE

router.post("/fichas/createHaitian",(req,res) => {
   var maquina = req.body.maquinaHaitian;
   var cilindro1 = req.body.cilindro1;
   var cilindro2 = req.body.cilindro2;
   var cilindro3 = req.body.cilindro3;
   var cilindro4 = req.body.cilindro4;
   var cilindro5 = req.body.cilindro5;
   var cilindro6 = req.body.cilindro6;
   var cilindro7 = req.body.cilindro7;
   var posComut = req.body.posComutacao;
   var posInjecao1 = req.body.posInj5;
   var posInjecao2 = req.body.posInj4;
   var posInjecao3 = req.body.posInj3;
   var posInjecao4 = req.body.posInj2;
   var posInjecao5 = req.body.posInj1;
   var presComut = req.body.presComutacao;
   var presInjecao1 = req.body.presInj5;
   var presInjecao2 = req.body.presInj4;
   var presInjecao3 = req.body.presInj3;
   var presInjecao4 = req.body.presInj2;
   var presInjecao5 = req.body.presInj1;
   var fluxoInjecao1 = req.body.fluxoInj5;
   var fluxoInjecao2 = req.body.fluxoInj4;
   var fluxoInjecao3 = req.body.fluxoInj3;
   var fluxoInjecao4 = req.body.fluxoInj2;
   var fluxoInjecao5 = req.body.fluxoInj1;
   var tempoDisparo = req.body.tempoDisparo;
   var pressaoInj = req.body.pressaoInj;
   var presRecalque1 = req.body.presRecalque5;
   var presRecalque2 = req.body.presRecalque4;
   var presRecalque3 = req.body.presRecalque3;
   var presRecalque4 = req.body.presRecalque2;
   var presRecalque5 = req.body.presRecalque1;
   var fluxoRecalque1 = req.body.fluxoRecalque5;
   var fluxoRecalque2 = req.body.fluxoRecalque4;
   var fluxoRecalque3 = req.body.fluxoRecalque3;
   var fluxoRecalque4 = req.body.fluxoRecalque2;
   var fluxoRecalque5 = req.body.fluxoRecalque1;
   var tempoRecalque1 = req.body.tempoRecalque5;
   var tempoRecalque2 = req.body.tempoRecalque4;
   var tempoRecalque3 = req.body.tempoRecalque3;
   var tempoRecalque4 = req.body.tempoRecalque2;
   var tempoRecalque5 = req.body.tempoRecalque1;
   var partDosagem1 = req.body.partDosagem5;
   var partDosagem2 = req.body.partDosagem4;
   var partDosagem3 = req.body.partDosagem3;
   var partDosagem4 = req.body.partDosagem2;
   var partDosagem5 = req.body.partDosagem1;
   var presDosagem1 = req.body.presDosagem1;
   var presDosagem2 = req.body.presDosagem1;
   var presDosagem3 = req.body.presDosagem1;
   var presDosagem4 = req.body.presDosagem1;
   var presDosagem5 = req.body.presDosagem1;
   var fluxoDosagem1 = req.body.fluxoDosagem5;
   var fluxoDosagem2 = req.body.fluxoDosagem4;
   var fluxoDosagem3 = req.body.fluxoDosagem3;
   var fluxoDosagem4 = req.body.fluxoDosagem2;
   var fluxoDosagem5 = req.body.fluxoDosagem1;
   var CPDosagem1 = req.body.CPDosagem5;
   var CPDosagem2 = req.body.CPDosagem4;
   var CPDosagem3 = req.body.CPDosagem3;
   var CPDosagem4 = req.body.CPDosagem2;
   var CPDosagem5 = req.body.CPDosagem1;
   var tempoDosagem = req.body.tempoDosagem;
   var antesPos = req.body.antes1;
   var antesPres = req.body.antes2;
   var antesFluxo = req.body.antes3;
   var antesTempo = req.body.antes4;
   var depoisPos = req.body.depois1;
   var depoisPres = req.body.depois2;
   var depoisFluxo = req.body.depois3;
   var depoisTempo = req.body.depois4;
   var posFecha1 = req.body.posFech1;
   var posFecha2 = req.body.posFech2;
   var posFecha3 = req.body.posFech3;
   var protMPos = req.body.protMPos;
   var AltaPresPos = req.body.AltaPresPos;
   var presFecha1 = req.body.presFech1;
   var presFecha2 = req.body.presFech2;
   var presFecha3 = req.body.presFech3;
   var protMPres = req.body.protMPres;
   var AltaPresPres = req.body.AltaPresPressao;
   var fluxoFecha1 = req.body.fluxoFech1;
   var fluxoFecha2 = req.body.fluxoFech2;
   var fluxoFecha3 = req.body.fluxoFech3;
   var protMFluxo = req.body.protMFluxo;
   var AltaPresFluxo = req.body.AltaPresFluxo;
   var tempoProtMolde = req.body.tempoProtMolde;
   var tempoFecha = req.body.tempoFecha;
   var posAbertura1 = req.body.posAbertura5;
   var posAbertura2 = req.body.posAbertura4;
   var posAbertura3 = req.body.posAbertura3;
   var posAbertura4 = req.body.posAbertura2;
   var posAbertura5 = req.body.posAbertura1;
   var presAbertura1 = req.body.presAbertura5;
   var presAbertura2 = req.body.presAbertura4;
   var presAbertura3 = req.body.presAbertura3;
   var presAbertura4 = req.body.presAbertura2;
   var presAbertura5 = req.body.presAbertura1;
   var fluxoAbertura1 = req.body.fluxoAbertura5;
   var fluxoAbertura2 = req.body.fluxoAbertura4;
   var fluxoAbertura3 = req.body.fluxoAbertura3;
   var fluxoAbertura4 = req.body.fluxoAbertura2;
   var fluxoAbertura5 = req.body.fluxoAbertura1;
   var resfriamento = req.body.resfriamento;
   var tempoAbertura = req.body.tempoAbertura;
   var posAvanco1 = req.body.posAvanco1;
   var posAvanco2 = req.body.posAvanco2;
   var posAvanco3 = req.body.posAvanco3;
   var posRecuo1 = req.body.posRecuo1;
   var posRecuo2 = req.body.posRecuo2;
   var posRecuo3 = req.body.posRecuo3;
   var presAvanco1 = req.body.presAvanco1;
   var presAvanco2 = req.body.presAvanco2;
   var presAvanco3 = req.body.presAvanco3;
   var presRecuo1 = req.body.presRecuo1;
   var presRecuo2 = req.body.presRecuo2;
   var presRecuo3 = req.body.presRecuo3;
   var fluxoAvanco1 = req.body.fluxoAvanco1;
   var fluxoAvanco2 = req.body.fluxoAvanco2;
   var fluxoAvanco3 = req.body.fluxoAvanco3;
   var fluxoRecuo1 = req.body.fluxoRecuo1;
   var fluxoRecuo2 = req.body.fluxoRecuo2;
   var fluxoRecuo3 = req.body.fluxoRecuo3;
   var atraso = req.body.atraso;
   var batida = req.body.batida;
   var radialTypeEntrada1 = req.body.type1;
   var radialTypeSaida1 = req.body.type2;
   var radialTypeEntrada2 = req.body.type3;
   var radialTypeSaida2 = req.body.type4;
   var radialPresEntrada1 = req.body.pressaoRadial1;
   var radialPresSaida1 = req.body.pressaoRadial2;
   var radialPresEntrada2 = req.body.pressaoRadial3;
   var radialPresSaida2 = req.body.pressaoRadial4;
   var radialPresEntrada3 = req.body.pressaoRadial5;
   var radialPresSaida3 = req.body.pressaoRadial6;
   var radialFluxoEntrada1 = req.body.fluxoRadial1;
   var radialFluxoSaida1 = req.body.fluxoRadial2;
   var radialFluxoEntrada2 = req.body.fluxoRadial3;
   var radialFluxoSaida2 = req.body.fluxoRadial4;
   var radialFluxoEntrada3 = req.body.fluxoRadial5;
   var radialFluxoSaida3 = req.body.fluxoRadial6;
   var radialPosEntrada1 = req.body.posRadial1;
   var radialPosSaida1 = req.body.posRadial2;
   var radialPosEntrada2 = req.body.posRadial3;
   var radialPosSaida2 = req.body.posRadial4;
   var radialPosEntrada3 = req.body.posRadial5;
   var radialPosSaida3 = req.body.posRadial6;
   var radialTempoEntrada1 = req.body.tempoRadial1;
   var radialTempoSaida1 = req.body.tempoRadial2;
   var radialTempoEntrada2 = req.body.tempoRadial3;
   var radialTempoSaida2 = req.body.tempoRadial4;
   var radialTempoEntrada3 = req.body.tempoRadial5;
   var radialTempoSaida3 = req.body.tempoRadial6;
   var radialSCREntrada1 = req.body.scrcount1;
   var radialSCRSaida1 = req.body.scrcount2;
   var radialSCREntrada2 = req.body.scrcount3;
   var radialSCRSaida2 = req.body.scrcount4;
   var radialSCREntrada3 = req.body.scrcount5;
   var radialSCRSaida3 = req.body.scrcount6;

   var camara1 = req.body.camara1[0];
   var camara2 = req.body.camara2[0];
   var camara3 = req.body.camara3[0];
   var camara4 = req.body.camara4[0];
   var camara5 = req.body.camara5[0];
   var camara6 = req.body.camara6[0];
   var camara7 = req.body.camara7[0];
   var camara8 = req.body.camara1[1];
   var camara9 = req.body.camara2[1];
   var camara10 = req.body.camara3[1];
   var camara11 = req.body.camara4[1];
   var camara12 = req.body.camara5[1];
   var camara13 = req.body.camara6[1];
   var camara14 = req.body.camara7[1];
   var camara15 = req.body.camara1[2];
   var camara16 = req.body.camara2[2];
   var camara17 = req.body.camara3[2];
   var camara18 = req.body.camara4[2];
   var camara19 = req.body.camara5[2];
   var camara20 = req.body.camara6[2];
   var camara21 = req.body.camara7[2];
   var camara22 = req.body.camara1[3];
   var camara23 = req.body.camara2[3];
   var camara24 = req.body.camara3[3];
   var camara25 = req.body.camara4[3];
   var camara26 = req.body.camara5[3];
   var camara27 = req.body.camara6[3];
   var camara28 = req.body.camara7[3];
   var camara29 = req.body.camara1[4];
   var camara30 = req.body.camara2[4];
   var camara31 = req.body.camara3[4];
   var camara32 = req.body.camara4[4];
   var camara33 = req.body.camara5[4];
   var camara34 = req.body.camara6[4];
   var camara35 = req.body.camara7[4];
   var camara36 = req.body.camara1[5];
   var camara37 = req.body.camara2[5];
   var camara38 = req.body.camara3[5];
   var camara39 = req.body.camara4[5];
   var camara40 = req.body.camara5[5];
   var camara41 = req.body.camara6[5];
   var camara42 = req.body.camara7[5];
   var camara43 = req.body.camara1[6];
   var camara44 = req.body.camara2[6];
   var camara45 = req.body.camara3[6];
   var camara46 = req.body.camara4[6];
   var camara47 = req.body.camara5[6];
   var camara48 = req.body.camara6[6];
   var camara49 = req.body.camara7[6];
   var camara50 = req.body.camara1[7];
   var camara51 = req.body.camara2[7];
   var camara52 = req.body.camara3[7];
   var camara53 = req.body.camara4[7];
   var camara54 = req.body.camara5[7];
   var camara55 = req.body.camara6[7];
   var camara56 = req.body.camara7[7];
   var camara57 = req.body.camara1[8];
   var camara58 = req.body.camara2[8];
   var camara59 = req.body.camara3[8];
   var camara60 = req.body.camara4[8];
   var camara61 = req.body.camara5[8];
   var camara62 = req.body.camara6[8];
   var camara63 = req.body.camara7[8];
   var camara64 = req.body.camara1[9];
   var camara65 = req.body.camara2[9];
   var camara66 = req.body.camara3[9];
   var camara67 = req.body.camara4[9];
   var camara68 = req.body.camara5[9];
   var camara69 = req.body.camara6[9];
   var camara70 = req.body.camara7[9];
   var camara71 = req.body.camara1[10];
   var camara72 = req.body.camara2[10];
   var camara73 = req.body.camara3[10];
   var camara74 = req.body.camara4[10];
   var camara75 = req.body.camara5[10];
   var camara76 = req.body.camara6[10];
   var camara77 = req.body.camara7[10];
   var camara78 = req.body.camara1[11];
   var camara79 = req.body.camara2[11];
   var camara80 = req.body.camara3[11];
   var camara81 = req.body.camara4[11];
   var camara82 = req.body.camara5[11];
   var camara83 = req.body.camara6[11];
   var camara84 = req.body.camara7[11];
   var camara85 = req.body.camara1[12];
   var camara86 = req.body.camara2[12];
   var camara87 = req.body.camara3[12];
   var camara88 = req.body.camara4[12];
   var camara89 = req.body.camara5[12];
   var camara90 = req.body.camara6[12];
   var camara91 = req.body.camara7[12];
   var camara92 = req.body.camara1[13];
   var camara93 = req.body.camara2[13];
   var camara94 = req.body.camara3[13];
   var camara95 = req.body.camara4[13];
   var camara96 = req.body.camara5[13];
   var camara97 = req.body.camara6[13];
   var camara98 = req.body.camara7[13];
   var camara99 = req.body.camara1[14];
   var camara100 = req.body.camara2[14];
   var camara101 = req.body.camara3[14];
   var camara102 = req.body.camara4[14];
   var camara103 = req.body.camara5[14];
   var camara104 = req.body.camara6[14];
   var camara105 = req.body.camara7[14];
   var camara106 = req.body.camara1[15];
   var camara107 = req.body.camara2[15];
   var camara108 = req.body.camara3[15];
   var camara109 = req.body.camara4[15];
   var camara110 = req.body.camara5[15];
   var camara111 = req.body.camara6[15];
   var camara112 = req.body.camara7[15];
   var camara113 = req.body.camara1[16];
   var camara114 = req.body.camara2[16];
   var camara115 = req.body.camara3[16];
   var camara116 = req.body.camara4[16];
   var camara117 = req.body.camara5[16];
   var camara118 = req.body.camara6[16];
   var camara119 = req.body.camara7[16];
   var camara120 = req.body.camara1[17];
   var camara121 = req.body.camara2[17];
   var camara122 = req.body.camara3[17];
   var camara123 = req.body.camara4[17];
   var camara124 = req.body.camara5[17];
   var camara125 = req.body.camara6[17];
   var camara126 = req.body.camara7[17];
   var camara127 = req.body.camara1[18];
   var camara128 = req.body.camara2[18];
   var camara129 = req.body.camara3[18];
   var camara130 = req.body.camara4[18];
   var valve1 = req.body.VG1[0];
   var valve2 = req.body.VG2[0];
   var valve3 = req.body.VG3[0];
   var valve4 = req.body.VG4[0];
   var valve5 = req.body.VG5[0];
   var valve6 = req.body.VG6[0];
   var valve7 = req.body.VG7[0];
   var valve8 = req.body.VG1[1];
   var valve9 = req.body.VG2[1];
   var valve10 = req.body.VG3[1];
   var valve11 = req.body.VG4[1];
   var valve12 = req.body.VG5[1];
   var valve13 = req.body.VG6[1];
   var valve14 = req.body.VG7[1];
   var valve15 = req.body.VG1[2];
   var valve16 = req.body.VG2[2];
   var valve17 = req.body.VG3[2];
   var valve18 = req.body.VG4[2];
   var valve19 = req.body.VG5[2];
   var valve20 = req.body.VG6[2];
   var valve21 = req.body.VG7[2];
   var valve22 = req.body.VG1[3];
   var valve23 = req.body.VG2[3];
   var valve24 = req.body.VG3[3];
   var valve25 = req.body.VG4[3];
   var valve26 = req.body.VG5[3];
   var valve27 = req.body.VG6[3];
   var valve28 = req.body.VG7[3];
   var valve29 = req.body.VG1[4];
   var valve30 = req.body.VG2[4];
   var valve31 = req.body.VG3[4];
   var valve32 = req.body.VG4[4];
   var valve33 = req.body.VG5[4];
   var valve34 = req.body.VG6[4];
   var valve35 = req.body.VG7[4];
   var valve36 = req.body.VG1[5];
   var valve37 = req.body.VG2[5];
   var valve38 = req.body.VG3[5];
   var valve39 = req.body.VG4[5];
   var valve40 = req.body.VG5[5];
   var valve41 = req.body.VG6[5];
   var valve42 = req.body.VG7[5];
   var valve43 = req.body.VG1[6];
   var valve44 = req.body.VG2[6];
   var valve45 = req.body.VG3[6];
   var valve46 = req.body.VG4[6];
   var valve47 = req.body.VG5[6];
   var valve48 = req.body.VG6[6];
   var valve49 = req.body.VG7[6];
   var valve50 = req.body.VG1[7];
   var valve51 = req.body.VG2[7];
   var valve52 = req.body.VG3[7];
   var valve53 = req.body.VG4[7];
   var valve54 = req.body.VG5[7];
   var valve55 = req.body.VG6[7];
   var valve56 = req.body.VG7[7];
   var valve57 = req.body.VG1[8];
   var valve58 = req.body.VG2[8];
   var valve59 = req.body.VG3[8];
   var valve60 = req.body.VG4[8];
   var valve61 = req.body.VG5[8];
   var valve62 = req.body.VG6[8];
   var valve63 = req.body.VG7[8];
   var valve64 = req.body.VG1[9];
   var valve65 = req.body.VG2[9];
   var valve66 = req.body.VG3[9];
   var valve67 = req.body.VG4[9];
   var valve68 = req.body.VG5[9];
   var valve69 = req.body.VG6[9];
   var valve70 = req.body.VG7[9];
   var valve71 = req.body.VG1[10];
   var valve72 = req.body.VG2[10];
   var valve73 = req.body.VG3[10];
   var valve74 = req.body.VG4[10];
   var valve75 = req.body.VG5[10];
   var valve76 = req.body.VG6[10];
   var valve77 = req.body.VG7[10];
   var valve78 = req.body.VG1[11];
   var valve79 = req.body.VG2[11];
   var valve80 = req.body.VG3[11];
   var valve81 = req.body.VG4[11];
   var valve82 = req.body.VG5[11];
   var valve83 = req.body.VG6[11];
   var valve84 = req.body.VG7[11];
   var valve85 = req.body.VG1[12];
   var valve86 = req.body.VG2[12];
   var valve87 = req.body.VG3[12];
   var valve88 = req.body.VG4[12];
   var valve89 = req.body.VG5[12];
   var valve90 = req.body.VG6[12];
   var refrLadoFixo1 = req.body.rmladofixo1;
   var refrLadoFixo2 = req.body.rmladomovel1;
   var refrLadoMovel1 = req.body.rmladofixo2;
   var refrLadoMovel2 = req.body.rmladomovel2;
   var vaporLadoFixo1 = req.body.valorladofixo;
   var vaporLadoFixo2 = req.body.valorladomovel;

   //*salvando os dados
   FichaTecnicaPastoreInjetores.create({
      maq: maquina,
      cilindro1: cilindro1,
      cilindro2: cilindro2,
      cilindro3: cilindro3,
      cilindro4: cilindro4,
      cilindro5: cilindro5,
      cilindro6: cilindro6,
      cilindro7: cilindro7,
      posComut: posComut,
      posInjecao1: posInjecao1,
      posInjecao2: posInjecao2,
      posInjecao3: posInjecao3,
      posInjecao4: posInjecao4,
      posInjecao5: posInjecao5,
      presComut: presComut,
      presInjecao1: presInjecao1,
      presInjecao2: presInjecao2,
      presInjecao3: presInjecao3,
      presInjecao4: presInjecao4,
      presInjecao5: presInjecao5,
      fluxoInjecao1: fluxoInjecao1,
      fluxoInjecao2: fluxoInjecao2,
      fluxoInjecao3: fluxoInjecao3,
      fluxoInjecao4: fluxoInjecao4,
      fluxoInjecao5: fluxoInjecao5,
      tempoDisparo: tempoDisparo,
      pressaoInj: pressaoInj,
      presRecalque1: presRecalque1,
      presRecalque2: presRecalque2,
      presRecalque3: presRecalque3,
      presRecalque4: presRecalque4,
      presRecalque5: presRecalque5,
      fluxoRecalque1: fluxoRecalque1,
      fluxoRecalque2: fluxoRecalque2,
      fluxoRecalque3: fluxoRecalque3,
      fluxoRecalque4: fluxoRecalque4,
      fluxoRecalque5: fluxoRecalque5,
      tempoRecalque1: tempoRecalque1,
      tempoRecalque2: tempoRecalque2,
      tempoRecalque3: tempoRecalque3,
      tempoRecalque4: tempoRecalque4,
      tempoRecalque5: tempoRecalque5,
      partDosagem1: partDosagem1,
      partDosagem2: partDosagem2,
      partDosagem3: partDosagem3,
      partDosagem4: partDosagem4,
      partDosagem5: partDosagem5,
      presDosagem1: presDosagem1,
      presDosagem2: presDosagem2,
      presDosagem3: presDosagem3,
      presDosagem4: presDosagem4,
      presDosagem5: presDosagem5,
      fluxoDosagem1: fluxoDosagem1,
      fluxoDosagem2: fluxoDosagem2,
      fluxoDosagem3: fluxoDosagem3,
      fluxoDosagem4: fluxoDosagem4,
      fluxoDosagem5: fluxoDosagem5,
      CPDosagem1: CPDosagem1,
      CPDosagem2: CPDosagem2,
      CPDosagem3: CPDosagem3,
      CPDosagem4: CPDosagem4,
      CPDosagem5: CPDosagem5,
      tempoDosagem: tempoDosagem,
      antesPos: antesPos,
      antesPres: antesPres,
      antesFluxo: antesFluxo,
      antesTempo: antesTempo,
      depoisPos: depoisPos,
      depoisPres: depoisPres,
      depoisFluxo: depoisFluxo,
      depoisTempo: depoisTempo,
      posFecha1: posFecha1,
      posFecha2: posFecha2,
      posFecha3: posFecha3,
      protMPos: protMPos,
      AltaPresPos: AltaPresPos,
      presFecha1: presFecha1,
      presFecha2: presFecha2,
      presFecha3: presFecha3,
      protMPres: protMPres,
      AltaPresPres: AltaPresPres,
      fluxoFecha1: fluxoFecha1,
      fluxoFecha2: fluxoFecha2,
      fluxoFecha3: fluxoFecha3,
      protMFluxo: protMFluxo,
      AltaPresFluxo: AltaPresFluxo,
      tempoProtMolde: tempoProtMolde,
      tempoFecha: tempoFecha,
      posAbertura1: posAbertura1,
      posAbertura2: posAbertura2,
      posAbertura3: posAbertura3,
      posAbertura4: posAbertura4,
      posAbertura5: posAbertura5,
      presAbertura1: presAbertura1,
      presAbertura2: presAbertura2,
      presAbertura3: presAbertura3,
      presAbertura4: presAbertura4,
      presAbertura5: presAbertura5,
      fluxoAbertura1: fluxoAbertura1,
      fluxoAbertura2: fluxoAbertura2,
      fluxoAbertura3: fluxoAbertura3,
      fluxoAbertura4: fluxoAbertura4,
      fluxoAbertura5: fluxoAbertura5,
      resfriamento: resfriamento,
      tempoAbertura: tempoAbertura,
      posAvanco1: posAvanco1,
      posAvanco2: posAvanco2,
      posAvanco3: posAvanco3,
      posRecuo1: posRecuo1,
      posRecuo2: posRecuo2,
      posRecuo3: posRecuo3,
      presAvanco1: presAvanco1,
      presAvanco2: presAvanco2,
      presAvanco3: presAvanco3,
      presRecuo1: presRecuo1,
      presRecuo2: presRecuo2,
      presRecuo3: presRecuo3,
      fluxoAvanco1: fluxoAvanco1,
      fluxoAvanco2: fluxoAvanco2,
      fluxoAvanco3: fluxoAvanco3,
      fluxoRecuo1: fluxoRecuo1,
      fluxoRecuo2: fluxoRecuo2,
      fluxoRecuo3: fluxoRecuo3,
      atraso: atraso,
      batida: batida,
      radialTypeEntrada1: radialTypeEntrada1,
      radialTypeSaida1: radialTypeSaida1,
      radialTypeEntrada2: radialTypeEntrada2,
      radialTypeSaida2: radialTypeSaida2,
      radialPresEntrada1: radialPresEntrada1,
      radialPresSaida1: radialPresSaida1,
      radialPresEntrada2: radialPresEntrada2,
      radialPresSaida2: radialPresSaida2,
      radialPresEntrada3: radialPresEntrada3,
      radialPresSaida3: radialPresSaida3,
      radialFluxoEntrada1: radialFluxoEntrada1,
      radialFluxoSaida1: radialFluxoSaida1,
      radialFluxoEntrada2: radialFluxoEntrada2,
      radialFluxoSaida2: radialFluxoSaida2,
      radialFluxoEntrada3: radialFluxoEntrada3,
      radialFluxoSaida3: radialFluxoSaida3,
      radialPosEntrada1: radialPosEntrada1,
      radialPosSaida1: radialPosSaida1,
      radialPosEntrada2: radialPosEntrada2,
      radialPosSaida2: radialPosSaida2,
      radialPosEntrada3: radialPosEntrada3,
      radialPosSaida3: radialPosSaida3,
      radialTempoEntrada1: radialTempoEntrada1,
      radialTempoSaida1: radialTempoSaida1,
      radialTempoEntrada2: radialTempoEntrada2,
      radialTempoSaida2: radialTempoSaida2,
      radialTempoEntrada3: radialTempoEntrada3,
      radialTempoSaida3: radialTempoSaida3,
      radialSCREntrada1: radialSCREntrada1,
      radialSCRSaida1: radialSCRSaida1,
      radialSCREntrada2: radialSCREntrada2,
      radialSCRSaida2: radialSCRSaida2,
      radialSCREntrada3: radialSCREntrada3,
      radialSCRSaida3: radialSCRSaida3,
   }).then(() => {

      FichaPastorePerifericos.create({
         maq: maquina,
         camara1: camara1,
         camara2: camara2,
         camara3: camara3,
         camara4: camara4,
         camara5: camara5,
         camara6: camara6,
         camara7: camara7,
         camara8: camara8,
         camara9: camara9,
         camara10: camara10,
         camara11: camara11,
         camara12: camara12,
         camara13: camara13,
         camara14: camara14,
         camara15: camara15,
         camara16: camara16,
         camara17: camara17,
         camara18: camara18,
         camara19: camara19,
         camara20: camara20,
         camara21: camara21,
         camara22: camara22,
         camara23: camara23,
         camara24: camara24,
         camara25: camara25,
         camara26: camara26,
         camara27: camara27,
         camara28: camara28,
         camara29: camara29,
         camara30: camara30,
         camara31: camara31,
         camara32: camara32,
         camara33: camara33,
         camara34: camara34,
         camara35: camara35,
         camara36: camara36,
         camara37: camara37,
         camara38: camara38,
         camara39: camara39,
         camara40: camara40,
         camara41: camara41,
         camara42: camara42,
         camara43: camara43,
         camara44: camara44,
         camara45: camara45,
         camara46: camara46,
         camara47: camara47,
         camara48: camara48,
         camara49: camara49,
         camara50: camara50,
         camara51: camara51,
         camara52: camara52,
         camara53: camara53,
         camara54: camara54,
         camara55: camara55,
         camara56: camara56,
         camara57: camara57,
         camara58: camara58,
         camara59: camara59,
         camara60: camara60,
         camara61: camara61,
         camara62: camara62,
         camara63: camara63,
         camara64: camara64,
         camara65: camara65,
         camara66: camara66,
         camara67: camara67,
         camara68: camara68,
         camara69: camara69,
         camara70: camara70,
         camara71: camara71,
         camara72: camara72,
         camara73: camara73,
         camara74: camara74,
         camara75: camara75,
         camara76: camara76,
         camara77: camara77,
         camara78: camara78,
         camara79: camara79,
         camara80: camara80,
         camara81: camara81,
         camara82: camara82,
         camara83: camara83,
         camara84: camara84,
         camara85: camara85,
         camara86: camara86,
         camara87: camara87,
         camara88: camara88,
         camara89: camara89,
         camara90: camara90,
         camara91: camara91,
         camara92: camara92,
         camara93: camara93,
         camara94: camara94,
         camara95: camara95,
         camara96: camara96,
         camara97: camara97,
         camara98: camara98,
         camara99: camara99,
         camara100: camara100,
         camara101: camara101,
         camara102: camara102,
         camara103: camara103,
         camara104: camara104,
         camara105: camara105,
         camara106: camara106,
         camara107: camara107,
         camara108: camara108,
         camara109: camara109,
         camara110: camara110,
         camara111: camara111,
         camara112: camara112,
         camara113: camara113,
         camara114: camara114,
         camara115: camara115,
         camara116: camara116,
         camara117: camara117,
         camara118: camara118,
         camara119: camara119,
         camara120: camara120,
         camara121: camara121,
         camara122: camara122,
         camara123: camara123,
         camara124: camara124,
         camara125: camara125,
         camara126: camara126,
         camara127: camara127,
         camara128: camara128,
         camara129: camara129,
         camara130: camara130,
         valve1: valve1,
         valve2: valve2,
         valve3: valve3,
         valve4: valve4,
         valve5: valve5,
         valve6: valve6,
         valve7: valve7,
         valve8: valve8,
         valve9: valve9,
         valve10: valve10,
         valve11: valve11,
         valve12: valve12,
         valve13: valve13,
         valve14: valve14,
         valve15: valve15,
         valve16: valve16,
         valve17: valve17,
         valve18: valve18,
         valve19: valve19,
         valve20: valve20,
         valve21: valve21,
         valve22: valve22,
         valve23: valve23,
         valve24: valve24,
         valve25: valve25,
         valve26: valve26,
         valve27: valve27,
         valve28: valve28,
         valve29: valve29,
         valve30: valve30,
         valve31: valve31,
         valve32: valve32,
         valve33: valve33,
         valve34: valve34,
         valve35: valve35,
         valve36: valve36,
         valve37: valve37,
         valve38: valve38,
         valve39: valve39,
         valve40: valve40,
         valve41: valve41,
         valve42: valve42,
         valve43: valve43,
         valve44: valve44,
         valve45: valve45,
         valve46: valve46,
         valve47: valve47,
         valve48: valve48,
         valve49: valve49,
         valve50: valve50,
         valve51: valve51,
         valve52: valve52,
         valve53: valve53,
         valve54: valve54,
         valve55: valve55,
         valve56: valve56,
         valve57: valve57,
         valve58: valve58,
         valve59: valve59,
         valve60: valve60,
         valve61: valve61,
         valve62: valve62,
         valve63: valve63,
         valve64: valve64,
         valve65: valve65,
         valve66: valve66,
         valve67: valve67,
         valve68: valve68,
         valve69: valve69,
         valve70: valve70,
         valve71: valve71,
         valve72: valve72,
         valve73: valve73,
         valve74: valve74,
         valve75: valve75,
         valve76: valve76,
         valve77: valve77,
         valve78: valve78,
         valve79: valve79,
         valve80: valve80,
         valve81: valve81,
         valve82: valve82,
         valve83: valve83,
         valve84: valve84,
         valve85: valve85,
         valve86: valve86,
         valve87: valve87,
         valve88: valve88,
         valve89: valve89,
         valve90: valve90,
         refrLadoFixo1: refrLadoFixo1,
         refrLadoFixo2: refrLadoFixo2,
         refrLadoMovel1: refrLadoMovel1,
         refrLadoMovel2: refrLadoMovel2,
         vaporLadoFixo1: vaporLadoFixo1,
         vaporLadoFixo2: vaporLadoFixo2,
      }).then(data => {
         //*salvando os dados no banco de revisao
         RevisaoFichaTecnicaPastorePerifericos.create({
            idFichaTecnica: data.id,
            maq: maquina,
            camara1: camara1,
            camara2: camara2,
            camara3: camara3,
            camara4: camara4,
            camara5: camara5,
            camara6: camara6,
            camara7: camara7,
            camara8: camara8,
            camara9: camara9,
            camara10: camara10,
            camara11: camara11,
            camara12: camara12,
            camara13: camara13,
            camara14: camara14,
            camara15: camara15,
            camara16: camara16,
            camara17: camara17,
            camara18: camara18,
            camara19: camara19,
            camara20: camara20,
            camara21: camara21,
            camara22: camara22,
            camara23: camara23,
            camara24: camara24,
            camara25: camara25,
            camara26: camara26,
            camara27: camara27,
            camara28: camara28,
            camara29: camara29,
            camara30: camara30,
            camara31: camara31,
            camara32: camara32,
            camara33: camara33,
            camara34: camara34,
            camara35: camara35,
            camara36: camara36,
            camara37: camara37,
            camara38: camara38,
            camara39: camara39,
            camara40: camara40,
            camara41: camara41,
            camara42: camara42,
            camara43: camara43,
            camara44: camara44,
            camara45: camara45,
            camara46: camara46,
            camara47: camara47,
            camara48: camara48,
            camara49: camara49,
            camara50: camara50,
            camara51: camara51,
            camara52: camara52,
            camara53: camara53,
            camara54: camara54,
            camara55: camara55,
            camara56: camara56,
            camara57: camara57,
            camara58: camara58,
            camara59: camara59,
            camara60: camara60,
            camara61: camara61,
            camara62: camara62,
            camara63: camara63,
            camara64: camara64,
            camara65: camara65,
            camara66: camara66,
            camara67: camara67,
            camara68: camara68,
            camara69: camara69,
            camara70: camara70,
            camara71: camara71,
            camara72: camara72,
            camara73: camara73,
            camara74: camara74,
            camara75: camara75,
            camara76: camara76,
            camara77: camara77,
            camara78: camara78,
            camara79: camara79,
            camara80: camara80,
            camara81: camara81,
            camara82: camara82,
            camara83: camara83,
            camara84: camara84,
            camara85: camara85,
            camara86: camara86,
            camara87: camara87,
            camara88: camara88,
            camara89: camara89,
            camara90: camara90,
            camara91: camara91,
            camara92: camara92,
            camara93: camara93,
            camara94: camara94,
            camara95: camara95,
            camara96: camara96,
            camara97: camara97,
            camara98: camara98,
            camara99: camara99,
            camara100: camara100,
            camara101: camara101,
            camara102: camara102,
            camara103: camara103,
            camara104: camara104,
            camara105: camara105,
            camara106: camara106,
            camara107: camara107,
            camara108: camara108,
            camara109: camara109,
            camara110: camara110,
            camara111: camara111,
            camara112: camara112,
            camara113: camara113,
            camara114: camara114,
            camara115: camara115,
            camara116: camara116,
            camara117: camara117,
            camara118: camara118,
            camara119: camara119,
            camara120: camara120,
            camara121: camara121,
            camara122: camara122,
            camara123: camara123,
            camara124: camara124,
            camara125: camara125,
            camara126: camara126,
            camara127: camara127,
            camara128: camara128,
            camara129: camara129,
            camara130: camara130,
            valve1: valve1,
            valve2: valve2,
            valve3: valve3,
            valve4: valve4,
            valve5: valve5,
            valve6: valve6,
            valve7: valve7,
            valve8: valve8,
            valve9: valve9,
            valve10: valve10,
            valve11: valve11,
            valve12: valve12,
            valve13: valve13,
            valve14: valve14,
            valve15: valve15,
            valve16: valve16,
            valve17: valve17,
            valve18: valve18,
            valve19: valve19,
            valve20: valve20,
            valve21: valve21,
            valve22: valve22,
            valve23: valve23,
            valve24: valve24,
            valve25: valve25,
            valve26: valve26,
            valve27: valve27,
            valve28: valve28,
            valve29: valve29,
            valve30: valve30,
            valve31: valve31,
            valve32: valve32,
            valve33: valve33,
            valve34: valve34,
            valve35: valve35,
            valve36: valve36,
            valve37: valve37,
            valve38: valve38,
            valve39: valve39,
            valve40: valve40,
            valve41: valve41,
            valve42: valve42,
            valve43: valve43,
            valve44: valve44,
            valve45: valve45,
            valve46: valve46,
            valve47: valve47,
            valve48: valve48,
            valve49: valve49,
            valve50: valve50,
            valve51: valve51,
            valve52: valve52,
            valve53: valve53,
            valve54: valve54,
            valve55: valve55,
            valve56: valve56,
            valve57: valve57,
            valve58: valve58,
            valve59: valve59,
            valve60: valve60,
            valve61: valve61,
            valve62: valve62,
            valve63: valve63,
            valve64: valve64,
            valve65: valve65,
            valve66: valve66,
            valve67: valve67,
            valve68: valve68,
            valve69: valve69,
            valve70: valve70,
            valve71: valve71,
            valve72: valve72,
            valve73: valve73,
            valve74: valve74,
            valve75: valve75,
            valve76: valve76,
            valve77: valve77,
            valve78: valve78,
            valve79: valve79,
            valve80: valve80,
            valve81: valve81,
            valve82: valve82,
            valve83: valve83,
            valve84: valve84,
            valve85: valve85,
            valve86: valve86,
            valve87: valve87,
            valve88: valve88,
            valve89: valve89,
            valve90: valve90,
            refrLadoFixo1: refrLadoFixo1,
            refrLadoFixo2: refrLadoFixo2,
            refrLadoMovel1: refrLadoMovel1,
            refrLadoMovel2: refrLadoMovel2,
            vaporLadoFixo1: vaporLadoFixo1,
            vaporLadoFixo2: vaporLadoFixo2,
         }).then(() => {

            RevisaoFichaTecnicaPastoreInjetores.create({
               idFichaTecnica: data.id,
               maq: maquina,
               cilindro1: cilindro1,
               cilindro2: cilindro2,
               cilindro3: cilindro3,
               cilindro4: cilindro4,
               cilindro5: cilindro5,
               cilindro6: cilindro6,
               cilindro7: cilindro7,
               posComut: posComut,
               posInjecao1: posInjecao1,
               posInjecao2: posInjecao2,
               posInjecao3: posInjecao3,
               posInjecao4: posInjecao4,
               posInjecao5: posInjecao5,
               presComut: presComut,
               presInjecao1: presInjecao1,
               presInjecao2: presInjecao2,
               presInjecao3: presInjecao3,
               presInjecao4: presInjecao4,
               presInjecao5: presInjecao5,
               fluxoInjecao1: fluxoInjecao1,
               fluxoInjecao2: fluxoInjecao2,
               fluxoInjecao3: fluxoInjecao3,
               fluxoInjecao4: fluxoInjecao4,
               fluxoInjecao5: fluxoInjecao5,
               tempoDisparo: tempoDisparo,
               pressaoInj: pressaoInj,
               presRecalque1: presRecalque1,
               presRecalque2: presRecalque2,
               presRecalque3: presRecalque3,
               presRecalque4: presRecalque4,
               presRecalque5: presRecalque5,
               fluxoRecalque1: fluxoRecalque1,
               fluxoRecalque2: fluxoRecalque2,
               fluxoRecalque3: fluxoRecalque3,
               fluxoRecalque4: fluxoRecalque4,
               fluxoRecalque5: fluxoRecalque5,
               tempoRecalque1: tempoRecalque1,
               tempoRecalque2: tempoRecalque2,
               tempoRecalque3: tempoRecalque3,
               tempoRecalque4: tempoRecalque4,
               tempoRecalque5: tempoRecalque5,
               partDosagem1: partDosagem1,
               partDosagem2: partDosagem2,
               partDosagem3: partDosagem3,
               partDosagem4: partDosagem4,
               partDosagem5: partDosagem5,
               presDosagem1: presDosagem1,
               presDosagem2: presDosagem2,
               presDosagem3: presDosagem3,
               presDosagem4: presDosagem4,
               presDosagem5: presDosagem5,
               fluxoDosagem1: fluxoDosagem1,
               fluxoDosagem2: fluxoDosagem2,
               fluxoDosagem3: fluxoDosagem3,
               fluxoDosagem4: fluxoDosagem4,
               fluxoDosagem5: fluxoDosagem5,
               CPDosagem1: CPDosagem1,
               CPDosagem2: CPDosagem2,
               CPDosagem3: CPDosagem3,
               CPDosagem4: CPDosagem4,
               CPDosagem5: CPDosagem5,
               tempoDosagem: tempoDosagem,
               antesPos: antesPos,
               antesPres: antesPres,
               antesFluxo: antesFluxo,
               antesTempo: antesTempo,
               depoisPos: depoisPos,
               depoisPres: depoisPres,
               depoisFluxo: depoisFluxo,
               depoisTempo: depoisTempo,
               posFecha1: posFecha1,
               posFecha2: posFecha2,
               posFecha3: posFecha3,
               protMPos: protMPos,
               AltaPresPos: AltaPresPos,
               presFecha1: presFecha1,
               presFecha2: presFecha2,
               presFecha3: presFecha3,
               protMPres: protMPres,
               AltaPresPres: AltaPresPres,
               fluxoFecha1: fluxoFecha1,
               fluxoFecha2: fluxoFecha2,
               fluxoFecha3: fluxoFecha3,
               protMFluxo: protMFluxo,
               AltaPresFluxo: AltaPresFluxo,
               tempoProtMolde: tempoProtMolde,
               tempoFecha: tempoFecha,
               posAbertura1: posAbertura1,
               posAbertura2: posAbertura2,
               posAbertura3: posAbertura3,
               posAbertura4: posAbertura4,
               posAbertura5: posAbertura5,
               presAbertura1: presAbertura1,
               presAbertura2: presAbertura2,
               presAbertura3: presAbertura3,
               presAbertura4: presAbertura4,
               presAbertura5: presAbertura5,
               fluxoAbertura1: fluxoAbertura1,
               fluxoAbertura2: fluxoAbertura2,
               fluxoAbertura3: fluxoAbertura3,
               fluxoAbertura4: fluxoAbertura4,
               fluxoAbertura5: fluxoAbertura5,
               resfriamento: resfriamento,
               tempoAbertura: tempoAbertura,
               posAvanco1: posAvanco1,
               posAvanco2: posAvanco2,
               posAvanco3: posAvanco3,
               posRecuo1: posRecuo1,
               posRecuo2: posRecuo2,
               posRecuo3: posRecuo3,
               presAvanco1: presAvanco1,
               presAvanco2: presAvanco2,
               presAvanco3: presAvanco3,
               presRecuo1: presRecuo1,
               presRecuo2: presRecuo2,
               presRecuo3: presRecuo3,
               fluxoAvanco1: fluxoAvanco1,
               fluxoAvanco2: fluxoAvanco2,
               fluxoAvanco3: fluxoAvanco3,
               fluxoRecuo1: fluxoRecuo1,
               fluxoRecuo2: fluxoRecuo2,
               fluxoRecuo3: fluxoRecuo3,
               atraso: atraso,
               batida: batida,
               radialTypeEntrada1: radialTypeEntrada1,
               radialTypeSaida1: radialTypeSaida1,
               radialTypeEntrada2: radialTypeEntrada2,
               radialTypeSaida2: radialTypeSaida2,
               radialPresEntrada1: radialPresEntrada1,
               radialPresSaida1: radialPresSaida1,
               radialPresEntrada2: radialPresEntrada2,
               radialPresSaida2: radialPresSaida2,
               radialPresEntrada3: radialPresEntrada3,
               radialPresSaida3: radialPresSaida3,
               radialFluxoEntrada1: radialFluxoEntrada1,
               radialFluxoSaida1: radialFluxoSaida1,
               radialFluxoEntrada2: radialFluxoEntrada2,
               radialFluxoSaida2: radialFluxoSaida2,
               radialFluxoEntrada3: radialFluxoEntrada3,
               radialFluxoSaida3: radialFluxoSaida3,
               radialPosEntrada1: radialPosEntrada1,
               radialPosSaida1: radialPosSaida1,
               radialPosEntrada2: radialPosEntrada2,
               radialPosSaida2: radialPosSaida2,
               radialPosEntrada3: radialPosEntrada3,
               radialPosSaida3: radialPosSaida3,
               radialTempoEntrada1: radialTempoEntrada1,
               radialTempoSaida1: radialTempoSaida1,
               radialTempoEntrada2: radialTempoEntrada2,
               radialTempoSaida2: radialTempoSaida2,
               radialTempoEntrada3: radialTempoEntrada3,
               radialTempoSaida3: radialTempoSaida3,
               radialSCREntrada1: radialSCREntrada1,
               radialSCRSaida1: radialSCRSaida1,
               radialSCREntrada2: radialSCREntrada2,
               radialSCRSaida2: radialSCRSaida2,
               radialSCREntrada3: radialSCREntrada3,
               radialSCRSaida3: radialSCRSaida3,
            }).then(() => {
               res.redirect("/novaficha")
            })
         })
      })
   })
})

// *ATUALIZANDO FICHA PASTORE
router.post("/fichas/updateHaitian",(req,res) => {
   var id = req.body.id;
   var maquina = req.body.maquina;
   var cilindro1 = req.body.cilindro1;
   var cilindro2 = req.body.cilindro2;
   var cilindro3 = req.body.cilindro3;
   var cilindro4 = req.body.cilindro4;
   var cilindro5 = req.body.cilindro5;
   var cilindro6 = req.body.cilindro6;
   var cilindro7 = req.body.cilindro7;
   var posComut = req.body.posComutacao;
   var posInjecao1 = req.body.posInj5;
   var posInjecao2 = req.body.posInj4;
   var posInjecao3 = req.body.posInj3;
   var posInjecao4 = req.body.posInj2;
   var posInjecao5 = req.body.posInj1;
   var presComut = req.body.presComutacao;
   var presInjecao1 = req.body.presInj5;
   var presInjecao2 = req.body.presInj4;
   var presInjecao3 = req.body.presInj3;
   var presInjecao4 = req.body.presInj2;
   var presInjecao5 = req.body.presInj1;
   var fluxoInjecao1 = req.body.fluxoInj5;
   var fluxoInjecao2 = req.body.fluxoInj4;
   var fluxoInjecao3 = req.body.fluxoInj3;
   var fluxoInjecao4 = req.body.fluxoInj2;
   var fluxoInjecao5 = req.body.fluxoInj1;
   var tempoDisparo = req.body.tempoDisparo;
   var pressaoInj = req.body.pressaoInj;
   var presRecalque1 = req.body.presRecalque5;
   var presRecalque2 = req.body.presRecalque4;
   var presRecalque3 = req.body.presRecalque3;
   var presRecalque4 = req.body.presRecalque2;
   var presRecalque5 = req.body.presRecalque1;
   var fluxoRecalque1 = req.body.fluxoRecalque5;
   var fluxoRecalque2 = req.body.fluxoRecalque4;
   var fluxoRecalque3 = req.body.fluxoRecalque3;
   var fluxoRecalque4 = req.body.fluxoRecalque2;
   var fluxoRecalque5 = req.body.fluxoRecalque1;
   var tempoRecalque1 = req.body.tempoRecalque5;
   var tempoRecalque2 = req.body.tempoRecalque4;
   var tempoRecalque3 = req.body.tempoRecalque3;
   var tempoRecalque4 = req.body.tempoRecalque2;
   var tempoRecalque5 = req.body.tempoRecalque1;
   var partDosagem1 = req.body.partDosagem5;
   var partDosagem2 = req.body.partDosagem4;
   var partDosagem3 = req.body.partDosagem3;
   var partDosagem4 = req.body.partDosagem2;
   var partDosagem5 = req.body.partDosagem1;
   var presDosagem1 = req.body.presDosagem1;
   var presDosagem2 = req.body.presDosagem1;
   var presDosagem3 = req.body.presDosagem1;
   var presDosagem4 = req.body.presDosagem1;
   var presDosagem5 = req.body.presDosagem1;
   var fluxoDosagem1 = req.body.fluxoDosagem5;
   var fluxoDosagem2 = req.body.fluxoDosagem4;
   var fluxoDosagem3 = req.body.fluxoDosagem3;
   var fluxoDosagem4 = req.body.fluxoDosagem2;
   var fluxoDosagem5 = req.body.fluxoDosagem1;
   var CPDosagem1 = req.body.CPDosagem5;
   var CPDosagem2 = req.body.CPDosagem4;
   var CPDosagem3 = req.body.CPDosagem3;
   var CPDosagem4 = req.body.CPDosagem2;
   var CPDosagem5 = req.body.CPDosagem1;
   var tempoDosagem = req.body.tempoDosagem;
   var antesPos = req.body.antes1;
   var antesPres = req.body.antes2;
   var antesFluxo = req.body.antes3;
   var antesTempo = req.body.antes4;
   var depoisPos = req.body.depois1;
   var depoisPres = req.body.depois2;
   var depoisFluxo = req.body.depois3;
   var depoisTempo = req.body.depois4;
   var posFecha1 = req.body.posFech1;
   var posFecha2 = req.body.posFech2;
   var posFecha3 = req.body.posFech3;
   var protMPos = req.body.protMPos;
   var AltaPresPos = req.body.AltaPresPos;
   var presFecha1 = req.body.presFech1;
   var presFecha2 = req.body.presFech2;
   var presFecha3 = req.body.presFech3;
   var protMPres = req.body.protMPres;
   var AltaPresPres = req.body.AltaPresPressao;
   var fluxoFecha1 = req.body.fluxoFech1;
   var fluxoFecha2 = req.body.fluxoFech2;
   var fluxoFecha3 = req.body.fluxoFech3;
   var protMFluxo = req.body.protMFluxo;
   var AltaPresFluxo = req.body.AltaPresFluxo;
   var tempoProtMolde = req.body.tempoProtMolde;
   var tempoFecha = req.body.tempoFecha;
   var posAbertura1 = req.body.posAbertura5;
   var posAbertura2 = req.body.posAbertura4;
   var posAbertura3 = req.body.posAbertura3;
   var posAbertura4 = req.body.posAbertura2;
   var posAbertura5 = req.body.posAbertura1;
   var presAbertura1 = req.body.presAbertura5;
   var presAbertura2 = req.body.presAbertura4;
   var presAbertura3 = req.body.presAbertura3;
   var presAbertura4 = req.body.presAbertura2;
   var presAbertura5 = req.body.presAbertura1;
   var fluxoAbertura1 = req.body.fluxoAbertura5;
   var fluxoAbertura2 = req.body.fluxoAbertura4;
   var fluxoAbertura3 = req.body.fluxoAbertura3;
   var fluxoAbertura4 = req.body.fluxoAbertura2;
   var fluxoAbertura5 = req.body.fluxoAbertura1;
   var resfriamento = req.body.resfriamento;
   var tempoAbertura = req.body.tempoAbertura;
   var posAvanco1 = req.body.posAvanco1;
   var posAvanco2 = req.body.posAvanco2;
   var posAvanco3 = req.body.posAvanco3;
   var posRecuo1 = req.body.posRecuo1;
   var posRecuo2 = req.body.posRecuo2;
   var posRecuo3 = req.body.posRecuo3;
   var presAvanco1 = req.body.presAvanco1;
   var presAvanco2 = req.body.presAvanco2;
   var presAvanco3 = req.body.presAvanco3;
   var presRecuo1 = req.body.presRecuo1;
   var presRecuo2 = req.body.presRecuo2;
   var presRecuo3 = req.body.presRecuo3;
   var fluxoAvanco1 = req.body.fluxoAvanco1;
   var fluxoAvanco2 = req.body.fluxoAvanco2;
   var fluxoAvanco3 = req.body.fluxoAvanco3;
   var fluxoRecuo1 = req.body.fluxoRecuo1;
   var fluxoRecuo2 = req.body.fluxoRecuo2;
   var fluxoRecuo3 = req.body.fluxoRecuo3;
   var atraso = req.body.atraso;
   var batida = req.body.batida;
   var radialTypeEntrada1 = req.body.type1;
   var radialTypeSaida1 = req.body.type2;
   var radialTypeEntrada2 = req.body.type3;
   var radialTypeSaida2 = req.body.type4;
   var radialPresEntrada1 = req.body.pressaoRadial1;
   var radialPresSaida1 = req.body.pressaoRadial2;
   var radialPresEntrada2 = req.body.pressaoRadial3;
   var radialPresSaida2 = req.body.pressaoRadial4;
   var radialPresEntrada3 = req.body.pressaoRadial5;
   var radialPresSaida3 = req.body.pressaoRadial6;
   var radialFluxoEntrada1 = req.body.fluxoRadial1;
   var radialFluxoSaida1 = req.body.fluxoRadial2;
   var radialFluxoEntrada2 = req.body.fluxoRadial3;
   var radialFluxoSaida2 = req.body.fluxoRadial4;
   var radialFluxoEntrada3 = req.body.fluxoRadial5;
   var radialFluxoSaida3 = req.body.fluxoRadial6;
   var radialPosEntrada1 = req.body.posRadial1;
   var radialPosSaida1 = req.body.posRadial2;
   var radialPosEntrada2 = req.body.posRadial3;
   var radialPosSaida2 = req.body.posRadial4;
   var radialPosEntrada3 = req.body.posRadial5;
   var radialPosSaida3 = req.body.posRadial6;
   var radialTempoEntrada1 = req.body.tempoRadial1;
   var radialTempoSaida1 = req.body.tempoRadial2;
   var radialTempoEntrada2 = req.body.tempoRadial3;
   var radialTempoSaida2 = req.body.tempoRadial4;
   var radialTempoEntrada3 = req.body.tempoRadial5;
   var radialTempoSaida3 = req.body.tempoRadial6;
   var radialSCREntrada1 = req.body.scrcount1;
   var radialSCRSaida1 = req.body.scrcount2;
   var radialSCREntrada2 = req.body.scrcount3;
   var radialSCRSaida2 = req.body.scrcount4;
   var radialSCREntrada3 = req.body.scrcount5;
   var radialSCRSaida3 = req.body.scrcount6;

   var camara1 = req.body.camara1;
   var camara2 = req.body.camara2;
   var camara3 = req.body.camara3;
   var camara4 = req.body.camara4;
   var camara5 = req.body.camara5;
   var camara6 = req.body.camara6;
   var camara7 = req.body.camara7;
   var camara8 = req.body.camara8;
   var camara9 = req.body.camara9;
   var camara10 = req.body.camara10;
   var camara11 = req.body.camara11;
   var camara12 = req.body.camara12;
   var camara13 = req.body.camara13;
   var camara14 = req.body.camara14;
   var camara15 = req.body.camara15;
   var camara16 = req.body.camara16;
   var camara17 = req.body.camara17;
   var camara18 = req.body.camara18;
   var camara19 = req.body.camara19;
   var camara20 = req.body.camara20;
   var camara21 = req.body.camara21;
   var camara22 = req.body.camara22;
   var camara23 = req.body.camara23;
   var camara24 = req.body.camara24;
   var camara25 = req.body.camara25;
   var camara26 = req.body.camara26;
   var camara27 = req.body.camara27;
   var camara28 = req.body.camara28;
   var camara29 = req.body.camara29;
   var camara30 = req.body.camara30;
   var camara31 = req.body.camara31;
   var camara32 = req.body.camara32;
   var camara33 = req.body.camara33;
   var camara34 = req.body.camara34;
   var camara35 = req.body.camara35;
   var camara36 = req.body.camara36;
   var camara37 = req.body.camara37;
   var camara38 = req.body.camara38;
   var camara39 = req.body.camara39;
   var camara40 = req.body.camara40;
   var camara41 = req.body.camara41;
   var camara42 = req.body.camara42;
   var camara43 = req.body.camara43;
   var camara44 = req.body.camara44;
   var camara45 = req.body.camara45;
   var camara46 = req.body.camara46;
   var camara47 = req.body.camara47;
   var camara48 = req.body.camara48;
   var camara49 = req.body.camara49;
   var camara50 = req.body.camara50;
   var camara51 = req.body.camara51;
   var camara52 = req.body.camara52;
   var camara53 = req.body.camara53;
   var camara54 = req.body.camara54;
   var camara55 = req.body.camara55;
   var camara56 = req.body.camara56;
   var camara57 = req.body.camara57;
   var camara58 = req.body.camara58;
   var camara59 = req.body.camara59;
   var camara60 = req.body.camara60;
   var camara61 = req.body.camara61;
   var camara62 = req.body.camara62;
   var camara63 = req.body.camara63;
   var camara64 = req.body.camara64;
   var camara65 = req.body.camara65;
   var camara66 = req.body.camara66;
   var camara67 = req.body.camara67;
   var camara68 = req.body.camara68;
   var camara69 = req.body.camara69;
   var camara70 = req.body.camara70;
   var camara71 = req.body.camara71;
   var camara72 = req.body.camara72;
   var camara73 = req.body.camara73;
   var camara74 = req.body.camara74;
   var camara75 = req.body.camara75;
   var camara76 = req.body.camara76;
   var camara77 = req.body.camara77;
   var camara78 = req.body.camara78;
   var camara79 = req.body.camara79;
   var camara80 = req.body.camara80;
   var camara81 = req.body.camara81;
   var camara82 = req.body.camara82;
   var camara83 = req.body.camara83;
   var camara84 = req.body.camara84;
   var camara85 = req.body.camara85;
   var camara86 = req.body.camara86;
   var camara87 = req.body.camara87;
   var camara88 = req.body.camara88;
   var camara89 = req.body.camara89;
   var camara90 = req.body.camara90;
   var camara91 = req.body.camara91;
   var camara92 = req.body.camara92;
   var camara93 = req.body.camara93;
   var camara94 = req.body.camara94;
   var camara95 = req.body.camara95;
   var camara96 = req.body.camara96;
   var camara97 = req.body.camara97;
   var camara98 = req.body.camara98;
   var camara99 = req.body.camara99;
   var camara100 = req.body.camara100;
   var camara101 = req.body.camara101;
   var camara102 = req.body.camara102;
   var camara103 = req.body.camara103;
   var camara104 = req.body.camara104;
   var camara105 = req.body.camara105;
   var camara106 = req.body.camara106;
   var camara107 = req.body.camara107;
   var camara108 = req.body.camara108;
   var camara109 = req.body.camara109;
   var camara110 = req.body.camara110;
   var camara111 = req.body.camara111;
   var camara112 = req.body.camara112;
   var camara113 = req.body.camara113;
   var camara114 = req.body.camara114;
   var camara115 = req.body.camara115;
   var camara116 = req.body.camara116;
   var camara117 = req.body.camara117;
   var camara118 = req.body.camara118;
   var camara119 = req.body.camara119;
   var camara120 = req.body.camara120;
   var camara121 = req.body.camara121;
   var camara122 = req.body.camara122;
   var camara123 = req.body.camara123;
   var camara124 = req.body.camara124;
   var camara125 = req.body.camara125;
   var camara126 = req.body.camara126;
   var camara127 = req.body.camara127;
   var camara128 = req.body.camara128;
   var camara129 = req.body.camara129;
   var camara130 = req.body.camara130;
   var valve1 = req.body.VG1;
   var valve2 = req.body.VG2;
   var valve3 = req.body.VG3;
   var valve4 = req.body.VG4;
   var valve5 = req.body.VG5;
   var valve6 = req.body.VG6;
   var valve7 = req.body.VG7;
   var valve8 = req.body.VG8;
   var valve9 = req.body.VG9;
   var valve10 = req.body.VG10;
   var valve11 = req.body.VG11;
   var valve12 = req.body.VG12;
   var valve13 = req.body.VG13;
   var valve14 = req.body.VG14;
   var valve15 = req.body.VG15;
   var valve16 = req.body.VG16;
   var valve17 = req.body.VG17;
   var valve18 = req.body.VG18;
   var valve19 = req.body.VG19;
   var valve20 = req.body.VG20;
   var valve21 = req.body.VG21;
   var valve22 = req.body.VG22;
   var valve23 = req.body.VG23;
   var valve24 = req.body.VG24;
   var valve25 = req.body.VG25;
   var valve26 = req.body.VG26;
   var valve27 = req.body.VG27;
   var valve28 = req.body.VG28;
   var valve29 = req.body.VG29;
   var valve30 = req.body.VG30;
   var valve31 = req.body.VG31;
   var valve32 = req.body.VG32;
   var valve33 = req.body.VG33;
   var valve34 = req.body.VG34;
   var valve35 = req.body.VG35;
   var valve36 = req.body.VG36;
   var valve37 = req.body.VG37;
   var valve38 = req.body.VG38;
   var valve39 = req.body.VG39;
   var valve40 = req.body.VG40;
   var valve41 = req.body.VG41;
   var valve42 = req.body.VG42;
   var valve43 = req.body.VG43;
   var valve44 = req.body.VG44;
   var valve45 = req.body.VG45;
   var valve46 = req.body.VG46;
   var valve47 = req.body.VG47;
   var valve48 = req.body.VG48;
   var valve49 = req.body.VG49;
   var valve50 = req.body.VG50;
   var valve51 = req.body.VG51;
   var valve52 = req.body.VG52;
   var valve53 = req.body.VG53;
   var valve54 = req.body.VG54;
   var valve55 = req.body.VG55;
   var valve56 = req.body.VG56;
   var valve57 = req.body.VG57;
   var valve58 = req.body.VG58;
   var valve59 = req.body.VG59;
   var valve60 = req.body.VG60;
   var valve61 = req.body.VG61;
   var valve62 = req.body.VG62;
   var valve63 = req.body.VG63;
   var valve64 = req.body.VG64;
   var valve65 = req.body.VG65;
   var valve66 = req.body.VG66;
   var valve67 = req.body.VG67;
   var valve68 = req.body.VG68;
   var valve69 = req.body.VG69;
   var valve70 = req.body.VG70;
   var valve71 = req.body.VG71;
   var valve72 = req.body.VG72;
   var valve73 = req.body.VG73;
   var valve74 = req.body.VG74;
   var valve75 = req.body.VG75;
   var valve76 = req.body.VG76;
   var valve77 = req.body.VG77;
   var valve78 = req.body.VG78;
   var valve79 = req.body.VG79;
   var valve80 = req.body.VG80;
   var valve81 = req.body.VG81;
   var valve82 = req.body.VG82;
   var valve83 = req.body.VG83;
   var valve84 = req.body.VG84;
   var valve85 = req.body.VG85;
   var valve86 = req.body.VG86;
   var valve87 = req.body.VG87;
   var valve88 = req.body.VG88;
   var valve89 = req.body.VG89;
   var valve90 = req.body.VG90;
   var refrLadoFixo1 = req.body.rmladofixo1;
   var refrLadoFixo2 = req.body.rmladomovel1;
   var refrLadoMovel1 = req.body.rmladofixo2;
   var refrLadoMovel2 = req.body.rmladomovel2;
   var vaporLadoFixo1 = req.body.valorladofixo;
   var vaporLadoFixo2 = req.body.valorladomovel;
   
   FichaTecnicaPastoreInjetores.update({
      cilindro1: cilindro1,
      cilindro2: cilindro2,
      cilindro3: cilindro3,
      cilindro4: cilindro4,
      cilindro5: cilindro5,
      cilindro6: cilindro6,
      cilindro7: cilindro7,
      posComut: posComut,
      posInjecao1: posInjecao1,
      posInjecao2: posInjecao2,
      posInjecao3: posInjecao3,
      posInjecao4: posInjecao4,
      posInjecao5: posInjecao5,
      presComut: presComut,
      presInjecao1: presInjecao1,
      presInjecao2: presInjecao2,
      presInjecao3: presInjecao3,
      presInjecao4: presInjecao4,
      presInjecao5: presInjecao5,
      fluxoInjecao1: fluxoInjecao1,
      fluxoInjecao2: fluxoInjecao2,
      fluxoInjecao3: fluxoInjecao3,
      fluxoInjecao4: fluxoInjecao4,
      fluxoInjecao5: fluxoInjecao5,
      tempoDisparo: tempoDisparo,
      pressaoInj: pressaoInj,
      presRecalque1: presRecalque1,
      presRecalque2: presRecalque2,
      presRecalque3: presRecalque3,
      presRecalque4: presRecalque4,
      presRecalque5: presRecalque5,
      fluxoRecalque1: fluxoRecalque1,
      fluxoRecalque2: fluxoRecalque2,
      fluxoRecalque3: fluxoRecalque3,
      fluxoRecalque4: fluxoRecalque4,
      fluxoRecalque5: fluxoRecalque5,
      tempoRecalque1: tempoRecalque1,
      tempoRecalque2: tempoRecalque2,
      tempoRecalque3: tempoRecalque3,
      tempoRecalque4: tempoRecalque4,
      tempoRecalque5: tempoRecalque5,
      partDosagem1: partDosagem1,
      partDosagem2: partDosagem2,
      partDosagem3: partDosagem3,
      partDosagem4: partDosagem4,
      partDosagem5: partDosagem5,
      presDosagem1: presDosagem1,
      presDosagem2: presDosagem2,
      presDosagem3: presDosagem3,
      presDosagem4: presDosagem4,
      presDosagem5: presDosagem5,
      fluxoDosagem1: fluxoDosagem1,
      fluxoDosagem2: fluxoDosagem2,
      fluxoDosagem3: fluxoDosagem3,
      fluxoDosagem4: fluxoDosagem4,
      fluxoDosagem5: fluxoDosagem5,
      CPDosagem1: CPDosagem1,
      CPDosagem2: CPDosagem2,
      CPDosagem3: CPDosagem3,
      CPDosagem4: CPDosagem4,
      CPDosagem5: CPDosagem5,
      tempoDosagem: tempoDosagem,
      antesPos: antesPos,
      antesPres: antesPres,
      antesFluxo: antesFluxo,
      antesTempo: antesTempo,
      depoisPos: depoisPos,
      depoisPres: depoisPres,
      depoisFluxo: depoisFluxo,
      depoisTempo: depoisTempo,
      posFecha1: posFecha1,
      posFecha2: posFecha2,
      posFecha3: posFecha3,
      protMPos: protMPos,
      AltaPresPos: AltaPresPos,
      presFecha1: presFecha1,
      presFecha2: presFecha2,
      presFecha3: presFecha3,
      protMPres: protMPres,
      AltaPresPres: AltaPresPres,
      fluxoFecha1: fluxoFecha1,
      fluxoFecha2: fluxoFecha2,
      fluxoFecha3: fluxoFecha3,
      protMFluxo: protMFluxo,
      AltaPresFluxo: AltaPresFluxo,
      tempoProtMolde: tempoProtMolde,
      tempoFecha: tempoFecha,
      posAbertura1: posAbertura1,
      posAbertura2: posAbertura2,
      posAbertura3: posAbertura3,
      posAbertura4: posAbertura4,
      posAbertura5: posAbertura5,
      presAbertura1: presAbertura1,
      presAbertura2: presAbertura2,
      presAbertura3: presAbertura3,
      presAbertura4: presAbertura4,
      presAbertura5: presAbertura5,
      fluxoAbertura1: fluxoAbertura1,
      fluxoAbertura2: fluxoAbertura2,
      fluxoAbertura3: fluxoAbertura3,
      fluxoAbertura4: fluxoAbertura4,
      fluxoAbertura5: fluxoAbertura5,
      resfriamento: resfriamento,
      tempoAbertura: tempoAbertura,
      posAvanco1: posAvanco1,
      posAvanco2: posAvanco2,
      posAvanco3: posAvanco3,
      posRecuo1: posRecuo1,
      posRecuo2: posRecuo2,
      posRecuo3: posRecuo3,
      presAvanco1: presAvanco1,
      presAvanco2: presAvanco2,
      presAvanco3: presAvanco3,
      presRecuo1: presRecuo1,
      presRecuo2: presRecuo2,
      presRecuo3: presRecuo3,
      fluxoAvanco1: fluxoAvanco1,
      fluxoAvanco2: fluxoAvanco2,
      fluxoAvanco3: fluxoAvanco3,
      fluxoRecuo1: fluxoRecuo1,
      fluxoRecuo2: fluxoRecuo2,
      fluxoRecuo3: fluxoRecuo3,
      atraso: atraso,
      batida: batida,
      radialTypeEntrada1: radialTypeEntrada1,
      radialTypeSaida1: radialTypeSaida1,
      radialTypeEntrada2: radialTypeEntrada2,
      radialTypeSaida2: radialTypeSaida2,
      radialPresEntrada1: radialPresEntrada1,
      radialPresSaida1: radialPresSaida1,
      radialPresEntrada2: radialPresEntrada2,
      radialPresSaida2: radialPresSaida2,
      radialPresEntrada3: radialPresEntrada3,
      radialPresSaida3: radialPresSaida3,
      radialFluxoEntrada1: radialFluxoEntrada1,
      radialFluxoSaida1: radialFluxoSaida1,
      radialFluxoEntrada2: radialFluxoEntrada2,
      radialFluxoSaida2: radialFluxoSaida2,
      radialFluxoEntrada3: radialFluxoEntrada3,
      radialFluxoSaida3: radialFluxoSaida3,
      radialPosEntrada1: radialPosEntrada1,
      radialPosSaida1: radialPosSaida1,
      radialPosEntrada2: radialPosEntrada2,
      radialPosSaida2: radialPosSaida2,
      radialPosEntrada3: radialPosEntrada3,
      radialPosSaida3: radialPosSaida3,
      radialTempoEntrada1: radialTempoEntrada1,
      radialTempoSaida1: radialTempoSaida1,
      radialTempoEntrada2: radialTempoEntrada2,
      radialTempoSaida2: radialTempoSaida2,
      radialTempoEntrada3: radialTempoEntrada3,
      radialTempoSaida3: radialTempoSaida3,
      radialSCREntrada1: radialSCREntrada1,
      radialSCRSaida1: radialSCRSaida1,
      radialSCREntrada2: radialSCREntrada2,
      radialSCRSaida2: radialSCRSaida2,
      radialSCREntrada3: radialSCREntrada3,
      radialSCRSaida3: radialSCRSaida3,
   },{
      where:{
         id:id
      }
   }).then(() => {
      FichaPastorePerifericos.update({
         camara1: camara1,
         camara2: camara2,
         camara3: camara3,
         camara4: camara4,
         camara5: camara5,
         camara6: camara6,
         camara7: camara7,
         camara8: camara8,
         camara9: camara9,
         camara10: camara10,
         camara11: camara11,
         camara12: camara12,
         camara13: camara13,
         camara14: camara14,
         camara15: camara15,
         camara16: camara16,
         camara17: camara17,
         camara18: camara18,
         camara19: camara19,
         camara20: camara20,
         camara21: camara21,
         camara22: camara22,
         camara23: camara23,
         camara24: camara24,
         camara25: camara25,
         camara26: camara26,
         camara27: camara27,
         camara28: camara28,
         camara29: camara29,
         camara30: camara30,
         camara31: camara31,
         camara32: camara32,
         camara33: camara33,
         camara34: camara34,
         camara35: camara35,
         camara36: camara36,
         camara37: camara37,
         camara38: camara38,
         camara39: camara39,
         camara40: camara40,
         camara41: camara41,
         camara42: camara42,
         camara43: camara43,
         camara44: camara44,
         camara45: camara45,
         camara46: camara46,
         camara47: camara47,
         camara48: camara48,
         camara49: camara49,
         camara50: camara50,
         camara51: camara51,
         camara52: camara52,
         camara53: camara53,
         camara54: camara54,
         camara55: camara55,
         camara56: camara56,
         camara57: camara57,
         camara58: camara58,
         camara59: camara59,
         camara60: camara60,
         camara61: camara61,
         camara62: camara62,
         camara63: camara63,
         camara64: camara64,
         camara65: camara65,
         camara66: camara66,
         camara67: camara67,
         camara68: camara68,
         camara69: camara69,
         camara70: camara70,
         camara71: camara71,
         camara72: camara72,
         camara73: camara73,
         camara74: camara74,
         camara75: camara75,
         camara76: camara76,
         camara77: camara77,
         camara78: camara78,
         camara79: camara79,
         camara80: camara80,
         camara81: camara81,
         camara82: camara82,
         camara83: camara83,
         camara84: camara84,
         camara85: camara85,
         camara86: camara86,
         camara87: camara87,
         camara88: camara88,
         camara89: camara89,
         camara90: camara90,
         camara91: camara91,
         camara92: camara92,
         camara93: camara93,
         camara94: camara94,
         camara95: camara95,
         camara96: camara96,
         camara97: camara97,
         camara98: camara98,
         camara99: camara99,
         camara100: camara100,
         camara101: camara101,
         camara102: camara102,
         camara103: camara103,
         camara104: camara104,
         camara105: camara105,
         camara106: camara106,
         camara107: camara107,
         camara108: camara108,
         camara109: camara109,
         camara110: camara110,
         camara111: camara111,
         camara112: camara112,
         camara113: camara113,
         camara114: camara114,
         camara115: camara115,
         camara116: camara116,
         camara117: camara117,
         camara118: camara118,
         camara119: camara119,
         camara120: camara120,
         camara121: camara121,
         camara122: camara122,
         camara123: camara123,
         camara124: camara124,
         camara125: camara125,
         camara126: camara126,
         camara127: camara127,
         camara128: camara128,
         camara129: camara129,
         camara130: camara130,
         valve1: valve1,
         valve2: valve2,
         valve3: valve3,
         valve4: valve4,
         valve5: valve5,
         valve6: valve6,
         valve7: valve7,
         valve8: valve8,
         valve9: valve9,
         valve10: valve10,
         valve11: valve11,
         valve12: valve12,
         valve13: valve13,
         valve14: valve14,
         valve15: valve15,
         valve16: valve16,
         valve17: valve17,
         valve18: valve18,
         valve19: valve19,
         valve20: valve20,
         valve21: valve21,
         valve22: valve22,
         valve23: valve23,
         valve24: valve24,
         valve25: valve25,
         valve26: valve26,
         valve27: valve27,
         valve28: valve28,
         valve29: valve29,
         valve30: valve30,
         valve31: valve31,
         valve32: valve32,
         valve33: valve33,
         valve34: valve34,
         valve35: valve35,
         valve36: valve36,
         valve37: valve37,
         valve38: valve38,
         valve39: valve39,
         valve40: valve40,
         valve41: valve41,
         valve42: valve42,
         valve43: valve43,
         valve44: valve44,
         valve45: valve45,
         valve46: valve46,
         valve47: valve47,
         valve48: valve48,
         valve49: valve49,
         valve50: valve50,
         valve51: valve51,
         valve52: valve52,
         valve53: valve53,
         valve54: valve54,
         valve55: valve55,
         valve56: valve56,
         valve57: valve57,
         valve58: valve58,
         valve59: valve59,
         valve60: valve60,
         valve61: valve61,
         valve62: valve62,
         valve63: valve63,
         valve64: valve64,
         valve65: valve65,
         valve66: valve66,
         valve67: valve67,
         valve68: valve68,
         valve69: valve69,
         valve70: valve70,
         valve71: valve71,
         valve72: valve72,
         valve73: valve73,
         valve74: valve74,
         valve75: valve75,
         valve76: valve76,
         valve77: valve77,
         valve78: valve78,
         valve79: valve79,
         valve80: valve80,
         valve81: valve81,
         valve82: valve82,
         valve83: valve83,
         valve84: valve84,
         valve85: valve85,
         valve86: valve86,
         valve87: valve87,
         valve88: valve88,
         valve89: valve89,
         valve90: valve90,
         refrLadoFixo1: refrLadoFixo1,
         refrLadoFixo2: refrLadoFixo2,
         refrLadoMovel1: refrLadoMovel1,
         refrLadoMovel2: refrLadoMovel2,
         vaporLadoFixo1: vaporLadoFixo1,
         vaporLadoFixo2: vaporLadoFixo2,
      },{
         where:{
            id:id
         }
      }).then(() => {
         //*salvando os dados no banco de revisao
         RevisaoFichaTecnicaPastorePerifericos.create({
            idFichaTecnica: id,
            maq: maquina,
            camara1: camara1,
            camara2: camara2,
            camara3: camara3,
            camara4: camara4,
            camara5: camara5,
            camara6: camara6,
            camara7: camara7,
            camara8: camara8,
            camara9: camara9,
            camara10: camara10,
            camara11: camara11,
            camara12: camara12,
            camara13: camara13,
            camara14: camara14,
            camara15: camara15,
            camara16: camara16,
            camara17: camara17,
            camara18: camara18,
            camara19: camara19,
            camara20: camara20,
            camara21: camara21,
            camara22: camara22,
            camara23: camara23,
            camara24: camara24,
            camara25: camara25,
            camara26: camara26,
            camara27: camara27,
            camara28: camara28,
            camara29: camara29,
            camara30: camara30,
            camara31: camara31,
            camara32: camara32,
            camara33: camara33,
            camara34: camara34,
            camara35: camara35,
            camara36: camara36,
            camara37: camara37,
            camara38: camara38,
            camara39: camara39,
            camara40: camara40,
            camara41: camara41,
            camara42: camara42,
            camara43: camara43,
            camara44: camara44,
            camara45: camara45,
            camara46: camara46,
            camara47: camara47,
            camara48: camara48,
            camara49: camara49,
            camara50: camara50,
            camara51: camara51,
            camara52: camara52,
            camara53: camara53,
            camara54: camara54,
            camara55: camara55,
            camara56: camara56,
            camara57: camara57,
            camara58: camara58,
            camara59: camara59,
            camara60: camara60,
            camara61: camara61,
            camara62: camara62,
            camara63: camara63,
            camara64: camara64,
            camara65: camara65,
            camara66: camara66,
            camara67: camara67,
            camara68: camara68,
            camara69: camara69,
            camara70: camara70,
            camara71: camara71,
            camara72: camara72,
            camara73: camara73,
            camara74: camara74,
            camara75: camara75,
            camara76: camara76,
            camara77: camara77,
            camara78: camara78,
            camara79: camara79,
            camara80: camara80,
            camara81: camara81,
            camara82: camara82,
            camara83: camara83,
            camara84: camara84,
            camara85: camara85,
            camara86: camara86,
            camara87: camara87,
            camara88: camara88,
            camara89: camara89,
            camara90: camara90,
            camara91: camara91,
            camara92: camara92,
            camara93: camara93,
            camara94: camara94,
            camara95: camara95,
            camara96: camara96,
            camara97: camara97,
            camara98: camara98,
            camara99: camara99,
            camara100: camara100,
            camara101: camara101,
            camara102: camara102,
            camara103: camara103,
            camara104: camara104,
            camara105: camara105,
            camara106: camara106,
            camara107: camara107,
            camara108: camara108,
            camara109: camara109,
            camara110: camara110,
            camara111: camara111,
            camara112: camara112,
            camara113: camara113,
            camara114: camara114,
            camara115: camara115,
            camara116: camara116,
            camara117: camara117,
            camara118: camara118,
            camara119: camara119,
            camara120: camara120,
            camara121: camara121,
            camara122: camara122,
            camara123: camara123,
            camara124: camara124,
            camara125: camara125,
            camara126: camara126,
            camara127: camara127,
            camara128: camara128,
            camara129: camara129,
            camara130: camara130,
            valve1: valve1,
            valve2: valve2,
            valve3: valve3,
            valve4: valve4,
            valve5: valve5,
            valve6: valve6,
            valve7: valve7,
            valve8: valve8,
            valve9: valve9,
            valve10: valve10,
            valve11: valve11,
            valve12: valve12,
            valve13: valve13,
            valve14: valve14,
            valve15: valve15,
            valve16: valve16,
            valve17: valve17,
            valve18: valve18,
            valve19: valve19,
            valve20: valve20,
            valve21: valve21,
            valve22: valve22,
            valve23: valve23,
            valve24: valve24,
            valve25: valve25,
            valve26: valve26,
            valve27: valve27,
            valve28: valve28,
            valve29: valve29,
            valve30: valve30,
            valve31: valve31,
            valve32: valve32,
            valve33: valve33,
            valve34: valve34,
            valve35: valve35,
            valve36: valve36,
            valve37: valve37,
            valve38: valve38,
            valve39: valve39,
            valve40: valve40,
            valve41: valve41,
            valve42: valve42,
            valve43: valve43,
            valve44: valve44,
            valve45: valve45,
            valve46: valve46,
            valve47: valve47,
            valve48: valve48,
            valve49: valve49,
            valve50: valve50,
            valve51: valve51,
            valve52: valve52,
            valve53: valve53,
            valve54: valve54,
            valve55: valve55,
            valve56: valve56,
            valve57: valve57,
            valve58: valve58,
            valve59: valve59,
            valve60: valve60,
            valve61: valve61,
            valve62: valve62,
            valve63: valve63,
            valve64: valve64,
            valve65: valve65,
            valve66: valve66,
            valve67: valve67,
            valve68: valve68,
            valve69: valve69,
            valve70: valve70,
            valve71: valve71,
            valve72: valve72,
            valve73: valve73,
            valve74: valve74,
            valve75: valve75,
            valve76: valve76,
            valve77: valve77,
            valve78: valve78,
            valve79: valve79,
            valve80: valve80,
            valve81: valve81,
            valve82: valve82,
            valve83: valve83,
            valve84: valve84,
            valve85: valve85,
            valve86: valve86,
            valve87: valve87,
            valve88: valve88,
            valve89: valve89,
            valve90: valve90,
            refrLadoFixo1: refrLadoFixo1,
            refrLadoFixo2: refrLadoFixo2,
            refrLadoMovel1: refrLadoMovel1,
            refrLadoMovel2: refrLadoMovel2,
            vaporLadoFixo1: vaporLadoFixo1,
            vaporLadoFixo2: vaporLadoFixo2,
         }).then(() => {

            RevisaoFichaTecnicaPastoreInjetores.create({
               idFichaTecnica: id,
               maq: maquina,
               cilindro1: cilindro1,
               cilindro2: cilindro2,
               cilindro3: cilindro3,
               cilindro4: cilindro4,
               cilindro5: cilindro5,
               cilindro6: cilindro6,
               cilindro7: cilindro7,
               posComut: posComut,
               posInjecao1: posInjecao1,
               posInjecao2: posInjecao2,
               posInjecao3: posInjecao3,
               posInjecao4: posInjecao4,
               posInjecao5: posInjecao5,
               presComut: presComut,
               presInjecao1: presInjecao1,
               presInjecao2: presInjecao2,
               presInjecao3: presInjecao3,
               presInjecao4: presInjecao4,
               presInjecao5: presInjecao5,
               fluxoInjecao1: fluxoInjecao1,
               fluxoInjecao2: fluxoInjecao2,
               fluxoInjecao3: fluxoInjecao3,
               fluxoInjecao4: fluxoInjecao4,
               fluxoInjecao5: fluxoInjecao5,
               tempoDisparo: tempoDisparo,
               pressaoInj: pressaoInj,
               presRecalque1: presRecalque1,
               presRecalque2: presRecalque2,
               presRecalque3: presRecalque3,
               presRecalque4: presRecalque4,
               presRecalque5: presRecalque5,
               fluxoRecalque1: fluxoRecalque1,
               fluxoRecalque2: fluxoRecalque2,
               fluxoRecalque3: fluxoRecalque3,
               fluxoRecalque4: fluxoRecalque4,
               fluxoRecalque5: fluxoRecalque5,
               tempoRecalque1: tempoRecalque1,
               tempoRecalque2: tempoRecalque2,
               tempoRecalque3: tempoRecalque3,
               tempoRecalque4: tempoRecalque4,
               tempoRecalque5: tempoRecalque5,
               partDosagem1: partDosagem1,
               partDosagem2: partDosagem2,
               partDosagem3: partDosagem3,
               partDosagem4: partDosagem4,
               partDosagem5: partDosagem5,
               presDosagem1: presDosagem1,
               presDosagem2: presDosagem2,
               presDosagem3: presDosagem3,
               presDosagem4: presDosagem4,
               presDosagem5: presDosagem5,
               fluxoDosagem1: fluxoDosagem1,
               fluxoDosagem2: fluxoDosagem2,
               fluxoDosagem3: fluxoDosagem3,
               fluxoDosagem4: fluxoDosagem4,
               fluxoDosagem5: fluxoDosagem5,
               CPDosagem1: CPDosagem1,
               CPDosagem2: CPDosagem2,
               CPDosagem3: CPDosagem3,
               CPDosagem4: CPDosagem4,
               CPDosagem5: CPDosagem5,
               tempoDosagem: tempoDosagem,
               antesPos: antesPos,
               antesPres: antesPres,
               antesFluxo: antesFluxo,
               antesTempo: antesTempo,
               depoisPos: depoisPos,
               depoisPres: depoisPres,
               depoisFluxo: depoisFluxo,
               depoisTempo: depoisTempo,
               posFecha1: posFecha1,
               posFecha2: posFecha2,
               posFecha3: posFecha3,
               protMPos: protMPos,
               AltaPresPos: AltaPresPos,
               presFecha1: presFecha1,
               presFecha2: presFecha2,
               presFecha3: presFecha3,
               protMPres: protMPres,
               AltaPresPres: AltaPresPres,
               fluxoFecha1: fluxoFecha1,
               fluxoFecha2: fluxoFecha2,
               fluxoFecha3: fluxoFecha3,
               protMFluxo: protMFluxo,
               AltaPresFluxo: AltaPresFluxo,
               tempoProtMolde: tempoProtMolde,
               tempoFecha: tempoFecha,
               posAbertura1: posAbertura1,
               posAbertura2: posAbertura2,
               posAbertura3: posAbertura3,
               posAbertura4: posAbertura4,
               posAbertura5: posAbertura5,
               presAbertura1: presAbertura1,
               presAbertura2: presAbertura2,
               presAbertura3: presAbertura3,
               presAbertura4: presAbertura4,
               presAbertura5: presAbertura5,
               fluxoAbertura1: fluxoAbertura1,
               fluxoAbertura2: fluxoAbertura2,
               fluxoAbertura3: fluxoAbertura3,
               fluxoAbertura4: fluxoAbertura4,
               fluxoAbertura5: fluxoAbertura5,
               resfriamento: resfriamento,
               tempoAbertura: tempoAbertura,
               posAvanco1: posAvanco1,
               posAvanco2: posAvanco2,
               posAvanco3: posAvanco3,
               posRecuo1: posRecuo1,
               posRecuo2: posRecuo2,
               posRecuo3: posRecuo3,
               presAvanco1: presAvanco1,
               presAvanco2: presAvanco2,
               presAvanco3: presAvanco3,
               presRecuo1: presRecuo1,
               presRecuo2: presRecuo2,
               presRecuo3: presRecuo3,
               fluxoAvanco1: fluxoAvanco1,
               fluxoAvanco2: fluxoAvanco2,
               fluxoAvanco3: fluxoAvanco3,
               fluxoRecuo1: fluxoRecuo1,
               fluxoRecuo2: fluxoRecuo2,
               fluxoRecuo3: fluxoRecuo3,
               atraso: atraso,
               batida: batida,
               radialTypeEntrada1: radialTypeEntrada1,
               radialTypeSaida1: radialTypeSaida1,
               radialTypeEntrada2: radialTypeEntrada2,
               radialTypeSaida2: radialTypeSaida2,
               radialPresEntrada1: radialPresEntrada1,
               radialPresSaida1: radialPresSaida1,
               radialPresEntrada2: radialPresEntrada2,
               radialPresSaida2: radialPresSaida2,
               radialPresEntrada3: radialPresEntrada3,
               radialPresSaida3: radialPresSaida3,
               radialFluxoEntrada1: radialFluxoEntrada1,
               radialFluxoSaida1: radialFluxoSaida1,
               radialFluxoEntrada2: radialFluxoEntrada2,
               radialFluxoSaida2: radialFluxoSaida2,
               radialFluxoEntrada3: radialFluxoEntrada3,
               radialFluxoSaida3: radialFluxoSaida3,
               radialPosEntrada1: radialPosEntrada1,
               radialPosSaida1: radialPosSaida1,
               radialPosEntrada2: radialPosEntrada2,
               radialPosSaida2: radialPosSaida2,
               radialPosEntrada3: radialPosEntrada3,
               radialPosSaida3: radialPosSaida3,
               radialTempoEntrada1: radialTempoEntrada1,
               radialTempoSaida1: radialTempoSaida1,
               radialTempoEntrada2: radialTempoEntrada2,
               radialTempoSaida2: radialTempoSaida2,
               radialTempoEntrada3: radialTempoEntrada3,
               radialTempoSaida3: radialTempoSaida3,
               radialSCREntrada1: radialSCREntrada1,
               radialSCRSaida1: radialSCRSaida1,
               radialSCREntrada2: radialSCREntrada2,
               radialSCRSaida2: radialSCRSaida2,
               radialSCREntrada3: radialSCREntrada3,
               radialSCRSaida3: radialSCRSaida3,
            }).then(() => {
               res.redirect("/ficha/lista")
            })
         })
      })
   })
})

router.post("/fichas/deleteHaitian",(req,res) => {
   var id = req.body.id;
   if (id != undefined){

      if(!isNaN(id)){

         FichaTecnicaPastoreInjetores.destroy({
            where:{
               id:id
            }
         }).then(() => {
            FichaPastorePerifericos.destroy({
               where:{
                  id:id
               }
            }).then(() => {
               RevisaoFichaTecnicaPastoreInjetores.destroy({
                  where:{
                     idFichaTecnica:id
                  }
               })
               RevisaoFichaTecnicaPastorePerifericos.destroy({
                  where:{
                     idFichaTecnica:id
                  }
               }).then(() => {
                  res.redirect("/ficha/lista");
               })
            })
         })

      }else{
         res.redirect("/fichas");
      }
   }else{
      res.redirect("/fichas");
   }
})

router.get("/ficha/revisaoToshiba/:id",(req,res) => {
   var fichaId = req.params.id;

   RevisaoLimitesFichaTecnicaToshiba.findAll({
      where: {
         idFichaTecnica: fichaId
      }
   }).then(revisao => {
      Maquinas.findOne({
         where: {
            id: revisao[0].maq
         }
      }).then(maquina => {
         console.log(maquina.descricao)
         res.render("revisao/index", {
            revisoes: revisao,
            maquinaDesc: maquina.descricao,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active",
            nav_alertas:"",
         })
      })
   })
})

router.get("/ficha/revisaoHaitian/:id",(req,res) => {
   var fichaId = req.params.id;

   RevisaoFichaTecnicaPastoreInjetores.findAll({
      where: {
         idFichaTecnica: fichaId
      }
   }).then(injetor => {
      RevisaoFichaTecnicaPastorePerifericos.findAll({
         where: {
            idFichaTecnica: fichaId
         }
      }).then(periferico => {
         Maquinas.findOne({
            where: {
               id: periferico[0].maq
            }
         }).then(maquina => {
            res.render("revisao/indexHaitian", {
               injetores: injetor,
               perifericos: periferico,
               maquinaDesc: maquina.descricao,
               nav_maquinas : "",
               nav_produtos : "",
               nav_mp : "",
               nav_usuarios : "",
               nav_moldes : "",
               nav_clientes : "",
               nav_parametros:"",
               nav_ficha: "active",
               nav_alertas:"",
            })
         })
      })

   })
})

module.exports = router;
