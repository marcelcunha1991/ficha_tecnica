const express = require("express");
const router = express.Router();
const FichaTecnicaToshiba = require("./FichaTecnicaToshiba");
const LimitesFichaTecnicaToshiba = require("./LimitesFichaTecnicaToshiba");
const ParametrosReaisToshiba = require("../ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("../ParametrosTempoReal/ParametrosReaisAutomata");
const ParametrosReaishaitianJupyter = require("../ParametrosTempoReal/ParametrosReaisHaitianJupyter");
const AlertasAbertosAutomata = require("../Alertas/AlertasAbertos");
const Alertas = require("../Alertas/Alertas");
const Tipo = require("../Tipo/Tipo");
const Moldes = require("../Moldes/Moldes");
const MateriasPrimas = require("../MateriaPrima/MateriasPrimas");
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

         // case 1:
               
         //    ParametrosReaisToshiba.findAll({
         //       limit: 1,
         //       where: {
         //          mac: maquina.mac
         //       },
         //       order: [ [ 'createdAt', 'DESC' ]]
         //    }).then(output => {
         
         //       console.log(output[0])
         //       res.send(output[0])
               
         //    }); 
         //    break;

         // case 2: 

         //    ParametrosReaisAutomata.findAll({
         //       limit: 1,
         //       where: {
         //       mac: maquina.mac
         //       },
         //       order: [ [ 'createdAt', 'DESC' ]]
         //    }).then(output => {
      
         //       console.log(output[0])
         //       res.send(output[0])
               
         //    }); 
         //    break;
         
         case 3: 

            ParametrosReaishaitianJupyter.findAll({
               limit: 1,
               where: {
                  mac: maquina.descricao
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

router.get("/ficha/getFichaPastoreInjetores/:macMaquina",  (req,res) => {

   var maquinaMac = req.params.macMaquina;

   Maquinas.findOne({
      where: {
         descricao : maquinaMac
      }
   }).then(output => {

      RevisaoFichaTecnicaPastoreInjetores.findOne({
         limit: 1,
         where: {
            maq : output.id
         },
         order: [ [ 'createdAt', 'DESC' ]]
      }).then(output => {
         res.send(output)      
      }); 
      
   }); 
})

router.get("/ficha/getFichaPastorePerifericos/:macMaquina",  (req,res) => {

   var maquinaMac = req.params.macMaquina;

   Maquinas.findOne({
      where: {
         descricao : maquinaMac
      }
   }).then(output => {

      RevisaoFichaTecnicaPastorePerifericos.findOne({
         limit: 1,
         where: {
            maq : output.id
         },
         order: [ [ 'createdAt', 'DESC' ]]
      }).then(output => {
         res.send(output)      
      }); 
      
   }); 
})

router.get("/novaficha",  (req,res) => {

   var maquinas;

   Moldes.findAll().then(molde => {

      MateriasPrimas.findAll().then(material => {

         Maquinas.findAll({
            include: [{
               model: Tipo,
               required: true,
               attributes:['tipo']
            }]
         }).then(maquina => {
      
            res.render("fichas/new",{        
               maquinas: maquina,    
               materiais: material,    
               moldes: molde,    
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
            })

         })
   
      })

   })
    
})

router.post("/fichas/createToshiba",(req,res) => {
   var maquina = req.body.maquinaToshiba;
   var VI1_min = req.body.VI1_min !==  "" ? req.body.VI1_min : 0.0;
   var VI1_max = req.body.VI1_max !==  "" ? req.body.VI1_max : 0.0;
   var VI2_min = req.body.VI2_min !==  "" ? req.body.VI2_min : 0.0;
   var VI2_max = req.body.VI2_max !==  "" ? req.body.VI2_max : 0.0;
   var VI3_min = req.body.VI3_min !==  "" ? req.body.VI3_min : 0.0;
   var VI3_max = req.body.VI3_max !==  "" ? req.body.VI3_max : 0.0;
   var VI4_min = req.body.VI4_min !==  "" ? req.body.VI4_min : 0.0;
   var VI4_max = req.body.VI4_max !==  "" ? req.body.VI4_max : 0.0;
   var VI5_min = req.body.VI5_min !==  "" ? req.body.VI5_min : 0.0;
   var VI5_max = req.body.VI5_max !==  "" ? req.body.VI5_max : 0.0;
   var VI6_min = req.body.VI6_min !==  "" ? req.body.VI6_min : 0.0;
   var VI6_max = req.body.VI6_max !==  "" ? req.body.VI6_max : 0.0;
   var VI7_min = req.body.VI7_min !==  "" ? req.body.VI7_min : 0.0;
   var VI7_max = req.body.VI7_max !==  "" ? req.body.VI7_max : 0.0;
   var VI8_min = req.body.VI8_min !==  "" ? req.body.VI8_min : 0.0;
   var VI8_max = req.body.VI8_max !==  "" ? req.body.VI8_max : 0.0;
   var VI9_min = req.body.VI9_min !==  "" ? req.body.VI9_min : 0.0;
   var VI9_max = req.body.VI9_max !==  "" ? req.body.VI9_max : 0.0;
   var VI10_min = req.body.VI10_min !==  "" ? req.body.VI10_min : 0.0;
   var VI10_max = req.body.VI10_max !==  "" ? req.body.VI10_max : 0.0;
   var VH1_min = req.body.VH1_min !==  "" ? req.body.VH1_min : 0.0;
   var VH1_max = req.body.VH1_max !==  "" ? req.body.VH1_max : 0.0;
   var VH2_min = req.body.VH2_min !==  "" ? req.body.VH2_min : 0.0;
   var VH2_max = req.body.VH2_max !==  "" ? req.body.VH2_max : 0.0;
   var PI1_min = req.body.PI1_min !==  "" ? req.body.PI1_min : 0.0;
   var PI1_max = req.body.PI1_max !==  "" ? req.body.PI1_max : 0.0;
   var LS4_min = req.body.LS4_min !==  "" ? req.body.LS4_min : 0.0;
   var LS4_max = req.body.LS4_max !==  "" ? req.body.LS4_max : 0.0;
   var LS4A_min = req.body.LS4A_min !==  "" ? req.body.LS4A_min : 0.0;
   var LS4A_max = req.body.LS4A_max !==  "" ? req.body.LS4A_max : 0.0;    
   

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

function insertDataHaitianJupyter(body){
   console.log(body)
   ParametrosReaishaitianJupyter.create(body).then((result) => {
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
      case 3:
         insertDataHaitianJupyter(req.body);
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
   var VI1_min = req.body.VI1_min !==  "" ? req.body.VI1_min : 0.0;
   var VI1_max = req.body.VI1_max !==  "" ? req.body.VI1_max : 0.0;
   var VI2_min = req.body.VI2_min !==  "" ? req.body.VI2_min : 0.0;
   var VI2_max = req.body.VI2_max !==  "" ? req.body.VI2_max : 0.0;
   var VI3_min = req.body.VI3_min !==  "" ? req.body.VI3_min : 0.0;
   var VI3_max = req.body.VI3_max !==  "" ? req.body.VI3_max : 0.0;
   var VI4_min = req.body.VI4_min !==  "" ? req.body.VI4_min : 0.0;
   var VI4_max = req.body.VI4_max !==  "" ? req.body.VI4_max : 0.0;
   var VI5_min = req.body.VI5_min !==  "" ? req.body.VI5_min : 0.0;
   var VI5_max = req.body.VI5_max !==  "" ? req.body.VI5_max : 0.0;
   var VI6_min = req.body.VI6_min !==  "" ? req.body.VI6_min : 0.0;
   var VI6_max = req.body.VI6_max !==  "" ? req.body.VI6_max : 0.0;
   var VI7_min = req.body.VI7_min !==  "" ? req.body.VI7_min : 0.0;
   var VI7_max = req.body.VI7_max !==  "" ? req.body.VI7_max : 0.0;
   var VI8_min = req.body.VI8_min !==  "" ? req.body.VI8_min : 0.0;
   var VI8_max = req.body.VI8_max !==  "" ? req.body.VI8_max : 0.0;
   var VI9_min = req.body.VI9_min !==  "" ? req.body.VI9_min : 0.0;
   var VI9_max = req.body.VI9_max !==  "" ? req.body.VI9_max : 0.0;
   var VI10_min = req.body.VI10_min !==  "" ? req.body.VI10_min : 0.0;
   var VI10_max = req.body.VI10_max !==  "" ? req.body.VI10_max : 0.0;
   var VH1_min = req.body.VH1_min !==  "" ? req.body.VH1_min : 0.0;
   var VH1_max = req.body.VH1_max !==  "" ? req.body.VH1_max : 0.0;
   var VH2_min = req.body.VH2_min !==  "" ? req.body.VH2_min : 0.0;
   var VH2_max = req.body.VH2_max !==  "" ? req.body.VH2_max : 0.0;
   var PI1_min = req.body.PI1_min !==  "" ? req.body.PI1_min : 0.0;
   var PI1_max = req.body.PI1_max !==  "" ? req.body.PI1_max : 0.0;
   var LS4_min = req.body.LS4_min !==  "" ? req.body.LS4_min : 0.0;
   var LS4_max = req.body.LS4_max !==  "" ? req.body.LS4_max : 0.0;
   var LS4A_min = req.body.LS4A_min !==  "" ? req.body.LS4A_min : 0.0;
   var LS4A_max = req.body.LS4A_max !==  "" ? req.body.LS4A_max : 0.0;     
   

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
   var moldes;
   var materiais;

   Moldes.findAll().then(molde => {
      moldes = molde;

      MateriasPrimas.findAll().then(material => {
         materiais = material;
   
         Maquinas.findAll({
            include: [{
               model: Tipo,
               required: true,
               attributes:['tipo']
            }]
         }).then(maquina => {

            res.render("fichas/list", {
               maquinas: maquina,
               moldes: moldes,
               materiais: materiais,
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

   } else {
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

router.get("/get/editHaitian/:id",(req,res) => {

   var id = req.params.id;
   
   FichaPastorePerifericos.findByPk(id).then(periferico => {
      res.send(periferico)
   })
   
})

router.get("/fichas/editHaitian/:id",(req,res) => {

   var id = req.params.id;
   var perifericos;

   if(isNaN(id)){
      res.redirect("/fichas")
   }

   Moldes.findAll().then(molde => {

      MateriasPrimas.findAll().then(material => {

         FichaPastorePerifericos.findByPk(id).then(periferico => {
            perifericos = periferico
      
            FichaTecnicaPastoreInjetores.findByPk(id).then(injetor => {
      
               res.render("fichas/editHaitian",{
                  injetor:injetor, 
                  perifericos:perifericos,
                  materiais:material,
                  moldes:molde,
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

               res.send(injetor)
            })
         })

      })

   })
   
})

// *CRIANDO FICHA PASTORE

router.post("/fichas/createHaitian",(req,res) => {
   console.log(req.body)
   var maquina = req.body.maquinaHaitian;

   var NúmeroMolde = req.body.molde.replace(/\s/g, "");
   var NúmeroMáquina = req.body.numMaquina;
   var Revisao = req.body.revisao;
   var Cliente = req.body.cliente;
   var CodigoPAM = req.body.codigoPAM.replace(/\s/g, "");
   var Tecnico = req.body.tecnico;
   var Produto = req.body.produto;
   var Material = req.body.material.replace(/\./g, "");

   var cilindro1 = req.body.cilindro1 !== "" ? req.body.cilindro1.replace(",", ".") : 0.0;
   var cilindro2 = req.body.cilindro2 !== "" ? req.body.cilindro2.replace(",", ".") : 0.0;
   var cilindro3 = req.body.cilindro3 !== "" ? req.body.cilindro3.replace(",", ".") : 0.0;
   var cilindro4 = req.body.cilindro4 !== "" ? req.body.cilindro4.replace(",", ".") : 0.0;
   var cilindro5 = req.body.cilindro5 !== "" ? req.body.cilindro5.replace(",", ".") : 0.0;
   var cilindro6 = req.body.cilindro6 !== "" ? req.body.cilindro6.replace(",", ".") : 0.0;
   var cilindro7 = req.body.cilindro7 !== "" ? req.body.cilindro7.replace(",", ".") : 0.0;
   var posComut = req.body.posComutacao !== "" ? req.body.posComutacao.replace(",", ".") : 0.0;
   var posInjecao1 = req.body.posInj5 !== "" ? req.body.posInj5.replace(",", ".") : 0.0;
   var posInjecao2 = req.body.posInj4 !== "" ? req.body.posInj4.replace(",", ".") : 0.0;
   var posInjecao3 = req.body.posInj3 !== "" ? req.body.posInj3.replace(",", ".") : 0.0;
   var posInjecao4 = req.body.posInj2 !== "" ? req.body.posInj2.replace(",", ".") : 0.0;
   var posInjecao5 = req.body.posInj1 !== "" ? req.body.posInj1.replace(",", ".") : 0.0;
   var presComut = req.body.presComutacao !== "" ? req.body.presComutacao.replace(",", ".") : 0.0;
   var presInjecao1 = req.body.presInj5 !== "" ? req.body.presInj5.replace(",", ".") : 0.0;
   var presInjecao2 = req.body.presInj4 !== "" ? req.body.presInj4.replace(",", ".") : 0.0;
   var presInjecao3 = req.body.presInj3 !== "" ? req.body.presInj3.replace(",", ".") : 0.0;
   var presInjecao4 = req.body.presInj2 !== "" ? req.body.presInj2.replace(",", ".") : 0.0;
   var presInjecao5 = req.body.presInj1 !== "" ? req.body.presInj1.replace(",", ".") : 0.0;
   var fluxoInjecao1 = req.body.fluxoInj5 !== "" ? req.body.fluxoInj5.replace(",", ".") : 0.0;
   var fluxoInjecao2 = req.body.fluxoInj4 !== "" ? req.body.fluxoInj4.replace(",", ".") : 0.0;
   var fluxoInjecao3 = req.body.fluxoInj3 !== "" ? req.body.fluxoInj3.replace(",", ".") : 0.0;
   var fluxoInjecao4 = req.body.fluxoInj2 !== "" ? req.body.fluxoInj2.replace(",", ".") : 0.0;
   var fluxoInjecao5 = req.body.fluxoInj1 !== "" ? req.body.fluxoInj1.replace(",", ".") : 0.0;
   var tempoDisparo = req.body.tempoDisparo !== "" ? req.body.tempoDisparo.replace(",", ".") : 0.0;
   var pressaoInj = req.body.pressaoInj !== "" ? req.body.pressaoInj.replace(",", ".") : 0.0;
   var presRecalque1 = req.body.presRecalque5 !== "" ? req.body.presRecalque5.replace(",", ".") : 0.0;
   var presRecalque2 = req.body.presRecalque4 !== "" ? req.body.presRecalque4.replace(",", ".") : 0.0;
   var presRecalque3 = req.body.presRecalque3 !== "" ? req.body.presRecalque3.replace(",", ".") : 0.0;
   var presRecalque4 = req.body.presRecalque2 !== "" ? req.body.presRecalque2.replace(",", ".") : 0.0;
   var presRecalque5 = req.body.presRecalque1 !== "" ? req.body.presRecalque1.replace(",", ".") : 0.0;
   var fluxoRecalque1 = req.body.fluxoRecalque5 !== "" ? req.body.fluxoRecalque5.replace(",", ".") : 0.0;
   var fluxoRecalque2 = req.body.fluxoRecalque4 !== "" ? req.body.fluxoRecalque4.replace(",", ".") : 0.0;
   var fluxoRecalque3 = req.body.fluxoRecalque3 !== "" ? req.body.fluxoRecalque3.replace(",", ".") : 0.0;
   var fluxoRecalque4 = req.body.fluxoRecalque2 !== "" ? req.body.fluxoRecalque2.replace(",", ".") : 0.0;
   var fluxoRecalque5 = req.body.fluxoRecalque1 !== "" ? req.body.fluxoRecalque1.replace(",", ".") : 0.0;
   var tempoRecalque1 = req.body.tempoRecalque5 !== "" ? req.body.tempoRecalque5.replace(",", ".") : 0.0;
   var tempoRecalque2 = req.body.tempoRecalque4 !== "" ? req.body.tempoRecalque4.replace(",", ".") : 0.0;
   var tempoRecalque3 = req.body.tempoRecalque3 !== "" ? req.body.tempoRecalque3.replace(",", ".") : 0.0;
   var tempoRecalque4 = req.body.tempoRecalque2 !== "" ? req.body.tempoRecalque2.replace(",", ".") : 0.0;
   var tempoRecalque5 = req.body.tempoRecalque1 !== "" ? req.body.tempoRecalque1.replace(",", ".") : 0.0;
   var partDosagem1 = req.body.partDosagem5 !== "" ? req.body.partDosagem5.replace(",", ".") : 0.0;
   var partDosagem2 = req.body.partDosagem4 !== "" ? req.body.partDosagem4.replace(",", ".") : 0.0;
   var partDosagem3 = req.body.partDosagem3 !== "" ? req.body.partDosagem3.replace(",", ".") : 0.0;
   var partDosagem4 = req.body.partDosagem2 !== "" ? req.body.partDosagem2.replace(",", ".") : 0.0;
   var partDosagem5 = req.body.partDosagem1 !== "" ? req.body.partDosagem1.replace(",", ".") : 0.0;
   var presDosagem1 = req.body.presDosagem5 !== "" ? req.body.presDosagem5.replace(",", ".") : 0.0;
   var presDosagem2 = req.body.presDosagem4 !== "" ? req.body.presDosagem4.replace(",", ".") : 0.0;
   var presDosagem3 = req.body.presDosagem3 !== "" ? req.body.presDosagem3.replace(",", ".") : 0.0;
   var presDosagem4 = req.body.presDosagem2 !== "" ? req.body.presDosagem2.replace(",", ".") : 0.0;
   var presDosagem5 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var fluxoDosagem1 = req.body.fluxoDosagem5 !== "" ? req.body.fluxoDosagem5.replace(",", ".") : 0.0;
   var fluxoDosagem2 = req.body.fluxoDosagem4 !== "" ? req.body.fluxoDosagem4.replace(",", ".") : 0.0;
   var fluxoDosagem3 = req.body.fluxoDosagem3 !== "" ? req.body.fluxoDosagem3.replace(",", ".") : 0.0;
   var fluxoDosagem4 = req.body.fluxoDosagem2 !== "" ? req.body.fluxoDosagem2.replace(",", ".") : 0.0;
   var fluxoDosagem5 = req.body.fluxoDosagem1 !== "" ? req.body.fluxoDosagem1.replace(",", ".") : 0.0;
   var CPDosagem1 = req.body.CPDosagem5 !== "" ? req.body.CPDosagem5.replace(",", ".") : 0.0;
   var CPDosagem2 = req.body.CPDosagem4 !== "" ? req.body.CPDosagem4.replace(",", ".") : 0.0;
   var CPDosagem3 = req.body.CPDosagem3 !== "" ? req.body.CPDosagem3.replace(",", ".") : 0.0;
   var CPDosagem4 = req.body.CPDosagem2 !== "" ? req.body.CPDosagem2.replace(",", ".") : 0.0;
   var CPDosagem5 = req.body.CPDosagem1 !== "" ? req.body.CPDosagem1.replace(",", ".") : 0.0;
   var tempoDosagem = req.body.tempoDosagem !== "" ? req.body.tempoDosagem.replace(",", ".") : 0.0;
   var antesPos = req.body.antes1 !== "" ? req.body.antes1.replace(",", ".") : 0.0;
   var antesPres = req.body.antes2 !== "" ? req.body.antes2.replace(",", ".") : 0.0;
   var antesFluxo = req.body.antes3 !== "" ? req.body.antes3.replace(",", ".") : 0.0;
   var antesTempo = req.body.antes4 !== "" ? req.body.antes4.replace(",", ".") : 0.0;
   var depoisPos = req.body.depois1 !== "" ? req.body.depois1.replace(",", ".") : 0.0;
   var depoisPres = req.body.depois2 !== "" ? req.body.depois2.replace(",", ".") : 0.0;
   var depoisFluxo = req.body.depois3 !== "" ? req.body.depois3.replace(",", ".") : 0.0;
   var depoisTempo = req.body.depois4 !== "" ? req.body.depois4.replace(",", ".") : 0.0;
   var posFecha1 = req.body.posFech1 !== "" ? req.body.posFech1.replace(",", ".") : 0.0;
   var posFecha2 = req.body.posFech2 !== "" ? req.body.posFech2.replace(",", ".") : 0.0;
   var posFecha3 = req.body.posFech3 !== "" ? req.body.posFech3.replace(",", ".") : 0.0;
   var protMPos = req.body.protMPos !== "" ? req.body.protMPos.replace(",", ".") : 0.0;
   var AltaPresPos = req.body.AltaPresPos !== "" ? req.body.AltaPresPos.replace(",", ".") : 0.0;
   var presFecha1 = req.body.presFech1 !== "" ? req.body.presFech1.replace(",", ".") : 0.0;
   var presFecha2 = req.body.presFech2 !== "" ? req.body.presFech2.replace(",", ".") : 0.0;
   var presFecha3 = req.body.presFech3 !== "" ? req.body.presFech3.replace(",", ".") : 0.0;
   var protMPres = req.body.protMPres !== "" ? req.body.protMPres.replace(",", ".") : 0.0;
   var AltaPresPres = req.body.AltaPresPressao !== "" ? req.body.AltaPresPressao.replace(",", ".") : 0.0;
   var fluxoFecha1 = req.body.fluxoFech1 !== "" ? req.body.fluxoFech1.replace(",", ".") : 0.0;
   var fluxoFecha2 = req.body.fluxoFech2 !== "" ? req.body.fluxoFech2.replace(",", ".") : 0.0;
   var fluxoFecha3 = req.body.fluxoFech3 !== "" ? req.body.fluxoFech3.replace(",", ".") : 0.0;
   var protMFluxo = req.body.protMFluxo !== "" ? req.body.protMFluxo.replace(",", ".") : 0.0;
   var AltaPresFluxo = req.body.AltaPresFluxo !== "" ? req.body.AltaPresFluxo.replace(",", ".") : 0.0;
   var tempoProtMolde = req.body.tempoProtMolde !== "" ? req.body.tempoProtMolde.replace(",", ".") : 0.0;
   var tempoFecha = req.body.tempoFecha !== "" ? req.body.tempoFecha.replace(",", ".") : 0.0;
   var posAbertura1 = req.body.posAbertura5 !== "" ? req.body.posAbertura5.replace(",", ".") : 0.0;
   var posAbertura2 = req.body.posAbertura4 !== "" ? req.body.posAbertura4.replace(",", ".") : 0.0;
   var posAbertura3 = req.body.posAbertura3 !== "" ? req.body.posAbertura3.replace(",", ".") : 0.0;
   var posAbertura4 = req.body.posAbertura2 !== "" ? req.body.posAbertura2.replace(",", ".") : 0.0;
   var posAbertura5 = req.body.posAbertura1 !== "" ? req.body.posAbertura1.replace(",", ".") : 0.0;
   var presAbertura1 = req.body.presAbertura5 !== "" ? req.body.presAbertura5.replace(",", ".") : 0.0;
   var presAbertura2 = req.body.presAbertura4 !== "" ? req.body.presAbertura4.replace(",", ".") : 0.0;
   var presAbertura3 = req.body.presAbertura3 !== "" ? req.body.presAbertura3.replace(",", ".") : 0.0;
   var presAbertura4 = req.body.presAbertura2 !== "" ? req.body.presAbertura2.replace(",", ".") : 0.0;
   var presAbertura5 = req.body.presAbertura1 !== "" ? req.body.presAbertura1.replace(",", ".") : 0.0;
   var fluxoAbertura1 = req.body.fluxoAbertura5 !== "" ? req.body.fluxoAbertura5.replace(",", ".") : 0.0;
   var fluxoAbertura2 = req.body.fluxoAbertura4 !== "" ? req.body.fluxoAbertura4.replace(",", ".") : 0.0;
   var fluxoAbertura3 = req.body.fluxoAbertura3 !== "" ? req.body.fluxoAbertura3.replace(",", ".") : 0.0;
   var fluxoAbertura4 = req.body.fluxoAbertura2 !== "" ? req.body.fluxoAbertura2.replace(",", ".") : 0.0;
   var fluxoAbertura5 = req.body.fluxoAbertura1 !== "" ? req.body.fluxoAbertura1.replace(",", ".") : 0.0;
   var resfriamento = req.body.resfriamento !== "" ? req.body.resfriamento.replace(",", ".") : 0.0;
   var tempoAbertura = req.body.tempoAbertura !== "" ? req.body.tempoAbertura.replace(",", ".") : 0.0;
   var posAvanco1 = req.body.posAvanco1 !== "" ? req.body.posAvanco1.replace(",", ".") : 0.0;
   var posAvanco2 = req.body.posAvanco2 !== "" ? req.body.posAvanco2.replace(",", ".") : 0.0;
   var posAvanco3 = req.body.posAvanco3 !== "" ? req.body.posAvanco3.replace(",", ".") : 0.0;
   var posRecuo1 = req.body.posRecuo1 !== "" ? req.body.posRecuo1.replace(",", ".") : 0.0;
   var posRecuo2 = req.body.posRecuo2 !== "" ? req.body.posRecuo2.replace(",", ".") : 0.0;
   var posRecuo3 = req.body.posRecuo3 !== "" ? req.body.posRecuo3.replace(",", ".") : 0.0;
   var presAvanco1 = req.body.presAvanco1 !== "" ? req.body.presAvanco1.replace(",", ".") : 0.0;
   var presAvanco2 = req.body.presAvanco2 !== "" ? req.body.presAvanco2.replace(",", ".") : 0.0;
   var presAvanco3 = req.body.presAvanco3 !== "" ? req.body.presAvanco3.replace(",", ".") : 0.0;
   var presRecuo1 = req.body.presRecuo1 !== "" ? req.body.presRecuo1.replace(",", ".") : 0.0;
   var presRecuo2 = req.body.presRecuo2 !== "" ? req.body.presRecuo2.replace(",", ".") : 0.0;
   var presRecuo3 = req.body.presRecuo3 !== "" ? req.body.presRecuo3.replace(",", ".") : 0.0;
   var fluxoAvanco1 = req.body.fluxoAvanco1 !== "" ? req.body.fluxoAvanco1.replace(",", ".") : 0.0;
   var fluxoAvanco2 = req.body.fluxoAvanco2 !== "" ? req.body.fluxoAvanco2.replace(",", ".") : 0.0;
   var fluxoAvanco3 = req.body.fluxoAvanco3 !== "" ? req.body.fluxoAvanco3.replace(",", ".") : 0.0;
   var fluxoRecuo1 = req.body.fluxoRecuo1 !== "" ? req.body.fluxoRecuo1.replace(",", ".") : 0.0;
   var fluxoRecuo2 = req.body.fluxoRecuo2 !== "" ? req.body.fluxoRecuo2.replace(",", ".") : 0.0;
   var fluxoRecuo3 = req.body.fluxoRecuo3 !== "" ? req.body.fluxoRecuo3.replace(",", ".") : 0.0;
   var atraso = req.body.atraso !== "" ? req.body.atraso.replace(",", ".") : 0.0;
   var batida = req.body.batida !== "" ? req.body.batida.replace(",", ".") : 0.0;
   var radialTypeEntrada1 = req.body.type1 !== "" ? req.body.type1.replace(",", ".") : 0.0;
   var radialTypeSaida1 = req.body.type2 !== "" ? req.body.type2.replace(",", ".") : 0.0;
   var radialTypeEntrada2 = req.body.type3 !== "" ? req.body.type3.replace(",", ".") : 0.0;
   var radialTypeSaida2 = req.body.type4 !== "" ? req.body.type4.replace(",", ".") : 0.0;
   var radialPresEntrada1 = req.body.pressaoRadial1 !== "" ? req.body.pressaoRadial1.replace(",", ".") : 0.0;
   var radialPresSaida1 = req.body.pressaoRadial2 !== "" ? req.body.pressaoRadial2.replace(",", ".") : 0.0;
   var radialPresEntrada2 = req.body.pressaoRadial3 !== "" ? req.body.pressaoRadial3.replace(",", ".") : 0.0;
   var radialPresSaida2 = req.body.pressaoRadial4 !== "" ? req.body.pressaoRadial4.replace(",", ".") : 0.0;
   var radialPresEntrada3 = req.body.pressaoRadial5 !== "" ? req.body.pressaoRadial5.replace(",", ".") : 0.0;
   var radialPresSaida3 = req.body.pressaoRadial6 !== "" ? req.body.pressaoRadial6.replace(",", ".") : 0.0;
   var radialFluxoEntrada1 = req.body.fluxoRadial1 !== "" ? req.body.fluxoRadial1.replace(",", ".") : 0.0;
   var radialFluxoSaida1 = req.body.fluxoRadial2 !== "" ? req.body.fluxoRadial2.replace(",", ".") : 0.0;
   var radialFluxoEntrada2 = req.body.fluxoRadial3 !== "" ? req.body.fluxoRadial3.replace(",", ".") : 0.0;
   var radialFluxoSaida2 = req.body.fluxoRadial4 !== "" ? req.body.fluxoRadial4.replace(",", ".") : 0.0;
   var radialFluxoEntrada3 = req.body.fluxoRadial5 !== "" ? req.body.fluxoRadial5.replace(",", ".") : 0.0;
   var radialFluxoSaida3 = req.body.fluxoRadial6 !== "" ? req.body.fluxoRadial6.replace(",", ".") : 0.0;
   var radialPosEntrada1 = req.body.posRadial1 !== "" ? req.body.posRadial1.replace(",", ".") : 0.0;
   var radialPosSaida1 = req.body.posRadial2 !== "" ? req.body.posRadial2.replace(",", ".") : 0.0;
   var radialPosEntrada2 = req.body.posRadial3 !== "" ? req.body.posRadial3.replace(",", ".") : 0.0;
   var radialPosSaida2 = req.body.posRadial4 !== "" ? req.body.posRadial4.replace(",", ".") : 0.0;
   var radialPosEntrada3 = req.body.posRadial5 !== "" ? req.body.posRadial5.replace(",", ".") : 0.0;
   var radialPosSaida3 = req.body.posRadial6 !== "" ? req.body.posRadial6.replace(",", ".") : 0.0;
   var radialTempoEntrada1 = req.body.tempoRadial1 !== "" ? req.body.tempoRadial1.replace(",", ".") : 0.0;
   var radialTempoSaida1 = req.body.tempoRadial2 !== "" ? req.body.tempoRadial2.replace(",", ".") : 0.0;
   var radialTempoEntrada2 = req.body.tempoRadial3 !== "" ? req.body.tempoRadial3.replace(",", ".") : 0.0;
   var radialTempoSaida2 = req.body.tempoRadial4 !== "" ? req.body.tempoRadial4.replace(",", ".") : 0.0;
   var radialTempoEntrada3 = req.body.tempoRadial5 !== "" ? req.body.tempoRadial5.replace(",", ".") : 0.0;
   var radialTempoSaida3 = req.body.tempoRadial6 !== "" ? req.body.tempoRadial6.replace(",", ".") : 0.0;
   var radialSCREntrada1 = req.body.scrcount1 !== "" ? req.body.scrcount1.replace(",", ".") : 0.0;
   var radialSCRSaida1 = req.body.scrcount2 !== "" ? req.body.scrcount2.replace(",", ".") : 0.0;
   var radialSCREntrada2 = req.body.scrcount3 !== "" ? req.body.scrcount3.replace(",", ".") : 0.0;
   var radialSCRSaida2 = req.body.scrcount4 !== "" ? req.body.scrcount4.replace(",", ".") : 0.0;
   var radialSCREntrada3 = req.body.scrcount5 !== "" ? req.body.scrcount5.replace(",", ".") : 0.0;
   var radialSCRSaida3 = req.body.scrcount6 !== "" ? req.body.scrcount6.replace(",", ".") : 0.0;

   var termopar = req.body.termopar;
   var voltagem = req.body.voltagem;
   var camara1 = req.body.camara1[0] !== "" ? req.body.camara1[0].replace(",", ".") : 0.0;
   var camara2 = req.body.camara2[0] !== "" ? req.body.camara2[0].replace(",", ".") : 0.0;
   var camara3 = req.body.camara3[0] !== "" ? req.body.camara3[0].replace(",", ".") : 0.0;
   var camara4 = req.body.camara4[0] !== "" ? req.body.camara4[0].replace(",", ".") : 0.0;
   var camara5 = req.body.camara5[0] !== "" ? req.body.camara5[0].replace(",", ".") : 0.0;
   var camara6 = req.body.camara6[0] !== "" ? req.body.camara6[0].replace(",", ".") : 0.0;
   var camara7 = req.body.camara7[0] !== "" ? req.body.camara7[0].replace(",", ".") : 0.0;
   var camara8 = req.body.camara1[1] !== "" ? req.body.camara1[1].replace(",", ".") : 0.0;
   var camara9 = req.body.camara2[1] !== "" ? req.body.camara2[1].replace(",", ".") : 0.0;
   var camara10 = req.body.camara3[1] !== "" ? req.body.camara3[1].replace(",", ".") : 0.0;
   var camara11 = req.body.camara4[1] !== "" ? req.body.camara4[1].replace(",", ".") : 0.0;
   var camara12 = req.body.camara5[1] !== "" ? req.body.camara5[1].replace(",", ".") : 0.0;
   var camara13 = req.body.camara6[1] !== "" ? req.body.camara6[1].replace(",", ".") : 0.0;
   var camara14 = req.body.camara7[1] !== "" ? req.body.camara7[1].replace(",", ".") : 0.0;
   var camara15 = req.body.camara1[2] !== "" ? req.body.camara1[2].replace(",", ".") : 0.0;
   var camara16 = req.body.camara2[2] !== "" ? req.body.camara2[2].replace(",", ".") : 0.0;
   var camara17 = req.body.camara3[2] !== "" ? req.body.camara3[2].replace(",", ".") : 0.0;
   var camara18 = req.body.camara4[2] !== "" ? req.body.camara4[3].replace(",", ".") : 0.0;
   var camara19 = req.body.camara5[2] !== "" ? req.body.camara5[2].replace(",", ".") : 0.0;
   var camara20 = req.body.camara6[2] !== "" ? req.body.camara6[2].replace(",", ".") : 0.0;
   var camara21 = req.body.camara7[2] !== "" ? req.body.camara7[2].replace(",", ".") : 0.0;
   var camara22 = req.body.camara1[3] !== "" ? req.body.camara1[3].replace(",", ".") : 0.0;
   var camara23 = req.body.camara2[3] !== "" ? req.body.camara2[3].replace(",", ".") : 0.0;
   var camara24 = req.body.camara3[3] !== "" ? req.body.camara3[3].replace(",", ".") : 0.0;
   var camara25 = req.body.camara4[3] !== "" ? req.body.camara4[3].replace(",", ".") : 0.0;
   var camara26 = req.body.camara5[3] !== "" ? req.body.camara5[3].replace(",", ".") : 0.0;
   var camara27 = req.body.camara6[3] !== "" ? req.body.camara6[3].replace(",", ".") : 0.0;
   var camara28 = req.body.camara7[3] !== "" ? req.body.camara7[3].replace(",", ".") : 0.0;
   var camara29 = req.body.camara1[4] !== "" ? req.body.camara1[4].replace(",", ".") : 0.0;
   var camara30 = req.body.camara2[4] !== "" ? req.body.camara2[4].replace(",", ".") : 0.0;
   var camara31 = req.body.camara3[4] !== "" ? req.body.camara3[4].replace(",", ".") : 0.0;
   var camara32 = req.body.camara4[4] !== "" ? req.body.camara4[4].replace(",", ".") : 0.0;
   var camara33 = req.body.camara5[4] !== "" ? req.body.camara5[4].replace(",", ".") : 0.0;
   var camara34 = req.body.camara6[4] !== "" ? req.body.camara6[4].replace(",", ".") : 0.0;
   var camara35 = req.body.camara7[4] !== "" ? req.body.camara7[4].replace(",", ".") : 0.0;
   var camara36 = req.body.camara1[5] !== "" ? req.body.camara1[5].replace(",", ".") : 0.0;
   var camara37 = req.body.camara2[5] !== "" ? req.body.camara2[5].replace(",", ".") : 0.0;
   var camara38 = req.body.camara3[5] !== "" ? req.body.camara3[5].replace(",", ".") : 0.0;
   var camara39 = req.body.camara4[5] !== "" ? req.body.camara4[5].replace(",", ".") : 0.0;
   var camara40 = req.body.camara5[5] !== "" ? req.body.camara5[5].replace(",", ".") : 0.0;
   var camara41 = req.body.camara6[5] !== "" ? req.body.camara6[5].replace(",", ".") : 0.0;
   var camara42 = req.body.camara7[5] !== "" ? req.body.camara7[5].replace(",", ".") : 0.0;
   var camara43 = req.body.camara1[6] !== "" ? req.body.camara1[6].replace(",", ".") : 0.0;
   var camara44 = req.body.camara2[6] !== "" ? req.body.camara2[6].replace(",", ".") : 0.0;
   var camara45 = req.body.camara3[6] !== "" ? req.body.camara3[6].replace(",", ".") : 0.0;
   var camara46 = req.body.camara4[6] !== "" ? req.body.camara4[6].replace(",", ".") : 0.0;
   var camara47 = req.body.camara5[6] !== "" ? req.body.camara5[6].replace(",", ".") : 0.0;
   var camara48 = req.body.camara6[6] !== "" ? req.body.camara6[6].replace(",", ".") : 0.0;
   var camara49 = req.body.camara7[6] !== "" ? req.body.camara7[6].replace(",", ".") : 0.0;
   var camara50 = req.body.camara1[7] !== "" ? req.body.camara1[7].replace(",", ".") : 0.0;
   var camara51 = req.body.camara2[7] !== "" ? req.body.camara2[7].replace(",", ".") : 0.0;
   var camara52 = req.body.camara3[7] !== "" ? req.body.camara3[7].replace(",", ".") : 0.0;
   var camara53 = req.body.camara4[7] !== "" ? req.body.camara4[7].replace(",", ".") : 0.0;
   var camara54 = req.body.camara5[7] !== "" ? req.body.camara5[7].replace(",", ".") : 0.0;
   var camara55 = req.body.camara6[7] !== "" ? req.body.camara6[7].replace(",", ".") : 0.0;
   var camara56 = req.body.camara7[7] !== "" ? req.body.camara7[7].replace(",", ".") : 0.0;
   var camara57 = req.body.camara1[8] !== "" ? req.body.camara1[8].replace(",", ".") : 0.0;
   var camara58 = req.body.camara2[8] !== "" ? req.body.camara2[8].replace(",", ".") : 0.0;
   var camara59 = req.body.camara3[8] !== "" ? req.body.camara3[8].replace(",", ".") : 0.0;
   var camara60 = req.body.camara4[8] !== "" ? req.body.camara4[8].replace(",", ".") : 0.0;
   var camara61 = req.body.camara5[8] !== "" ? req.body.camara5[8].replace(",", ".") : 0.0;
   var camara62 = req.body.camara6[8] !== "" ? req.body.camara6[8].replace(",", ".") : 0.0;
   var camara63 = req.body.camara7[8] !== "" ? req.body.camara7[8].replace(",", ".") : 0.0;
   var camara64 = req.body.camara1[9] !== "" ? req.body.camara1[9].replace(",", ".") : 0.0;
   var camara65 = req.body.camara2[9] !== "" ? req.body.camara2[9].replace(",", ".") : 0.0;
   var camara66 = req.body.camara3[9] !== "" ? req.body.camara3[9].replace(",", ".") : 0.0;
   var camara67 = req.body.camara4[9] !== "" ? req.body.camara4[9].replace(",", ".") : 0.0;
   var camara68 = req.body.camara5[9] !== "" ? req.body.camara5[9].replace(",", ".") : 0.0;
   var camara69 = req.body.camara6[9] !== "" ? req.body.camara6[9].replace(",", ".") : 0.0;
   var camara70 = req.body.camara7[9] !== "" ? req.body.camara7[9].replace(",", ".") : 0.0;
   var camara71 = req.body.camara1[10] !== "" ? req.body.camara1[10].replace(",", ".") : 0.0;
   var camara72 = req.body.camara2[10] !== "" ? req.body.camara2[10].replace(",", ".") : 0.0;
   var camara73 = req.body.camara3[10] !== "" ? req.body.camara3[10].replace(",", ".") : 0.0;
   var camara74 = req.body.camara4[10] !== "" ? req.body.camara4[10].replace(",", ".") : 0.0;
   var camara75 = req.body.camara5[10] !== "" ? req.body.camara5[10].replace(",", ".") : 0.0;
   var camara76 = req.body.camara6[10] !== "" ? req.body.camara6[10].replace(",", ".") : 0.0;
   var camara77 = req.body.camara7[10] !== "" ? req.body.camara7[10].replace(",", ".") : 0.0;
   var camara78 = req.body.camara1[11] !== "" ? req.body.camara1[11].replace(",", ".") : 0.0;
   var camara79 = req.body.camara2[11] !== "" ? req.body.camara2[11].replace(",", ".") : 0.0;
   var camara80 = req.body.camara3[11] !== "" ? req.body.camara3[11].replace(",", ".") : 0.0;
   var camara81 = req.body.camara4[11] !== "" ? req.body.camara4[11].replace(",", ".") : 0.0;
   var camara82 = req.body.camara5[11] !== "" ? req.body.camara5[11].replace(",", ".") : 0.0;
   var camara83 = req.body.camara6[11] !== "" ? req.body.camara6[11].replace(",", ".") : 0.0;
   var camara84 = req.body.camara7[11] !== "" ? req.body.camara7[11].replace(",", ".") : 0.0;
   var camara85 = req.body.camara1[12] !== "" ? req.body.camara1[12].replace(",", ".") : 0.0;
   var camara86 = req.body.camara2[12] !== "" ? req.body.camara2[12].replace(",", ".") : 0.0;
   var camara87 = req.body.camara3[12] !== "" ? req.body.camara3[12].replace(",", ".") : 0.0;
   var camara88 = req.body.camara4[12] !== "" ? req.body.camara4[12].replace(",", ".") : 0.0;
   var camara89 = req.body.camara5[12] !== "" ? req.body.camara5[12].replace(",", ".") : 0.0;
   var camara90 = req.body.camara6[12] !== "" ? req.body.camara6[12].replace(",", ".") : 0.0;
   var camara91 = req.body.camara7[12] !== "" ? req.body.camara7[12].replace(",", ".") : 0.0;
   var camara92 = req.body.camara1[13] !== "" ? req.body.camara1[13].replace(",", ".") : 0.0;
   var camara93 = req.body.camara2[13] !== "" ? req.body.camara2[13].replace(",", ".") : 0.0;
   var camara94 = req.body.camara3[13] !== "" ? req.body.camara3[13].replace(",", ".") : 0.0;
   var camara95 = req.body.camara4[13] !== "" ? req.body.camara4[13].replace(",", ".") : 0.0;
   var camara96 = req.body.camara5[13] !== "" ? req.body.camara5[13].replace(",", ".") : 0.0;
   var camara97 = req.body.camara6[13] !== "" ? req.body.camara6[13].replace(",", ".") : 0.0;
   var camara98 = req.body.camara7[13] !== "" ? req.body.camara7[13].replace(",", ".") : 0.0;
   var camara99 = req.body.camara1[14] !== "" ? req.body.camara1[14].replace(",", ".") : 0.0;
   var camara100 = req.body.camara2[14] !== "" ? req.body.camara2[14].replace(",", ".") : 0.0;
   var camara101 = req.body.camara3[14] !== "" ? req.body.camara3[14].replace(",", ".") : 0.0;
   var camara102 = req.body.camara4[14] !== "" ? req.body.camara4[14].replace(",", ".") : 0.0;
   var camara103 = req.body.camara5[14] !== "" ? req.body.camara5[14].replace(",", ".") : 0.0;
   var camara104 = req.body.camara6[14] !== "" ? req.body.camara6[14].replace(",", ".") : 0.0;
   var camara105 = req.body.camara7[14] !== "" ? req.body.camara7[14].replace(",", ".") : 0.0;
   var camara106 = req.body.camara1[15] !== "" ? req.body.camara1[15].replace(",", ".") : 0.0;
   var camara107 = req.body.camara2[15] !== "" ? req.body.camara2[15].replace(",", ".") : 0.0;
   var camara108 = req.body.camara3[15] !== "" ? req.body.camara3[15].replace(",", ".") : 0.0;
   var camara109 = req.body.camara4[15] !== "" ? req.body.camara4[15].replace(",", ".") : 0.0;
   var camara110 = req.body.camara5[15] !== "" ? req.body.camara5[15].replace(",", ".") : 0.0;
   var camara111 = req.body.camara6[15] !== "" ? req.body.camara6[15].replace(",", ".") : 0.0;
   var camara112 = req.body.camara7[15] !== "" ? req.body.camara7[15].replace(",", ".") : 0.0;
   var camara113 = req.body.camara1[16] !== "" ? req.body.camara1[16].replace(",", ".") : 0.0;
   var camara114 = req.body.camara2[16] !== "" ? req.body.camara2[16].replace(",", ".") : 0.0;
   var camara115 = req.body.camara3[16] !== "" ? req.body.camara3[16].replace(",", ".") : 0.0;
   var camara116 = req.body.camara4[16] !== "" ? req.body.camara4[16].replace(",", ".") : 0.0;
   var camara117 = req.body.camara5[16] !== "" ? req.body.camara5[16].replace(",", ".") : 0.0;
   var camara118 = req.body.camara6[16] !== "" ? req.body.camara6[16].replace(",", ".") : 0.0;
   var camara119 = req.body.camara7[16] !== "" ? req.body.camara7[16].replace(",", ".") : 0.0;
   var camara120 = req.body.camara1[17] !== "" ? req.body.camara1[17].replace(",", ".") : 0.0;
   var camara121 = req.body.camara2[17] !== "" ? req.body.camara2[17].replace(",", ".") : 0.0;
   var camara122 = req.body.camara3[17] !== "" ? req.body.camara3[17].replace(",", ".") : 0.0;
   var camara123 = req.body.camara4[17] !== "" ? req.body.camara4[17].replace(",", ".") : 0.0;
   var camara124 = req.body.camara5[17] !== "" ? req.body.camara5[17].replace(",", ".") : 0.0;
   var camara125 = req.body.camara6[17] !== "" ? req.body.camara6[17].replace(",", ".") : 0.0;
   var camara126 = req.body.camara7[17] !== "" ? req.body.camara7[17].replace(",", ".") : 0.0;
   var camara127 = req.body.camara1[18] !== "" ? req.body.camara1[18].replace(",", ".") : 0.0;
   var camara128 = req.body.camara2[18] !== "" ? req.body.camara2[18].replace(",", ".") : 0.0;
   var camara129 = req.body.camara3[18] !== "" ? req.body.camara3[18].replace(",", ".") : 0.0;
   var camara130 = req.body.camara4[18] !== "" ? req.body.camara4[18].replace(",", ".") : 0.0;
   var VG1DLYTIME = req.body.VG1[0] !== "" ? req.body.VG1[0].replace(",", ".") : 0.0;
   var VG1ACTTIME = req.body.VG1[1] !== "" ? req.body.VG1[1].replace(",", ".") : 0.0;
   var VG2DLYTIME = req.body.VG1[2] !== "" ? req.body.VG1[2].replace(",", ".") : 0.0;
   var VG2ACTTIME = req.body.VG1[3] !== "" ? req.body.VG1[3].replace(",", ".") : 0.0;
   var VG3DLYTIME = req.body.VG1[4] !== "" ? req.body.VG1[4].replace(",", ".") : 0.0;
   var VG3ACTTIME = req.body.VG1[5] !== "" ? req.body.VG1[5].replace(",", ".") : 0.0;
   var VG4DLYTIME = req.body.VG1[6] !== "" ? req.body.VG1[6].replace(",", ".") : 0.0;
   var VG4ACTTIME = req.body.VG1[7] !== "" ? req.body.VG1[7].replace(",", ".") : 0.0;
   var VG5DLYTIME = req.body.VG1[8] !== "" ? req.body.VG1[8].replace(",", ".") : 0.0;
   var VG5ACTTIME = req.body.VG1[9] !== "" ? req.body.VG1[9].replace(",", ".") : 0.0;
   var VG6DLYTIME = req.body.VG1[10] !== "" ? req.body.VG1[10].replace(",", ".") : 0.0;
   var VG6ACTTIME = req.body.VG1[11] !== "" ? req.body.VG1[11].replace(",", ".") : 0.0;
   var VG7DLYTIME = req.body.VG1[12] !== "" ? req.body.VG1[12].replace(",", ".") : 0.0;
   var VG7ACTTIME = req.body.VG1[13] !== "" ? req.body.VG1[13].replace(",", ".") : 0.0;
   var VG8DLYTIME = req.body.VG1[14] !== "" ? req.body.VG1[14].replace(",", ".") : 0.0;
   var VG8ACTTIME = req.body.VG1[15] !== "" ? req.body.VG1[15].replace(",", ".") : 0.0;
   var VG9DLYTIME = req.body.VG1[16] !== "" ? req.body.VG1[16].replace(",", ".") : 0.0;
   var VG9ACTTIME = req.body.VG1[17] !== "" ? req.body.VG1[17].replace(",", ".") : 0.0;
   var VG10DLYTIME = req.body.VG1[18] !== "" ? req.body.VG1[18].replace(",", ".") : 0.0;
   var VG10ACTTIME = req.body.VG1[19] !== "" ? req.body.VG1[19].replace(",", ".") : 0.0;
   var VG11DLYTIME = req.body.VG1[20] !== "" ? req.body.VG1[20].replace(",", ".") : 0.0;
   var VG11ACTTIME = req.body.VG1[21] !== "" ? req.body.VG1[21].replace(",", ".") : 0.0;
   var VG12DLYTIME = req.body.VG1[22] !== "" ? req.body.VG1[22].replace(",", ".") : 0.0;
   var VG12ACTTIME = req.body.VG1[23] !== "" ? req.body.VG1[23].replace(",", ".") : 0.0;
   var VG13DLYTIME = req.body.VG1[24] !== "" ? req.body.VG1[24].replace(",", ".") : 0.0;
   var VG13ACTTIME = req.body.VG1[25] !== "" ? req.body.VG1[25].replace(",", ".") : 0.0;
   var VG14DLYTIME = req.body.VG1[26] !== "" ? req.body.VG1[26].replace(",", ".") : 0.0;
   var VG14ACTTIME = req.body.VG1[27] !== "" ? req.body.VG1[27].replace(",", ".") : 0.0;
   var VG15DLYTIME = req.body.VG1[28] !== "" ? req.body.VG1[28].replace(",", ".") : 0.0;
   var VG15ACTTIME = req.body.VG1[29] !== "" ? req.body.VG1[29].replace(",", ".") : 0.0;
   var VG16DLYTIME = req.body.VG1[30] !== "" ? req.body.VG1[30].replace(",", ".") : 0.0;
   var VG16ACTTIME = req.body.VG1[31] !== "" ? req.body.VG1[31].replace(",", ".") : 0.0;
   var VG17DLYTIME = req.body.VG1[32] !== "" ? req.body.VG1[32].replace(",", ".") : 0.0;
   var VG17ACTTIME = req.body.VG1[33] !== "" ? req.body.VG1[33].replace(",", ".") : 0.0;
   var VG18DLYTIME = req.body.VG1[34] !== "" ? req.body.VG1[34].replace(",", ".") : 0.0;
   var VG18ACTTIME = req.body.VG1[35] !== "" ? req.body.VG1[35].replace(",", ".") : 0.0;
   var VG19DLYTIME = req.body.VG1[36] !== "" ? req.body.VG1[36].replace(",", ".") : 0.0;
   var VG19ACTTIME = req.body.VG1[37] !== "" ? req.body.VG1[37].replace(",", ".") : 0.0;
   var VG20DLYTIME = req.body.VG1[38] !== "" ? req.body.VG1[38].replace(",", ".") : 0.0;
   var VG20ACTTIME = req.body.VG1[39] !== "" ? req.body.VG1[39].replace(",", ".") : 0.0;
   var VG21DLYTIME = req.body.VG2[0] !== "" ? req.body.VG2[0].replace(",", ".") : 0.0;
   var VG21ACTTIME = req.body.VG2[1] !== "" ? req.body.VG2[1].replace(",", ".") : 0.0;
   var VG22DLYTIME = req.body.VG2[2] !== "" ? req.body.VG2[2].replace(",", ".") : 0.0;
   var VG22ACTTIME = req.body.VG2[3] !== "" ? req.body.VG2[3].replace(",", ".") : 0.0;
   var VG23DLYTIME = req.body.VG2[4] !== "" ? req.body.VG2[4].replace(",", ".") : 0.0;
   var VG23ACTTIME = req.body.VG2[5] !== "" ? req.body.VG2[5].replace(",", ".") : 0.0;
   var VG24DLYTIME = req.body.VG2[6] !== "" ? req.body.VG2[6].replace(",", ".") : 0.0;
   var VG24ACTTIME = req.body.VG2[7] !== "" ? req.body.VG2[7].replace(",", ".") : 0.0;
   var VG25DLYTIME = req.body.VG2[8] !== "" ? req.body.VG2[8].replace(",", ".") : 0.0;
   var VG25ACTTIME = req.body.VG2[9] !== "" ? req.body.VG2[9].replace(",", ".") : 0.0;
   var VG26DLYTIME = req.body.VG2[10] !== "" ? req.body.VG2[10].replace(",", ".") : 0.0;
   var VG26ACTTIME = req.body.VG2[11] !== "" ? req.body.VG2[11].replace(",", ".") : 0.0;
   var VG27DLYTIME = req.body.VG2[12] !== "" ? req.body.VG2[12].replace(",", ".") : 0.0;
   var VG27ACTTIME = req.body.VG2[13] !== "" ? req.body.VG2[13].replace(",", ".") : 0.0;
   var VG28DLYTIME = req.body.VG2[14] !== "" ? req.body.VG2[14].replace(",", ".") : 0.0;
   var VG28ACTTIME = req.body.VG2[15] !== "" ? req.body.VG2[15].replace(",", ".") : 0.0;
   var VG29DLYTIME = req.body.VG2[16] !== "" ? req.body.VG2[16].replace(",", ".") : 0.0;
   var VG29ACTTIME = req.body.VG2[17] !== "" ? req.body.VG2[17].replace(",", ".") : 0.0;
   var VG30DLYTIME = req.body.VG2[18] !== "" ? req.body.VG2[18].replace(",", ".") : 0.0;
   var VG30ACTTIME = req.body.VG2[19] !== "" ? req.body.VG2[19].replace(",", ".") : 0.0;
   var VG31DLYTIME = req.body.VG2[20] !== "" ? req.body.VG2[20].replace(",", ".") : 0.0;
   var VG31ACTTIME = req.body.VG2[21] !== "" ? req.body.VG2[21].replace(",", ".") : 0.0;
   var VG32DLYTIME = req.body.VG2[22] !== "" ? req.body.VG2[22].replace(",", ".") : 0.0;
   var VG32ACTTIME = req.body.VG2[23] !== "" ? req.body.VG2[23].replace(",", ".") : 0.0;
   var VG33DLYTIME = req.body.VG2[24] !== "" ? req.body.VG2[24].replace(",", ".") : 0.0;
   var VG33ACTTIME = req.body.VG2[25] !== "" ? req.body.VG2[25].replace(",", ".") : 0.0;
   var VG34DLYTIME = req.body.VG2[26] !== "" ? req.body.VG2[26].replace(",", ".") : 0.0;
   var VG34ACTTIME = req.body.VG2[27] !== "" ? req.body.VG2[27].replace(",", ".") : 0.0;
   var VG35DLYTIME = req.body.VG2[28] !== "" ? req.body.VG2[28].replace(",", ".") : 0.0;
   var VG35ACTTIME = req.body.VG2[29] !== "" ? req.body.VG2[29].replace(",", ".") : 0.0;
   var VG36DLYTIME = req.body.VG2[30] !== "" ? req.body.VG2[30].replace(",", ".") : 0.0;
   var VG36ACTTIME = req.body.VG2[31] !== "" ? req.body.VG2[31].replace(",", ".") : 0.0;
   var VG37DLYTIME = req.body.VG2[32] !== "" ? req.body.VG2[32].replace(",", ".") : 0.0;
   var VG37ACTTIME = req.body.VG2[33] !== "" ? req.body.VG2[33].replace(",", ".") : 0.0;
   var VG38DLYTIME = req.body.VG2[34] !== "" ? req.body.VG2[34].replace(",", ".") : 0.0;
   var VG38ACTTIME = req.body.VG2[35] !== "" ? req.body.VG2[35].replace(",", ".") : 0.0;
   var VG39DLYTIME = req.body.VG2[36] !== "" ? req.body.VG2[36].replace(",", ".") : 0.0;
   var VG39ACTTIME = req.body.VG2[37] !== "" ? req.body.VG2[37].replace(",", ".") : 0.0;
   var VG40DLYTIME = req.body.VG2[38] !== "" ? req.body.VG2[38].replace(",", ".") : 0.0;
   var VG40ACTTIME = req.body.VG2[39] !== "" ? req.body.VG2[39].replace(",", ".") : 0.0;
   
   var refrLadoFixo1 = req.body.rmladofixo1 !== "" ? req.body.rmladofixo1 : 0.0;
   var fixoRefrig1 = req.body.fixoRefrig1;
   var refrLadoFixo2 = req.body.rmladofixo2 !== "" ? req.body.rmladofixo2 : 0.0;
   var fixoRefrig2 = req.body.fixoRefrig2;
   var refrLadoFixo3 = req.body.rmladofixo3 !== "" ? req.body.rmladofixo3 : 0.0;
   var fixoRefrig3 = req.body.fixoRefrig3;
   var refrLadoFixo4 = req.body.rmladofixo4 !== "" ? req.body.rmladofixo4 : 0.0;
   var fixoRefrig4 = req.body.fixoRefrig4;
   
   var refrLadoMovel1 = req.body.rmladomovel1 !== "" ? req.body.rmladomovel1 : 0.0;
   var movelRefrig1 = req.body.movelRefrig1;
   var refrLadoMovel2 = req.body.rmladomovel2 !== "" ? req.body.rmladomovel2 : 0.0;
   var movelRefrig2 = req.body.movelRefrig2;
   var refrLadoMovel3 = req.body.rmladomovel3 !== "" ? req.body.rmladomovel3 : 0.0;
   var movelRefrig3 = req.body.movelRefrig3;
   var refrLadoMovel4 = req.body.rmladomovel4 !== "" ? req.body.rmladomovel4 : 0.0;
   var movelRefrig4 = req.body.movelRefrig4;

   var vaporLadoFixo1 = req.body.vaporladofixo1 !== "" ? req.body.vaporladofixo1 : 0.0;
   var vaporLadoMovel1 = req.body.vaporladomovel1 !== "" ? req.body.vaporladomovel1 : 0.0;
   var vaporLadoFixo2 = req.body.vaporladofixo2 !== "" ? req.body.vaporladofixo2 : 0.0;
   var vaporLadoMovel2 = req.body.vaporladomovel2 !== "" ? req.body.vaporladomovel2 : 0.0;
   var vaporLadoFixo3 = req.body.vaporladofixo3 !== "" ? req.body.vaporladofixo3 : 0.0;
   var vaporLadoMovel3 = req.body.vaporladomovel3 !== "" ? req.body.vaporladomovel3 : 0.0;
   var vaporLadoFixo4 = req.body.vaporladofixo4 !== "" ? req.body.vaporladofixo4 : 0.0;
   var vaporLadoMovel4 = req.body.vaporladomovel4 !== "" ? req.body.vaporladomovel4 : 0.0;
   var vaporLadoFixo5 = req.body.vaporladofixo5 !== "" ? req.body.vaporladofixo5 : 0.0;
   var vaporLadoMovel5 = req.body.vaporladomovel5 !== "" ? req.body.vaporladomovel5 : 0.0;
   var fixoSteam = req.body.fixoSteam;
   var movelSteam = req.body.movelSteam;

   //*salvando os dados
   FichaTecnicaPastoreInjetores.create({
      maq: maquina,
      NúmeroMolde: NúmeroMolde,
      NúmeroMáquina: NúmeroMáquina,
      Revisao: Revisao,
      Cliente: Cliente,
      CodigoPAM: CodigoPAM,
      Tecnico: Tecnico,
      Produto: Produto,
      Material: Material,
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
         termopar: termopar,
         voltagem: voltagem,
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
         VG1DLYTIME: VG1DLYTIME,
         VG1ACTTIME: VG1ACTTIME,
         VG2DLYTIME: VG2DLYTIME,
         VG2ACTTIME: VG2ACTTIME,
         VG3DLYTIME: VG3DLYTIME,
         VG3ACTTIME: VG3ACTTIME,
         VG4DLYTIME: VG4DLYTIME,
         VG4ACTTIME: VG4ACTTIME,
         VG5DLYTIME: VG5DLYTIME,
         VG5ACTTIME: VG5ACTTIME,
         VG6DLYTIME: VG6DLYTIME,
         VG6ACTTIME: VG6ACTTIME,
         VG7DLYTIME: VG7DLYTIME,
         VG7ACTTIME: VG7ACTTIME,
         VG8DLYTIME: VG8DLYTIME,
         VG8ACTTIME: VG8ACTTIME,
         VG9DLYTIME: VG9DLYTIME,
         VG9ACTTIME: VG9ACTTIME,
         VG10DLYTIME: VG10DLYTIME,
         VG10ACTTIME: VG10ACTTIME,
         VG11DLYTIME: VG11DLYTIME,
         VG11ACTTIME: VG11ACTTIME,
         VG12DLYTIME: VG12DLYTIME,
         VG12ACTTIME: VG12ACTTIME,
         VG13DLYTIME: VG13DLYTIME,
         VG13ACTTIME: VG13ACTTIME,
         VG14DLYTIME: VG14DLYTIME,
         VG14ACTTIME: VG14ACTTIME,
         VG15DLYTIME: VG15DLYTIME,
         VG15ACTTIME: VG15ACTTIME,
         VG16DLYTIME: VG16DLYTIME,
         VG16ACTTIME: VG16ACTTIME,
         VG17DLYTIME: VG17DLYTIME,
         VG17ACTTIME: VG17ACTTIME,
         VG18DLYTIME: VG18DLYTIME,
         VG18ACTTIME: VG18ACTTIME,
         VG19DLYTIME: VG19DLYTIME,
         VG19ACTTIME: VG19ACTTIME,
         VG20DLYTIME: VG20DLYTIME,
         VG20ACTTIME: VG20ACTTIME,
         VG21DLYTIME: VG21DLYTIME,
         VG21ACTTIME: VG21ACTTIME,
         VG22DLYTIME: VG22DLYTIME,
         VG22ACTTIME: VG22ACTTIME,
         VG23DLYTIME: VG23DLYTIME,
         VG23ACTTIME: VG23ACTTIME,
         VG24DLYTIME: VG24DLYTIME,
         VG24ACTTIME: VG24ACTTIME,
         VG25DLYTIME: VG25DLYTIME,
         VG25ACTTIME: VG25ACTTIME,
         VG26DLYTIME: VG26DLYTIME,
         VG26ACTTIME: VG26ACTTIME,
         VG27DLYTIME: VG27DLYTIME,
         VG27ACTTIME: VG27ACTTIME,
         VG28DLYTIME: VG28DLYTIME,
         VG28ACTTIME: VG28ACTTIME,
         VG29DLYTIME: VG29DLYTIME,
         VG29ACTTIME: VG29ACTTIME,
         VG30DLYTIME: VG30DLYTIME,
         VG30ACTTIME: VG30ACTTIME,
         VG31DLYTIME: VG31DLYTIME,
         VG31ACTTIME: VG31ACTTIME,
         VG32DLYTIME: VG32DLYTIME,
         VG32ACTTIME: VG32ACTTIME,
         VG33DLYTIME: VG33DLYTIME,
         VG33ACTTIME: VG33ACTTIME,
         VG34DLYTIME: VG34DLYTIME,
         VG34ACTTIME: VG34ACTTIME,
         VG35DLYTIME: VG35DLYTIME,
         VG35ACTTIME: VG35ACTTIME,
         VG36DLYTIME: VG36DLYTIME,
         VG36ACTTIME: VG36ACTTIME,
         VG37DLYTIME: VG37DLYTIME,
         VG37ACTTIME: VG37ACTTIME,
         VG38DLYTIME: VG38DLYTIME,
         VG38ACTTIME: VG38ACTTIME,
         VG39DLYTIME: VG39DLYTIME,
         VG39ACTTIME: VG39ACTTIME,
         VG40DLYTIME: VG40DLYTIME,
         VG40ACTTIME: VG40ACTTIME,
         refrLadoFixo1: refrLadoFixo1,
         fixoRefrig1: fixoRefrig1,
         refrLadoFixo2: refrLadoFixo2,
         fixoRefrig2: fixoRefrig2,
         refrLadoFixo3: refrLadoFixo3,
         fixoRefrig3: fixoRefrig3,
         refrLadoFixo4: refrLadoFixo4,
         fixoRefrig4: fixoRefrig4,
         refrLadoMovel1: refrLadoMovel1,
         movelRefrig1: movelRefrig1,
         refrLadoMovel2: refrLadoMovel2,
         movelRefrig2: movelRefrig2,
         refrLadoMovel3: refrLadoMovel3,
         movelRefrig3: movelRefrig3,
         refrLadoMovel4: refrLadoMovel4,
         movelRefrig4: movelRefrig4,
         vaporLadoFixo1: vaporLadoFixo1,
         vaporLadoMovel1: vaporLadoMovel1,
         vaporLadoFixo2: vaporLadoFixo2,
         vaporLadoMovel2: vaporLadoMovel2,
         vaporLadoFixo3: vaporLadoFixo3,
         vaporLadoMovel3: vaporLadoMovel3,
         vaporLadoFixo4: vaporLadoFixo4,
         vaporLadoMovel4: vaporLadoMovel4,
         vaporLadoFixo5: vaporLadoFixo5,
         vaporLadoMovel5: vaporLadoMovel5,
         fixoSteam: fixoSteam,
         movelSteam: movelSteam,
      }).then(data => {
         //*salvando os dados no banco de revisao
         RevisaoFichaTecnicaPastorePerifericos.create({
            idFichaTecnica: data.id,
            maq: maquina,
            termopar: termopar,
            voltagem: voltagem,
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
            VG1DLYTIME: VG1DLYTIME,
            VG1ACTTIME: VG1ACTTIME,
            VG2DLYTIME: VG2DLYTIME,
            VG2ACTTIME: VG2ACTTIME,
            VG3DLYTIME: VG3DLYTIME,
            VG3ACTTIME: VG3ACTTIME,
            VG4DLYTIME: VG4DLYTIME,
            VG4ACTTIME: VG4ACTTIME,
            VG5DLYTIME: VG5DLYTIME,
            VG5ACTTIME: VG5ACTTIME,
            VG6DLYTIME: VG6DLYTIME,
            VG6ACTTIME: VG6ACTTIME,
            VG7DLYTIME: VG7DLYTIME,
            VG7ACTTIME: VG7ACTTIME,
            VG8DLYTIME: VG8DLYTIME,
            VG8ACTTIME: VG8ACTTIME,
            VG9DLYTIME: VG9DLYTIME,
            VG9ACTTIME: VG9ACTTIME,
            VG10DLYTIME: VG10DLYTIME,
            VG10ACTTIME: VG10ACTTIME,
            VG11DLYTIME: VG11DLYTIME,
            VG11ACTTIME: VG11ACTTIME,
            VG12DLYTIME: VG12DLYTIME,
            VG12ACTTIME: VG12ACTTIME,
            VG13DLYTIME: VG13DLYTIME,
            VG13ACTTIME: VG13ACTTIME,
            VG14DLYTIME: VG14DLYTIME,
            VG14ACTTIME: VG14ACTTIME,
            VG15DLYTIME: VG15DLYTIME,
            VG15ACTTIME: VG15ACTTIME,
            VG16DLYTIME: VG16DLYTIME,
            VG16ACTTIME: VG16ACTTIME,
            VG17DLYTIME: VG17DLYTIME,
            VG17ACTTIME: VG17ACTTIME,
            VG18DLYTIME: VG18DLYTIME,
            VG18ACTTIME: VG18ACTTIME,
            VG19DLYTIME: VG19DLYTIME,
            VG19ACTTIME: VG19ACTTIME,
            VG20DLYTIME: VG20DLYTIME,
            VG20ACTTIME: VG20ACTTIME,
            VG21DLYTIME: VG21DLYTIME,
            VG21ACTTIME: VG21ACTTIME,
            VG22DLYTIME: VG22DLYTIME,
            VG22ACTTIME: VG22ACTTIME,
            VG23DLYTIME: VG23DLYTIME,
            VG23ACTTIME: VG23ACTTIME,
            VG24DLYTIME: VG24DLYTIME,
            VG24ACTTIME: VG24ACTTIME,
            VG25DLYTIME: VG25DLYTIME,
            VG25ACTTIME: VG25ACTTIME,
            VG26DLYTIME: VG26DLYTIME,
            VG26ACTTIME: VG26ACTTIME,
            VG27DLYTIME: VG27DLYTIME,
            VG27ACTTIME: VG27ACTTIME,
            VG28DLYTIME: VG28DLYTIME,
            VG28ACTTIME: VG28ACTTIME,
            VG29DLYTIME: VG29DLYTIME,
            VG29ACTTIME: VG29ACTTIME,
            VG30DLYTIME: VG30DLYTIME,
            VG30ACTTIME: VG30ACTTIME,
            VG31DLYTIME: VG31DLYTIME,
            VG31ACTTIME: VG31ACTTIME,
            VG32DLYTIME: VG32DLYTIME,
            VG32ACTTIME: VG32ACTTIME,
            VG33DLYTIME: VG33DLYTIME,
            VG33ACTTIME: VG33ACTTIME,
            VG34DLYTIME: VG34DLYTIME,
            VG34ACTTIME: VG34ACTTIME,
            VG35DLYTIME: VG35DLYTIME,
            VG35ACTTIME: VG35ACTTIME,
            VG36DLYTIME: VG36DLYTIME,
            VG36ACTTIME: VG36ACTTIME,
            VG37DLYTIME: VG37DLYTIME,
            VG37ACTTIME: VG37ACTTIME,
            VG38DLYTIME: VG38DLYTIME,
            VG38ACTTIME: VG38ACTTIME,
            VG39DLYTIME: VG39DLYTIME,
            VG39ACTTIME: VG39ACTTIME,
            VG40DLYTIME: VG40DLYTIME,
            VG40ACTTIME: VG40ACTTIME,
            refrLadoFixo1: refrLadoFixo1,
            fixoRefrig1: fixoRefrig1,
            refrLadoFixo2: refrLadoFixo2,
            fixoRefrig2: fixoRefrig2,
            refrLadoFixo3: refrLadoFixo3,
            fixoRefrig3: fixoRefrig3,
            refrLadoFixo4: refrLadoFixo4,
            fixoRefrig4: fixoRefrig4,
            refrLadoMovel1: refrLadoMovel1,
            movelRefrig1: movelRefrig1,
            refrLadoMovel2: refrLadoMovel2,
            movelRefrig2: movelRefrig2,
            refrLadoMovel3: refrLadoMovel3,
            movelRefrig3: movelRefrig3,
            refrLadoMovel4: refrLadoMovel4,
            movelRefrig4: movelRefrig4,
            vaporLadoFixo1: vaporLadoFixo1,
            vaporLadoMovel1: vaporLadoMovel1,
            vaporLadoFixo2: vaporLadoFixo2,
            vaporLadoMovel2: vaporLadoMovel2,
            vaporLadoFixo3: vaporLadoFixo3,
            vaporLadoMovel3: vaporLadoMovel3,
            vaporLadoFixo4: vaporLadoFixo4,
            vaporLadoMovel4: vaporLadoMovel4,
            vaporLadoFixo5: vaporLadoFixo5,
            vaporLadoMovel5: vaporLadoMovel5,
            fixoSteam: fixoSteam,
            movelSteam: movelSteam,
         }).then(() => {

            RevisaoFichaTecnicaPastoreInjetores.create({
               idFichaTecnica: data.id,
               maq: maquina,
               NúmeroMolde: NúmeroMolde,
               NúmeroMáquina: NúmeroMáquina,
               Revisao: Revisao,
               Cliente: Cliente,
               CodigoPAM: CodigoPAM,
               Tecnico: Tecnico,
               Produto: Produto,
               Material: Material,
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

   Moldes.findOne({
      where: {
         descricao: NúmeroMolde
      }
   }).then(output => {
      if (output === null || output === 'null') {

         Moldes.create({
            descricao:NúmeroMolde,
            codigo:NúmeroMolde,
         }).then(() => {
            console.log('MOLDE ADICIONADO')
         })

      } else {
         console.log('MOLDE JÁ EXISTE. NÃO ADICIONADO')
      }
   })

   MateriasPrimas.findOne({
      where: {
         descricao: Material
      }
   }).then(output => {
      if (output === null || output === 'null') {

         MateriasPrimas.create({
            descricao:Material,
            codigo:Material,
      
         }).then(() => {
            console.log('MATERIA PRIMA ADICIONADA.')
         })

      } else {
         console.log('MATERIA PRIMA JÁ EXISTE. NÃO ADICIONADA')
      }
   })

   
})

// *ATUALIZANDO FICHA PASTORE
router.post("/fichas/updateHaitian",(req,res) => {
   var id = req.body.id;
   var maquina = req.body.maquina;

   var NúmeroMolde = req.body.molde.replace(/\s/g, "");
   var NúmeroMáquina = req.body.numMaquina;
   var Revisao = req.body.revisao;
   var Cliente = req.body.cliente;
   var CodigoPAM = req.body.codigoPAM.replace(/\s/g, "");
   var Tecnico = req.body.tecnico;
   var Produto = req.body.produto;
   var Material = req.body.material.replace(/\./g, "");

   var cilindro1 = req.body.cilindro1 !== "" ? req.body.cilindro1.replace(",", ".") : 0.0;
   var cilindro2 = req.body.cilindro2 !== "" ? req.body.cilindro2.replace(",", ".") : 0.0;
   var cilindro3 = req.body.cilindro3 !== "" ? req.body.cilindro3.replace(",", ".") : 0.0;
   var cilindro4 = req.body.cilindro4 !== "" ? req.body.cilindro4.replace(",", ".") : 0.0;
   var cilindro5 = req.body.cilindro5 !== "" ? req.body.cilindro5.replace(",", ".") : 0.0;
   var cilindro6 = req.body.cilindro6 !== "" ? req.body.cilindro6.replace(",", ".") : 0.0;
   var cilindro7 = req.body.cilindro7 !== "" ? req.body.cilindro7.replace(",", ".") : 0.0;
   var posComut = req.body.posComutacao !== "" ? req.body.posComutacao.replace(",", ".") : 0.0;
   var posInjecao1 = req.body.posInj5 !== "" ? req.body.posInj5.replace(",", ".") : 0.0;
   var posInjecao2 = req.body.posInj4 !== "" ? req.body.posInj4.replace(",", ".") : 0.0;
   var posInjecao3 = req.body.posInj3 !== "" ? req.body.posInj3.replace(",", ".") : 0.0;
   var posInjecao4 = req.body.posInj2 !== "" ? req.body.posInj2.replace(",", ".") : 0.0;
   var posInjecao5 = req.body.posInj1 !== "" ? req.body.posInj1.replace(",", ".") : 0.0;
   var presComut = req.body.presComutacao !== "" ? req.body.presComutacao.replace(",", ".") : 0.0;
   var presInjecao1 = req.body.presInj5 !== "" ? req.body.presInj5.replace(",", ".") : 0.0;
   var presInjecao2 = req.body.presInj4 !== "" ? req.body.presInj4.replace(",", ".") : 0.0;
   var presInjecao3 = req.body.presInj3 !== "" ? req.body.presInj3.replace(",", ".") : 0.0;
   var presInjecao4 = req.body.presInj2 !== "" ? req.body.presInj2.replace(",", ".") : 0.0;
   var presInjecao5 = req.body.presInj1 !== "" ? req.body.presInj1.replace(",", ".") : 0.0;
   var fluxoInjecao1 = req.body.fluxoInj5 !== "" ? req.body.fluxoInj5.replace(",", ".") : 0.0;
   var fluxoInjecao2 = req.body.fluxoInj4 !== "" ? req.body.fluxoInj4.replace(",", ".") : 0.0;
   var fluxoInjecao3 = req.body.fluxoInj3 !== "" ? req.body.fluxoInj3.replace(",", ".") : 0.0;
   var fluxoInjecao4 = req.body.fluxoInj2 !== "" ? req.body.fluxoInj2.replace(",", ".") : 0.0;
   var fluxoInjecao5 = req.body.fluxoInj1 !== "" ? req.body.fluxoInj1.replace(",", ".") : 0.0;
   var tempoDisparo = req.body.tempoDisparo !== "" ? req.body.tempoDisparo.replace(",", ".") : 0.0;
   var pressaoInj = req.body.pressaoInj !== "" ? req.body.pressaoInj.replace(",", ".") : 0.0;
   var presRecalque1 = req.body.presRecalque5 !== "" ? req.body.presRecalque5.replace(",", ".") : 0.0;
   var presRecalque2 = req.body.presRecalque4 !== "" ? req.body.presRecalque4.replace(",", ".") : 0.0;
   var presRecalque3 = req.body.presRecalque3 !== "" ? req.body.presRecalque3.replace(",", ".") : 0.0;
   var presRecalque4 = req.body.presRecalque2 !== "" ? req.body.presRecalque2.replace(",", ".") : 0.0;
   var presRecalque5 = req.body.presRecalque1 !== "" ? req.body.presRecalque1.replace(",", ".") : 0.0;
   var fluxoRecalque1 = req.body.fluxoRecalque5 !== "" ? req.body.fluxoRecalque5.replace(",", ".") : 0.0;
   var fluxoRecalque2 = req.body.fluxoRecalque4 !== "" ? req.body.fluxoRecalque4.replace(",", ".") : 0.0;
   var fluxoRecalque3 = req.body.fluxoRecalque3 !== "" ? req.body.fluxoRecalque3.replace(",", ".") : 0.0;
   var fluxoRecalque4 = req.body.fluxoRecalque2 !== "" ? req.body.fluxoRecalque2.replace(",", ".") : 0.0;
   var fluxoRecalque5 = req.body.fluxoRecalque1 !== "" ? req.body.fluxoRecalque1.replace(",", ".") : 0.0;
   var tempoRecalque1 = req.body.tempoRecalque5 !== "" ? req.body.tempoRecalque5.replace(",", ".") : 0.0;
   var tempoRecalque2 = req.body.tempoRecalque4 !== "" ? req.body.tempoRecalque4.replace(",", ".") : 0.0;
   var tempoRecalque3 = req.body.tempoRecalque3 !== "" ? req.body.tempoRecalque3.replace(",", ".") : 0.0;
   var tempoRecalque4 = req.body.tempoRecalque2 !== "" ? req.body.tempoRecalque2.replace(",", ".") : 0.0;
   var tempoRecalque5 = req.body.tempoRecalque1 !== "" ? req.body.tempoRecalque1.replace(",", ".") : 0.0;
   var partDosagem1 = req.body.partDosagem5 !== "" ? req.body.partDosagem5.replace(",", ".") : 0.0;
   var partDosagem2 = req.body.partDosagem4 !== "" ? req.body.partDosagem4.replace(",", ".") : 0.0;
   var partDosagem3 = req.body.partDosagem3 !== "" ? req.body.partDosagem3.replace(",", ".") : 0.0;
   var partDosagem4 = req.body.partDosagem2 !== "" ? req.body.partDosagem2.replace(",", ".") : 0.0;
   var partDosagem5 = req.body.partDosagem1 !== "" ? req.body.partDosagem1.replace(",", ".") : 0.0;
   var presDosagem1 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var presDosagem2 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var presDosagem3 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var presDosagem4 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var presDosagem5 = req.body.presDosagem1 !== "" ? req.body.presDosagem1.replace(",", ".") : 0.0;
   var fluxoDosagem1 = req.body.fluxoDosagem5 !== "" ? req.body.fluxoDosagem5.replace(",", ".") : 0.0;
   var fluxoDosagem2 = req.body.fluxoDosagem4 !== "" ? req.body.fluxoDosagem4.replace(",", ".") : 0.0;
   var fluxoDosagem3 = req.body.fluxoDosagem3 !== "" ? req.body.fluxoDosagem3.replace(",", ".") : 0.0;
   var fluxoDosagem4 = req.body.fluxoDosagem2 !== "" ? req.body.fluxoDosagem2.replace(",", ".") : 0.0;
   var fluxoDosagem5 = req.body.fluxoDosagem1 !== "" ? req.body.fluxoDosagem1.replace(",", ".") : 0.0;
   var CPDosagem1 = req.body.CPDosagem5 !== "" ? req.body.CPDosagem5.replace(",", ".") : 0.0;
   var CPDosagem2 = req.body.CPDosagem4 !== "" ? req.body.CPDosagem4.replace(",", ".") : 0.0;
   var CPDosagem3 = req.body.CPDosagem3 !== "" ? req.body.CPDosagem3.replace(",", ".") : 0.0;
   var CPDosagem4 = req.body.CPDosagem2 !== "" ? req.body.CPDosagem2.replace(",", ".") : 0.0;
   var CPDosagem5 = req.body.CPDosagem1 !== "" ? req.body.CPDosagem1.replace(",", ".") : 0.0;
   var tempoDosagem = req.body.tempoDosagem !== "" ? req.body.tempoDosagem.replace(",", ".") : 0.0;
   var antesPos = req.body.antes1 !== "" ? req.body.antes1.replace(",", ".") : 0.0;
   var antesPres = req.body.antes2 !== "" ? req.body.antes2.replace(",", ".") : 0.0;
   var antesFluxo = req.body.antes3 !== "" ? req.body.antes3.replace(",", ".") : 0.0;
   var antesTempo = req.body.antes4 !== "" ? req.body.antes4.replace(",", ".") : 0.0;
   var depoisPos = req.body.depois1 !== "" ? req.body.depois1.replace(",", ".") : 0.0;
   var depoisPres = req.body.depois2 !== "" ? req.body.depois2.replace(",", ".") : 0.0;
   var depoisFluxo = req.body.depois3 !== "" ? req.body.depois3.replace(",", ".") : 0.0;
   var depoisTempo = req.body.depois4 !== "" ? req.body.depois4.replace(",", ".") : 0.0;
   var posFecha1 = req.body.posFech1 !== "" ? req.body.posFech1.replace(",", ".") : 0.0;
   var posFecha2 = req.body.posFech2 !== "" ? req.body.posFech2.replace(",", ".") : 0.0;
   var posFecha3 = req.body.posFech3 !== "" ? req.body.posFech3.replace(",", ".") : 0.0;
   var protMPos = req.body.protMPos !== "" ? req.body.protMPos.replace(",", ".") : 0.0;
   var AltaPresPos = req.body.AltaPresPos !== "" ? req.body.AltaPresPos.replace(",", ".") : 0.0;
   var presFecha1 = req.body.presFech1 !== "" ? req.body.presFech1.replace(",", ".") : 0.0;
   var presFecha2 = req.body.presFech2 !== "" ? req.body.presFech2.replace(",", ".") : 0.0;
   var presFecha3 = req.body.presFech3 !== "" ? req.body.presFech3.replace(",", ".") : 0.0;
   var protMPres = req.body.protMPres !== "" ? req.body.protMPres.replace(",", ".") : 0.0;
   var AltaPresPres = req.body.AltaPresPressao !== "" ? req.body.AltaPresPressao.replace(",", ".") : 0.0;
   var fluxoFecha1 = req.body.fluxoFech1 !== "" ? req.body.fluxoFech1.replace(",", ".") : 0.0;
   var fluxoFecha2 = req.body.fluxoFech2 !== "" ? req.body.fluxoFech2.replace(",", ".") : 0.0;
   var fluxoFecha3 = req.body.fluxoFech3 !== "" ? req.body.fluxoFech3.replace(",", ".") : 0.0;
   var protMFluxo = req.body.protMFluxo !== "" ? req.body.protMFluxo.replace(",", ".") : 0.0;
   var AltaPresFluxo = req.body.AltaPresFluxo !== "" ? req.body.AltaPresFluxo.replace(",", ".") : 0.0;
   var tempoProtMolde = req.body.tempoProtMolde !== "" ? req.body.tempoProtMolde.replace(",", ".") : 0.0;
   var tempoFecha = req.body.tempoFecha !== "" ? req.body.tempoFecha.replace(",", ".") : 0.0;
   var posAbertura1 = req.body.posAbertura5 !== "" ? req.body.posAbertura5.replace(",", ".") : 0.0;
   var posAbertura2 = req.body.posAbertura4 !== "" ? req.body.posAbertura4.replace(",", ".") : 0.0;
   var posAbertura3 = req.body.posAbertura3 !== "" ? req.body.posAbertura3.replace(",", ".") : 0.0;
   var posAbertura4 = req.body.posAbertura2 !== "" ? req.body.posAbertura2.replace(",", ".") : 0.0;
   var posAbertura5 = req.body.posAbertura1 !== "" ? req.body.posAbertura1.replace(",", ".") : 0.0;
   var presAbertura1 = req.body.presAbertura5 !== "" ? req.body.presAbertura5.replace(",", ".") : 0.0;
   var presAbertura2 = req.body.presAbertura4 !== "" ? req.body.presAbertura4.replace(",", ".") : 0.0;
   var presAbertura3 = req.body.presAbertura3 !== "" ? req.body.presAbertura3.replace(",", ".") : 0.0;
   var presAbertura4 = req.body.presAbertura2 !== "" ? req.body.presAbertura2.replace(",", ".") : 0.0;
   var presAbertura5 = req.body.presAbertura1 !== "" ? req.body.presAbertura1.replace(",", ".") : 0.0;
   var fluxoAbertura1 = req.body.fluxoAbertura5 !== "" ? req.body.fluxoAbertura5.replace(",", ".") : 0.0;
   var fluxoAbertura2 = req.body.fluxoAbertura4 !== "" ? req.body.fluxoAbertura4.replace(",", ".") : 0.0;
   var fluxoAbertura3 = req.body.fluxoAbertura3 !== "" ? req.body.fluxoAbertura3.replace(",", ".") : 0.0;
   var fluxoAbertura4 = req.body.fluxoAbertura2 !== "" ? req.body.fluxoAbertura2.replace(",", ".") : 0.0;
   var fluxoAbertura5 = req.body.fluxoAbertura1 !== "" ? req.body.fluxoAbertura1.replace(",", ".") : 0.0;
   var resfriamento = req.body.resfriamento !== "" ? req.body.resfriamento.replace(",", ".") : 0.0;
   var tempoAbertura = req.body.tempoAbertura !== "" ? req.body.tempoAbertura.replace(",", ".") : 0.0;
   var posAvanco1 = req.body.posAvanco1 !== "" ? req.body.posAvanco1.replace(",", ".") : 0.0;
   var posAvanco2 = req.body.posAvanco2 !== "" ? req.body.posAvanco2.replace(",", ".") : 0.0;
   var posAvanco3 = req.body.posAvanco3 !== "" ? req.body.posAvanco3.replace(",", ".") : 0.0;
   var posRecuo1 = req.body.posRecuo1 !== "" ? req.body.posRecuo1.replace(",", ".") : 0.0;
   var posRecuo2 = req.body.posRecuo2 !== "" ? req.body.posRecuo2.replace(",", ".") : 0.0;
   var posRecuo3 = req.body.posRecuo3 !== "" ? req.body.posRecuo3.replace(",", ".") : 0.0;
   var presAvanco1 = req.body.presAvanco1 !== "" ? req.body.presAvanco1.replace(",", ".") : 0.0;
   var presAvanco2 = req.body.presAvanco2 !== "" ? req.body.presAvanco2.replace(",", ".") : 0.0;
   var presAvanco3 = req.body.presAvanco3 !== "" ? req.body.presAvanco3.replace(",", ".") : 0.0;
   var presRecuo1 = req.body.presRecuo1 !== "" ? req.body.presRecuo1.replace(",", ".") : 0.0;
   var presRecuo2 = req.body.presRecuo2 !== "" ? req.body.presRecuo2.replace(",", ".") : 0.0;
   var presRecuo3 = req.body.presRecuo3 !== "" ? req.body.presRecuo3.replace(",", ".") : 0.0;
   var fluxoAvanco1 = req.body.fluxoAvanco1 !== "" ? req.body.fluxoAvanco1.replace(",", ".") : 0.0;
   var fluxoAvanco2 = req.body.fluxoAvanco2 !== "" ? req.body.fluxoAvanco2.replace(",", ".") : 0.0;
   var fluxoAvanco3 = req.body.fluxoAvanco3 !== "" ? req.body.fluxoAvanco3.replace(",", ".") : 0.0;
   var fluxoRecuo1 = req.body.fluxoRecuo1 !== "" ? req.body.fluxoRecuo1.replace(",", ".") : 0.0;
   var fluxoRecuo2 = req.body.fluxoRecuo2 !== "" ? req.body.fluxoRecuo2.replace(",", ".") : 0.0;
   var fluxoRecuo3 = req.body.fluxoRecuo3 !== "" ? req.body.fluxoRecuo3.replace(",", ".") : 0.0;
   var atraso = req.body.atraso !== "" ? req.body.atraso.replace(",", ".") : 0.0;
   var batida = req.body.batida !== "" ? req.body.batida.replace(",", ".") : 0.0;
   var radialTypeEntrada1 = req.body.type1 !== "" ? req.body.type1.replace(",", ".") : 0.0;
   var radialTypeSaida1 = req.body.type2 !== "" ? req.body.type2.replace(",", ".") : 0.0;
   var radialTypeEntrada2 = req.body.type3 !== "" ? req.body.type3.replace(",", ".") : 0.0;
   var radialTypeSaida2 = req.body.type4 !== "" ? req.body.type4.replace(",", ".") : 0.0;
   var radialPresEntrada1 = req.body.pressaoRadial1 !== "" ? req.body.pressaoRadial1.replace(",", ".") : 0.0;
   var radialPresSaida1 = req.body.pressaoRadial2 !== "" ? req.body.pressaoRadial2.replace(",", ".") : 0.0;
   var radialPresEntrada2 = req.body.pressaoRadial3 !== "" ? req.body.pressaoRadial3.replace(",", ".") : 0.0;
   var radialPresSaida2 = req.body.pressaoRadial4 !== "" ? req.body.pressaoRadial4.replace(",", ".") : 0.0;
   var radialPresEntrada3 = req.body.pressaoRadial5 !== "" ? req.body.pressaoRadial5.replace(",", ".") : 0.0;
   var radialPresSaida3 = req.body.pressaoRadial6 !== "" ? req.body.pressaoRadial6.replace(",", ".") : 0.0;
   var radialFluxoEntrada1 = req.body.fluxoRadial1 !== "" ? req.body.fluxoRadial1.replace(",", ".") : 0.0;
   var radialFluxoSaida1 = req.body.fluxoRadial2 !== "" ? req.body.fluxoRadial2.replace(",", ".") : 0.0;
   var radialFluxoEntrada2 = req.body.fluxoRadial3 !== "" ? req.body.fluxoRadial3.replace(",", ".") : 0.0;
   var radialFluxoSaida2 = req.body.fluxoRadial4 !== "" ? req.body.fluxoRadial4.replace(",", ".") : 0.0;
   var radialFluxoEntrada3 = req.body.fluxoRadial5 !== "" ? req.body.fluxoRadial5.replace(",", ".") : 0.0;
   var radialFluxoSaida3 = req.body.fluxoRadial6 !== "" ? req.body.fluxoRadial6.replace(",", ".") : 0.0;
   var radialPosEntrada1 = req.body.posRadial1 !== "" ? req.body.posRadial1.replace(",", ".") : 0.0;
   var radialPosSaida1 = req.body.posRadial2 !== "" ? req.body.posRadial2.replace(",", ".") : 0.0;
   var radialPosEntrada2 = req.body.posRadial3 !== "" ? req.body.posRadial3.replace(",", ".") : 0.0;
   var radialPosSaida2 = req.body.posRadial4 !== "" ? req.body.posRadial4.replace(",", ".") : 0.0;
   var radialPosEntrada3 = req.body.posRadial5 !== "" ? req.body.posRadial5.replace(",", ".") : 0.0;
   var radialPosSaida3 = req.body.posRadial6 !== "" ? req.body.posRadial6.replace(",", ".") : 0.0;
   var radialTempoEntrada1 = req.body.tempoRadial1 !== "" ? req.body.tempoRadial1.replace(",", ".") : 0.0;
   var radialTempoSaida1 = req.body.tempoRadial2 !== "" ? req.body.tempoRadial2.replace(",", ".") : 0.0;
   var radialTempoEntrada2 = req.body.tempoRadial3 !== "" ? req.body.tempoRadial3.replace(",", ".") : 0.0;
   var radialTempoSaida2 = req.body.tempoRadial4 !== "" ? req.body.tempoRadial4.replace(",", ".") : 0.0;
   var radialTempoEntrada3 = req.body.tempoRadial5 !== "" ? req.body.tempoRadial5.replace(",", ".") : 0.0;
   var radialTempoSaida3 = req.body.tempoRadial6 !== "" ? req.body.tempoRadial6.replace(",", ".") : 0.0;
   var radialSCREntrada1 = req.body.scrcount1 !== "" ? req.body.scrcount1.replace(",", ".") : 0.0;
   var radialSCRSaida1 = req.body.scrcount2 !== "" ? req.body.scrcount2.replace(",", ".") : 0.0;
   var radialSCREntrada2 = req.body.scrcount3 !== "" ? req.body.scrcount3.replace(",", ".") : 0.0;
   var radialSCRSaida2 = req.body.scrcount4 !== "" ? req.body.scrcount4.replace(",", ".") : 0.0;
   var radialSCREntrada3 = req.body.scrcount5 !== "" ? req.body.scrcount5.replace(",", ".") : 0.0;
   var radialSCRSaida3 = req.body.scrcount6 !== "" ? req.body.scrcount6.replace(",", ".") : 0.0;

   var termopar = req.body.termopar;
   var voltagem = req.body.voltagem;
   var camara1 = req.body.camara1 !== "" ? req.body.camara1.replace(",", ".") : 0.0;
   var camara2 = req.body.camara2 !== "" ? req.body.camara2.replace(",", ".") : 0.0;
   var camara3 = req.body.camara3 !== "" ? req.body.camara3.replace(",", ".") : 0.0;
   var camara4 = req.body.camara4 !== "" ? req.body.camara4.replace(",", ".") : 0.0;
   var camara5 = req.body.camara5 !== "" ? req.body.camara5.replace(",", ".") : 0.0;
   var camara6 = req.body.camara6 !== "" ? req.body.camara6.replace(",", ".") : 0.0;
   var camara7 = req.body.camara7 !== "" ? req.body.camara7.replace(",", ".") : 0.0;
   var camara8 = req.body.camara8 !== "" ? req.body.camara8.replace(",", ".") : 0.0;
   var camara9 = req.body.camara9 !== "" ? req.body.camara9.replace(",", ".") : 0.0;
   var camara10 = req.body.camara10 !== "" ? req.body.camara10.replace(",", ".") : 0.0;
   var camara11 = req.body.camara11 !== "" ? req.body.camara11.replace(",", ".") : 0.0;
   var camara12 = req.body.camara12 !== "" ? req.body.camara12.replace(",", ".") : 0.0;
   var camara13 = req.body.camara13 !== "" ? req.body.camara13.replace(",", ".") : 0.0;
   var camara14 = req.body.camara14 !== "" ? req.body.camara14.replace(",", ".") : 0.0;
   var camara15 = req.body.camara15 !== "" ? req.body.camara15.replace(",", ".") : 0.0;
   var camara16 = req.body.camara16 !== "" ? req.body.camara16.replace(",", ".") : 0.0;
   var camara17 = req.body.camara17 !== "" ? req.body.camara17.replace(",", ".") : 0.0;
   var camara18 = req.body.camara18 !== "" ? req.body.camara18.replace(",", ".") : 0.0;
   var camara19 = req.body.camara19 !== "" ? req.body.camara19.replace(",", ".") : 0.0;
   var camara20 = req.body.camara20 !== "" ? req.body.camara20.replace(",", ".") : 0.0;
   var camara21 = req.body.camara21 !== "" ? req.body.camara21.replace(",", ".") : 0.0;
   var camara22 = req.body.camara22 !== "" ? req.body.camara22.replace(",", ".") : 0.0;
   var camara23 = req.body.camara23 !== "" ? req.body.camara23.replace(",", ".") : 0.0;
   var camara24 = req.body.camara24 !== "" ? req.body.camara24.replace(",", ".") : 0.0;
   var camara25 = req.body.camara25 !== "" ? req.body.camara25.replace(",", ".") : 0.0;
   var camara26 = req.body.camara26 !== "" ? req.body.camara26.replace(",", ".") : 0.0;
   var camara27 = req.body.camara27 !== "" ? req.body.camara27.replace(",", ".") : 0.0;
   var camara28 = req.body.camara28 !== "" ? req.body.camara28.replace(",", ".") : 0.0;
   var camara29 = req.body.camara29 !== "" ? req.body.camara29.replace(",", ".") : 0.0;
   var camara30 = req.body.camara30 !== "" ? req.body.camara30.replace(",", ".") : 0.0;
   var camara31 = req.body.camara31 !== "" ? req.body.camara31.replace(",", ".") : 0.0;
   var camara32 = req.body.camara32 !== "" ? req.body.camara32.replace(",", ".") : 0.0;
   var camara33 = req.body.camara33 !== "" ? req.body.camara33.replace(",", ".") : 0.0;
   var camara34 = req.body.camara34 !== "" ? req.body.camara34.replace(",", ".") : 0.0;
   var camara35 = req.body.camara35 !== "" ? req.body.camara35.replace(",", ".") : 0.0;
   var camara36 = req.body.camara36 !== "" ? req.body.camara36.replace(",", ".") : 0.0;
   var camara37 = req.body.camara37 !== "" ? req.body.camara37.replace(",", ".") : 0.0;
   var camara38 = req.body.camara38 !== "" ? req.body.camara38.replace(",", ".") : 0.0;
   var camara39 = req.body.camara39 !== "" ? req.body.camara39.replace(",", ".") : 0.0;
   var camara40 = req.body.camara40 !== "" ? req.body.camara40.replace(",", ".") : 0.0;
   var camara41 = req.body.camara41 !== "" ? req.body.camara41.replace(",", ".") : 0.0;
   var camara42 = req.body.camara42 !== "" ? req.body.camara42.replace(",", ".") : 0.0;
   var camara43 = req.body.camara43 !== "" ? req.body.camara43.replace(",", ".") : 0.0;
   var camara44 = req.body.camara44 !== "" ? req.body.camara44.replace(",", ".") : 0.0;
   var camara45 = req.body.camara45 !== "" ? req.body.camara45.replace(",", ".") : 0.0;
   var camara46 = req.body.camara46 !== "" ? req.body.camara46.replace(",", ".") : 0.0;
   var camara47 = req.body.camara47 !== "" ? req.body.camara47.replace(",", ".") : 0.0;
   var camara48 = req.body.camara48 !== "" ? req.body.camara48.replace(",", ".") : 0.0;
   var camara49 = req.body.camara49 !== "" ? req.body.camara49.replace(",", ".") : 0.0;
   var camara50 = req.body.camara50 !== "" ? req.body.camara50.replace(",", ".") : 0.0;
   var camara51 = req.body.camara51 !== "" ? req.body.camara51.replace(",", ".") : 0.0;
   var camara52 = req.body.camara52 !== "" ? req.body.camara52.replace(",", ".") : 0.0;
   var camara53 = req.body.camara53 !== "" ? req.body.camara53.replace(",", ".") : 0.0;
   var camara54 = req.body.camara54 !== "" ? req.body.camara54.replace(",", ".") : 0.0;
   var camara55 = req.body.camara55 !== "" ? req.body.camara55.replace(",", ".") : 0.0;
   var camara56 = req.body.camara56 !== "" ? req.body.camara56.replace(",", ".") : 0.0;
   var camara57 = req.body.camara57 !== "" ? req.body.camara57.replace(",", ".") : 0.0;
   var camara58 = req.body.camara58 !== "" ? req.body.camara58.replace(",", ".") : 0.0;
   var camara59 = req.body.camara59 !== "" ? req.body.camara59.replace(",", ".") : 0.0;
   var camara60 = req.body.camara60 !== "" ? req.body.camara60.replace(",", ".") : 0.0;
   var camara61 = req.body.camara61 !== "" ? req.body.camara61.replace(",", ".") : 0.0;
   var camara62 = req.body.camara62 !== "" ? req.body.camara62.replace(",", ".") : 0.0;
   var camara63 = req.body.camara63 !== "" ? req.body.camara63.replace(",", ".") : 0.0;
   var camara64 = req.body.camara64 !== "" ? req.body.camara64.replace(",", ".") : 0.0;
   var camara65 = req.body.camara65 !== "" ? req.body.camara65.replace(",", ".") : 0.0;
   var camara66 = req.body.camara66 !== "" ? req.body.camara66.replace(",", ".") : 0.0;
   var camara67 = req.body.camara67 !== "" ? req.body.camara67.replace(",", ".") : 0.0;
   var camara68 = req.body.camara68 !== "" ? req.body.camara68.replace(",", ".") : 0.0;
   var camara69 = req.body.camara69 !== "" ? req.body.camara69.replace(",", ".") : 0.0;
   var camara70 = req.body.camara70 !== "" ? req.body.camara70.replace(",", ".") : 0.0;
   var camara71 = req.body.camara71 !== "" ? req.body.camara71.replace(",", ".") : 0.0;
   var camara72 = req.body.camara72 !== "" ? req.body.camara72.replace(",", ".") : 0.0;
   var camara73 = req.body.camara73 !== "" ? req.body.camara73.replace(",", ".") : 0.0;
   var camara74 = req.body.camara74 !== "" ? req.body.camara74.replace(",", ".") : 0.0;
   var camara75 = req.body.camara75 !== "" ? req.body.camara75.replace(",", ".") : 0.0;
   var camara76 = req.body.camara76 !== "" ? req.body.camara76.replace(",", ".") : 0.0;
   var camara77 = req.body.camara77 !== "" ? req.body.camara77.replace(",", ".") : 0.0;
   var camara78 = req.body.camara78 !== "" ? req.body.camara78.replace(",", ".") : 0.0;
   var camara79 = req.body.camara79 !== "" ? req.body.camara79.replace(",", ".") : 0.0;
   var camara80 = req.body.camara80 !== "" ? req.body.camara80.replace(",", ".") : 0.0;
   var camara81 = req.body.camara81 !== "" ? req.body.camara81.replace(",", ".") : 0.0;
   var camara82 = req.body.camara82 !== "" ? req.body.camara82.replace(",", ".") : 0.0;
   var camara83 = req.body.camara83 !== "" ? req.body.camara83.replace(",", ".") : 0.0;
   var camara84 = req.body.camara84 !== "" ? req.body.camara84.replace(",", ".") : 0.0;
   var camara85 = req.body.camara85 !== "" ? req.body.camara85.replace(",", ".") : 0.0;
   var camara86 = req.body.camara86 !== "" ? req.body.camara86.replace(",", ".") : 0.0;
   var camara87 = req.body.camara87 !== "" ? req.body.camara87.replace(",", ".") : 0.0;
   var camara88 = req.body.camara88 !== "" ? req.body.camara88.replace(",", ".") : 0.0;
   var camara89 = req.body.camara89 !== "" ? req.body.camara89.replace(",", ".") : 0.0;
   var camara90 = req.body.camara90 !== "" ? req.body.camara90.replace(",", ".") : 0.0;
   var camara91 = req.body.camara91 !== "" ? req.body.camara91.replace(",", ".") : 0.0;
   var camara92 = req.body.camara92 !== "" ? req.body.camara92.replace(",", ".") : 0.0;
   var camara93 = req.body.camara93 !== "" ? req.body.camara93.replace(",", ".") : 0.0;
   var camara94 = req.body.camara94 !== "" ? req.body.camara94.replace(",", ".") : 0.0;
   var camara95 = req.body.camara95 !== "" ? req.body.camara95.replace(",", ".") : 0.0;
   var camara96 = req.body.camara96 !== "" ? req.body.camara96.replace(",", ".") : 0.0;
   var camara97 = req.body.camara97 !== "" ? req.body.camara97.replace(",", ".") : 0.0;
   var camara98 = req.body.camara98 !== "" ? req.body.camara98.replace(",", ".") : 0.0;
   var camara99 = req.body.camara99 !== "" ? req.body.camara99.replace(",", ".") : 0.0;
   var camara100 = req.body.camara100 !== "" ? req.body.camara100.replace(",", ".") : 0.0;
   var camara101 = req.body.camara101 !== "" ? req.body.camara101.replace(",", ".") : 0.0;
   var camara102 = req.body.camara102 !== "" ? req.body.camara102.replace(",", ".") : 0.0;
   var camara103 = req.body.camara103 !== "" ? req.body.camara103.replace(",", ".") : 0.0;
   var camara104 = req.body.camara104 !== "" ? req.body.camara104.replace(",", ".") : 0.0;
   var camara105 = req.body.camara105 !== "" ? req.body.camara105.replace(",", ".") : 0.0;
   var camara106 = req.body.camara106 !== "" ? req.body.camara106.replace(",", ".") : 0.0;
   var camara107 = req.body.camara107 !== "" ? req.body.camara107.replace(",", ".") : 0.0;
   var camara108 = req.body.camara108 !== "" ? req.body.camara108.replace(",", ".") : 0.0;
   var camara109 = req.body.camara109 !== "" ? req.body.camara109.replace(",", ".") : 0.0;
   var camara110 = req.body.camara110 !== "" ? req.body.camara110.replace(",", ".") : 0.0;
   var camara111 = req.body.camara111 !== "" ? req.body.camara111.replace(",", ".") : 0.0;
   var camara112 = req.body.camara112 !== "" ? req.body.camara112.replace(",", ".") : 0.0;
   var camara113 = req.body.camara113 !== "" ? req.body.camara113.replace(",", ".") : 0.0;
   var camara114 = req.body.camara114 !== "" ? req.body.camara114.replace(",", ".") : 0.0;
   var camara115 = req.body.camara115 !== "" ? req.body.camara115.replace(",", ".") : 0.0;
   var camara116 = req.body.camara116 !== "" ? req.body.camara116.replace(",", ".") : 0.0;
   var camara117 = req.body.camara117 !== "" ? req.body.camara117.replace(",", ".") : 0.0;
   var camara118 = req.body.camara118 !== "" ? req.body.camara118.replace(",", ".") : 0.0;
   var camara119 = req.body.camara119 !== "" ? req.body.camara119.replace(",", ".") : 0.0;
   var camara120 = req.body.camara120 !== "" ? req.body.camara120.replace(",", ".") : 0.0;
   var camara121 = req.body.camara121 !== "" ? req.body.camara121.replace(",", ".") : 0.0;
   var camara122 = req.body.camara122 !== "" ? req.body.camara122.replace(",", ".") : 0.0;
   var camara123 = req.body.camara123 !== "" ? req.body.camara123.replace(",", ".") : 0.0;
   var camara124 = req.body.camara124 !== "" ? req.body.camara124.replace(",", ".") : 0.0;
   var camara125 = req.body.camara125 !== "" ? req.body.camara125.replace(",", ".") : 0.0;
   var camara126 = req.body.camara126 !== "" ? req.body.camara126.replace(",", ".") : 0.0;
   var camara127 = req.body.camara127 !== "" ? req.body.camara127.replace(",", ".") : 0.0;
   var camara128 = req.body.camara128 !== "" ? req.body.camara128.replace(",", ".") : 0.0;
   var camara129 = req.body.camara129 !== "" ? req.body.camara129.replace(",", ".") : 0.0;
   var camara130 = req.body.camara130 !== "" ? req.body.camara130.replace(",", ".") : 0.0;
   var VG1DLYTIME = req.body.VG1[0] !== "" ? req.body.VG1[0].replace(",", ".") : 0.0;
   var VG1ACTTIME = req.body.VG1[1] !== "" ? req.body.VG1[1].replace(",", ".") : 0.0;
   var VG2DLYTIME = req.body.VG1[2] !== "" ? req.body.VG1[2].replace(",", ".") : 0.0;
   var VG2ACTTIME = req.body.VG1[3] !== "" ? req.body.VG1[3].replace(",", ".") : 0.0;
   var VG3DLYTIME = req.body.VG1[4] !== "" ? req.body.VG1[4].replace(",", ".") : 0.0;
   var VG3ACTTIME = req.body.VG1[5] !== "" ? req.body.VG1[5].replace(",", ".") : 0.0;
   var VG4DLYTIME = req.body.VG1[6] !== "" ? req.body.VG1[6].replace(",", ".") : 0.0;
   var VG4ACTTIME = req.body.VG1[7] !== "" ? req.body.VG1[7].replace(",", ".") : 0.0;
   var VG5DLYTIME = req.body.VG1[8] !== "" ? req.body.VG1[8].replace(",", ".") : 0.0;
   var VG5ACTTIME = req.body.VG1[9] !== "" ? req.body.VG1[9].replace(",", ".") : 0.0;
   var VG6DLYTIME = req.body.VG1[10] !== "" ? req.body.VG1[10].replace(",", ".") : 0.0;
   var VG6ACTTIME = req.body.VG1[11] !== "" ? req.body.VG1[11].replace(",", ".") : 0.0;
   var VG7DLYTIME = req.body.VG1[12] !== "" ? req.body.VG1[12].replace(",", ".") : 0.0;
   var VG7ACTTIME = req.body.VG1[13] !== "" ? req.body.VG1[13].replace(",", ".") : 0.0;
   var VG8DLYTIME = req.body.VG1[14] !== "" ? req.body.VG1[14].replace(",", ".") : 0.0;
   var VG8ACTTIME = req.body.VG1[15] !== "" ? req.body.VG1[15].replace(",", ".") : 0.0;
   var VG9DLYTIME = req.body.VG1[16] !== "" ? req.body.VG1[16].replace(",", ".") : 0.0;
   var VG9ACTTIME = req.body.VG1[17] !== "" ? req.body.VG1[17].replace(",", ".") : 0.0;
   var VG10DLYTIME = req.body.VG1[18] !== "" ? req.body.VG1[18].replace(",", ".") : 0.0;
   var VG10ACTTIME = req.body.VG1[19] !== "" ? req.body.VG1[19].replace(",", ".") : 0.0;
   var VG11DLYTIME = req.body.VG1[20] !== "" ? req.body.VG1[20].replace(",", ".") : 0.0;
   var VG11ACTTIME = req.body.VG1[21] !== "" ? req.body.VG1[21].replace(",", ".") : 0.0;
   var VG12DLYTIME = req.body.VG1[22] !== "" ? req.body.VG1[22].replace(",", ".") : 0.0;
   var VG12ACTTIME = req.body.VG1[23] !== "" ? req.body.VG1[23].replace(",", ".") : 0.0;
   var VG13DLYTIME = req.body.VG1[24] !== "" ? req.body.VG1[24].replace(",", ".") : 0.0;
   var VG13ACTTIME = req.body.VG1[25] !== "" ? req.body.VG1[25].replace(",", ".") : 0.0;
   var VG14DLYTIME = req.body.VG1[26] !== "" ? req.body.VG1[26].replace(",", ".") : 0.0;
   var VG14ACTTIME = req.body.VG1[27] !== "" ? req.body.VG1[27].replace(",", ".") : 0.0;
   var VG15DLYTIME = req.body.VG1[28] !== "" ? req.body.VG1[28].replace(",", ".") : 0.0;
   var VG15ACTTIME = req.body.VG1[29] !== "" ? req.body.VG1[29].replace(",", ".") : 0.0;
   var VG16DLYTIME = req.body.VG1[30] !== "" ? req.body.VG1[30].replace(",", ".") : 0.0;
   var VG16ACTTIME = req.body.VG1[31] !== "" ? req.body.VG1[31].replace(",", ".") : 0.0;
   var VG17DLYTIME = req.body.VG1[32] !== "" ? req.body.VG1[32].replace(",", ".") : 0.0;
   var VG17ACTTIME = req.body.VG1[33] !== "" ? req.body.VG1[33].replace(",", ".") : 0.0;
   var VG18DLYTIME = req.body.VG1[34] !== "" ? req.body.VG1[34].replace(",", ".") : 0.0;
   var VG18ACTTIME = req.body.VG1[35] !== "" ? req.body.VG1[35].replace(",", ".") : 0.0;
   var VG19DLYTIME = req.body.VG1[36] !== "" ? req.body.VG1[36].replace(",", ".") : 0.0;
   var VG19ACTTIME = req.body.VG1[37] !== "" ? req.body.VG1[37].replace(",", ".") : 0.0;
   var VG20DLYTIME = req.body.VG1[38] !== "" ? req.body.VG1[38].replace(",", ".") : 0.0;
   var VG20ACTTIME = req.body.VG1[39] !== "" ? req.body.VG1[39].replace(",", ".") : 0.0;
   var VG21DLYTIME = req.body.VG2[0] !== "" ? req.body.VG2[0].replace(",", ".") : 0.0;
   var VG21ACTTIME = req.body.VG2[1] !== "" ? req.body.VG2[1].replace(",", ".") : 0.0;
   var VG22DLYTIME = req.body.VG2[2] !== "" ? req.body.VG2[2].replace(",", ".") : 0.0;
   var VG22ACTTIME = req.body.VG2[3] !== "" ? req.body.VG2[3].replace(",", ".") : 0.0;
   var VG23DLYTIME = req.body.VG2[4] !== "" ? req.body.VG2[4].replace(",", ".") : 0.0;
   var VG23ACTTIME = req.body.VG2[5] !== "" ? req.body.VG2[5].replace(",", ".") : 0.0;
   var VG24DLYTIME = req.body.VG2[6] !== "" ? req.body.VG2[6].replace(",", ".") : 0.0;
   var VG24ACTTIME = req.body.VG2[7] !== "" ? req.body.VG2[7].replace(",", ".") : 0.0;
   var VG25DLYTIME = req.body.VG2[8] !== "" ? req.body.VG2[8].replace(",", ".") : 0.0;
   var VG25ACTTIME = req.body.VG2[9] !== "" ? req.body.VG2[9].replace(",", ".") : 0.0;
   var VG26DLYTIME = req.body.VG2[10] !== "" ? req.body.VG2[10].replace(",", ".") : 0.0;
   var VG26ACTTIME = req.body.VG2[11] !== "" ? req.body.VG2[11].replace(",", ".") : 0.0;
   var VG27DLYTIME = req.body.VG2[12] !== "" ? req.body.VG2[12].replace(",", ".") : 0.0;
   var VG27ACTTIME = req.body.VG2[13] !== "" ? req.body.VG2[13].replace(",", ".") : 0.0;
   var VG28DLYTIME = req.body.VG2[14] !== "" ? req.body.VG2[14].replace(",", ".") : 0.0;
   var VG28ACTTIME = req.body.VG2[15] !== "" ? req.body.VG2[15].replace(",", ".") : 0.0;
   var VG29DLYTIME = req.body.VG2[16] !== "" ? req.body.VG2[16].replace(",", ".") : 0.0;
   var VG29ACTTIME = req.body.VG2[17] !== "" ? req.body.VG2[17].replace(",", ".") : 0.0;
   var VG30DLYTIME = req.body.VG2[18] !== "" ? req.body.VG2[18].replace(",", ".") : 0.0;
   var VG30ACTTIME = req.body.VG2[19] !== "" ? req.body.VG2[19].replace(",", ".") : 0.0;
   var VG31DLYTIME = req.body.VG2[20] !== "" ? req.body.VG2[20].replace(",", ".") : 0.0;
   var VG31ACTTIME = req.body.VG2[21] !== "" ? req.body.VG2[21].replace(",", ".") : 0.0;
   var VG32DLYTIME = req.body.VG2[22] !== "" ? req.body.VG2[22].replace(",", ".") : 0.0;
   var VG32ACTTIME = req.body.VG2[23] !== "" ? req.body.VG2[23].replace(",", ".") : 0.0;
   var VG33DLYTIME = req.body.VG2[24] !== "" ? req.body.VG2[24].replace(",", ".") : 0.0;
   var VG33ACTTIME = req.body.VG2[25] !== "" ? req.body.VG2[25].replace(",", ".") : 0.0;
   var VG34DLYTIME = req.body.VG2[26] !== "" ? req.body.VG2[26].replace(",", ".") : 0.0;
   var VG34ACTTIME = req.body.VG2[27] !== "" ? req.body.VG2[27].replace(",", ".") : 0.0;
   var VG35DLYTIME = req.body.VG2[28] !== "" ? req.body.VG2[28].replace(",", ".") : 0.0;
   var VG35ACTTIME = req.body.VG2[29] !== "" ? req.body.VG2[29].replace(",", ".") : 0.0;
   var VG36DLYTIME = req.body.VG2[30] !== "" ? req.body.VG2[30].replace(",", ".") : 0.0;
   var VG36ACTTIME = req.body.VG2[31] !== "" ? req.body.VG2[31].replace(",", ".") : 0.0;
   var VG37DLYTIME = req.body.VG2[32] !== "" ? req.body.VG2[32].replace(",", ".") : 0.0;
   var VG37ACTTIME = req.body.VG2[33] !== "" ? req.body.VG2[33].replace(",", ".") : 0.0;
   var VG38DLYTIME = req.body.VG2[34] !== "" ? req.body.VG2[34].replace(",", ".") : 0.0;
   var VG38ACTTIME = req.body.VG2[35] !== "" ? req.body.VG2[35].replace(",", ".") : 0.0;
   var VG39DLYTIME = req.body.VG2[36] !== "" ? req.body.VG2[36].replace(",", ".") : 0.0;
   var VG39ACTTIME = req.body.VG2[37] !== "" ? req.body.VG2[37].replace(",", ".") : 0.0;
   var VG40DLYTIME = req.body.VG2[38] !== "" ? req.body.VG2[38].replace(",", ".") : 0.0;
   var VG40ACTTIME = req.body.VG2[39] !== "" ? req.body.VG2[39].replace(",", ".") : 0.0;

   var refrLadoFixo1 = req.body.rmladofixo1 !== "" ? req.body.rmladofixo1 : 0.0;
   var fixoRefrig1 = req.body.fixoRefrig1;
   var refrLadoFixo2 = req.body.rmladofixo2 !== "" ? req.body.rmladofixo2 : 0.0;
   var fixoRefrig2 = req.body.fixoRefrig2;
   var refrLadoFixo3 = req.body.rmladofixo3 !== "" ? req.body.rmladofixo3 : 0.0;
   var fixoRefrig3 = req.body.fixoRefrig3;
   var refrLadoFixo4 = req.body.rmladofixo4 !== "" ? req.body.rmladofixo4 : 0.0;
   var fixoRefrig4 = req.body.fixoRefrig4;
   
   var refrLadoMovel1 = req.body.rmladomovel1 !== "" ? req.body.rmladomovel1 : 0.0;
   var movelRefrig1 = req.body.movelRefrig1;
   var refrLadoMovel2 = req.body.rmladomovel2 !== "" ? req.body.rmladomovel2 : 0.0;
   var movelRefrig2 = req.body.movelRefrig2;
   var refrLadoMovel3 = req.body.rmladomovel3 !== "" ? req.body.rmladomovel3 : 0.0;
   var movelRefrig3 = req.body.movelRefrig3;
   var refrLadoMovel4 = req.body.rmladomovel4 !== "" ? req.body.rmladomovel4 : 0.0;
   var movelRefrig4 = req.body.movelRefrig4;

   var vaporLadoFixo1 = req.body.vaporladofixo1 !== "" ? req.body.vaporladofixo1 : 0.0;
   var vaporLadoMovel1 = req.body.vaporladomovel1 !== "" ? req.body.vaporladomovel1 : 0.0;
   var vaporLadoFixo2 = req.body.vaporladofixo2 !== "" ? req.body.vaporladofixo2 : 0.0;
   var vaporLadoMovel2 = req.body.vaporladomovel2 !== "" ? req.body.vaporladomovel2 : 0.0;
   var vaporLadoFixo3 = req.body.vaporladofixo3 !== "" ? req.body.vaporladofixo3 : 0.0;
   var vaporLadoMovel3 = req.body.vaporladomovel3 !== "" ? req.body.vaporladomovel3 : 0.0;
   var vaporLadoFixo4 = req.body.vaporladofixo4 !== "" ? req.body.vaporladofixo4 : 0.0;
   var vaporLadoMovel4 = req.body.vaporladomovel4 !== "" ? req.body.vaporladomovel4 : 0.0;
   var vaporLadoFixo5 = req.body.vaporladofixo5 !== "" ? req.body.vaporladofixo5 : 0.0;
   var vaporLadoMovel5 = req.body.vaporladomovel5 !== "" ? req.body.vaporladomovel5 : 0.0;
   var fixoSteam = req.body.fixoSteam;
   var movelSteam = req.body.movelSteam;
   
   FichaTecnicaPastoreInjetores.update({
      NúmeroMolde: NúmeroMolde,
      NúmeroMáquina: NúmeroMáquina,
      Revisao: Revisao,
      Cliente: Cliente,
      CodigoPAM: CodigoPAM,
      Tecnico: Tecnico,
      Produto: Produto,
      Material: Material,
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
         termopar: termopar,
         voltagem: voltagem,
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
         VG1DLYTIME: VG1DLYTIME,
         VG1ACTTIME: VG1ACTTIME,
         VG2DLYTIME: VG2DLYTIME,
         VG2ACTTIME: VG2ACTTIME,
         VG3DLYTIME: VG3DLYTIME,
         VG3ACTTIME: VG3ACTTIME,
         VG4DLYTIME: VG4DLYTIME,
         VG4ACTTIME: VG4ACTTIME,
         VG5DLYTIME: VG5DLYTIME,
         VG5ACTTIME: VG5ACTTIME,
         VG6DLYTIME: VG6DLYTIME,
         VG6ACTTIME: VG6ACTTIME,
         VG7DLYTIME: VG7DLYTIME,
         VG7ACTTIME: VG7ACTTIME,
         VG8DLYTIME: VG8DLYTIME,
         VG8ACTTIME: VG8ACTTIME,
         VG9DLYTIME: VG9DLYTIME,
         VG9ACTTIME: VG9ACTTIME,
         VG10DLYTIME: VG10DLYTIME,
         VG10ACTTIME: VG10ACTTIME,
         VG11DLYTIME: VG11DLYTIME,
         VG11ACTTIME: VG11ACTTIME,
         VG12DLYTIME: VG12DLYTIME,
         VG12ACTTIME: VG12ACTTIME,
         VG13DLYTIME: VG13DLYTIME,
         VG13ACTTIME: VG13ACTTIME,
         VG14DLYTIME: VG14DLYTIME,
         VG14ACTTIME: VG14ACTTIME,
         VG15DLYTIME: VG15DLYTIME,
         VG15ACTTIME: VG15ACTTIME,
         VG16DLYTIME: VG16DLYTIME,
         VG16ACTTIME: VG16ACTTIME,
         VG17DLYTIME: VG17DLYTIME,
         VG17ACTTIME: VG17ACTTIME,
         VG18DLYTIME: VG18DLYTIME,
         VG18ACTTIME: VG18ACTTIME,
         VG19DLYTIME: VG19DLYTIME,
         VG19ACTTIME: VG19ACTTIME,
         VG20DLYTIME: VG20DLYTIME,
         VG20ACTTIME: VG20ACTTIME,
         VG21DLYTIME: VG21DLYTIME,
         VG21ACTTIME: VG21ACTTIME,
         VG22DLYTIME: VG22DLYTIME,
         VG22ACTTIME: VG22ACTTIME,
         VG23DLYTIME: VG23DLYTIME,
         VG23ACTTIME: VG23ACTTIME,
         VG24DLYTIME: VG24DLYTIME,
         VG24ACTTIME: VG24ACTTIME,
         VG25DLYTIME: VG25DLYTIME,
         VG25ACTTIME: VG25ACTTIME,
         VG26DLYTIME: VG26DLYTIME,
         VG26ACTTIME: VG26ACTTIME,
         VG27DLYTIME: VG27DLYTIME,
         VG27ACTTIME: VG27ACTTIME,
         VG28DLYTIME: VG28DLYTIME,
         VG28ACTTIME: VG28ACTTIME,
         VG29DLYTIME: VG29DLYTIME,
         VG29ACTTIME: VG29ACTTIME,
         VG30DLYTIME: VG30DLYTIME,
         VG30ACTTIME: VG30ACTTIME,
         VG31DLYTIME: VG31DLYTIME,
         VG31ACTTIME: VG31ACTTIME,
         VG32DLYTIME: VG32DLYTIME,
         VG32ACTTIME: VG32ACTTIME,
         VG33DLYTIME: VG33DLYTIME,
         VG33ACTTIME: VG33ACTTIME,
         VG34DLYTIME: VG34DLYTIME,
         VG34ACTTIME: VG34ACTTIME,
         VG35DLYTIME: VG35DLYTIME,
         VG35ACTTIME: VG35ACTTIME,
         VG36DLYTIME: VG36DLYTIME,
         VG36ACTTIME: VG36ACTTIME,
         VG37DLYTIME: VG37DLYTIME,
         VG37ACTTIME: VG37ACTTIME,
         VG38DLYTIME: VG38DLYTIME,
         VG38ACTTIME: VG38ACTTIME,
         VG39DLYTIME: VG39DLYTIME,
         VG39ACTTIME: VG39ACTTIME,
         VG40DLYTIME: VG40DLYTIME,
         VG40ACTTIME: VG40ACTTIME,
         refrLadoFixo1: refrLadoFixo1,
         fixoRefrig1: fixoRefrig1,
         refrLadoFixo2: refrLadoFixo2,
         fixoRefrig2: fixoRefrig2,
         refrLadoFixo3: refrLadoFixo3,
         fixoRefrig3: fixoRefrig3,
         refrLadoFixo4: refrLadoFixo4,
         fixoRefrig4: fixoRefrig4,
         refrLadoMovel1: refrLadoMovel1,
         movelRefrig1: movelRefrig1,
         refrLadoMovel2: refrLadoMovel2,
         movelRefrig2: movelRefrig2,
         refrLadoMovel3: refrLadoMovel3,
         movelRefrig3: movelRefrig3,
         refrLadoMovel4: refrLadoMovel4,
         movelRefrig4: movelRefrig4,
         vaporLadoFixo1: vaporLadoFixo1,
         vaporLadoMovel1: vaporLadoMovel1,
         vaporLadoFixo2: vaporLadoFixo2,
         vaporLadoMovel2: vaporLadoMovel2,
         vaporLadoFixo3: vaporLadoFixo3,
         vaporLadoMovel3: vaporLadoMovel3,
         vaporLadoFixo4: vaporLadoFixo4,
         vaporLadoMovel4: vaporLadoMovel4,
         vaporLadoFixo5: vaporLadoFixo5,
         vaporLadoMovel5: vaporLadoMovel5,
         fixoSteam: fixoSteam,
         movelSteam: movelSteam,
      },{
         where:{
            id:id
         }
      }).then(() => {
         //*salvando os dados no banco de revisao
         RevisaoFichaTecnicaPastorePerifericos.create({
            idFichaTecnica: id,
            maq: maquina,
            termopar: termopar,
            voltagem: voltagem,
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
            VG1DLYTIME: VG1DLYTIME,
            VG1ACTTIME: VG1ACTTIME,
            VG2DLYTIME: VG2DLYTIME,
            VG2ACTTIME: VG2ACTTIME,
            VG3DLYTIME: VG3DLYTIME,
            VG3ACTTIME: VG3ACTTIME,
            VG4DLYTIME: VG4DLYTIME,
            VG4ACTTIME: VG4ACTTIME,
            VG5DLYTIME: VG5DLYTIME,
            VG5ACTTIME: VG5ACTTIME,
            VG6DLYTIME: VG6DLYTIME,
            VG6ACTTIME: VG6ACTTIME,
            VG7DLYTIME: VG7DLYTIME,
            VG7ACTTIME: VG7ACTTIME,
            VG8DLYTIME: VG8DLYTIME,
            VG8ACTTIME: VG8ACTTIME,
            VG9DLYTIME: VG9DLYTIME,
            VG9ACTTIME: VG9ACTTIME,
            VG10DLYTIME: VG10DLYTIME,
            VG10ACTTIME: VG10ACTTIME,
            VG11DLYTIME: VG11DLYTIME,
            VG11ACTTIME: VG11ACTTIME,
            VG12DLYTIME: VG12DLYTIME,
            VG12ACTTIME: VG12ACTTIME,
            VG13DLYTIME: VG13DLYTIME,
            VG13ACTTIME: VG13ACTTIME,
            VG14DLYTIME: VG14DLYTIME,
            VG14ACTTIME: VG14ACTTIME,
            VG15DLYTIME: VG15DLYTIME,
            VG15ACTTIME: VG15ACTTIME,
            VG16DLYTIME: VG16DLYTIME,
            VG16ACTTIME: VG16ACTTIME,
            VG17DLYTIME: VG17DLYTIME,
            VG17ACTTIME: VG17ACTTIME,
            VG18DLYTIME: VG18DLYTIME,
            VG18ACTTIME: VG18ACTTIME,
            VG19DLYTIME: VG19DLYTIME,
            VG19ACTTIME: VG19ACTTIME,
            VG20DLYTIME: VG20DLYTIME,
            VG20ACTTIME: VG20ACTTIME,
            VG21DLYTIME: VG21DLYTIME,
            VG21ACTTIME: VG21ACTTIME,
            VG22DLYTIME: VG22DLYTIME,
            VG22ACTTIME: VG22ACTTIME,
            VG23DLYTIME: VG23DLYTIME,
            VG23ACTTIME: VG23ACTTIME,
            VG24DLYTIME: VG24DLYTIME,
            VG24ACTTIME: VG24ACTTIME,
            VG25DLYTIME: VG25DLYTIME,
            VG25ACTTIME: VG25ACTTIME,
            VG26DLYTIME: VG26DLYTIME,
            VG26ACTTIME: VG26ACTTIME,
            VG27DLYTIME: VG27DLYTIME,
            VG27ACTTIME: VG27ACTTIME,
            VG28DLYTIME: VG28DLYTIME,
            VG28ACTTIME: VG28ACTTIME,
            VG29DLYTIME: VG29DLYTIME,
            VG29ACTTIME: VG29ACTTIME,
            VG30DLYTIME: VG30DLYTIME,
            VG30ACTTIME: VG30ACTTIME,
            VG31DLYTIME: VG31DLYTIME,
            VG31ACTTIME: VG31ACTTIME,
            VG32DLYTIME: VG32DLYTIME,
            VG32ACTTIME: VG32ACTTIME,
            VG33DLYTIME: VG33DLYTIME,
            VG33ACTTIME: VG33ACTTIME,
            VG34DLYTIME: VG34DLYTIME,
            VG34ACTTIME: VG34ACTTIME,
            VG35DLYTIME: VG35DLYTIME,
            VG35ACTTIME: VG35ACTTIME,
            VG36DLYTIME: VG36DLYTIME,
            VG36ACTTIME: VG36ACTTIME,
            VG37DLYTIME: VG37DLYTIME,
            VG37ACTTIME: VG37ACTTIME,
            VG38DLYTIME: VG38DLYTIME,
            VG38ACTTIME: VG38ACTTIME,
            VG39DLYTIME: VG39DLYTIME,
            VG39ACTTIME: VG39ACTTIME,
            VG40DLYTIME: VG40DLYTIME,
            VG40ACTTIME: VG40ACTTIME,
            refrLadoFixo1: refrLadoFixo1,
            fixoRefrig1: fixoRefrig1,
            refrLadoFixo2: refrLadoFixo2,
            fixoRefrig2: fixoRefrig2,
            refrLadoFixo3: refrLadoFixo3,
            fixoRefrig3: fixoRefrig3,
            refrLadoFixo4: refrLadoFixo4,
            fixoRefrig4: fixoRefrig4,
            refrLadoMovel1: refrLadoMovel1,
            movelRefrig1: movelRefrig1,
            refrLadoMovel2: refrLadoMovel2,
            movelRefrig2: movelRefrig2,
            refrLadoMovel3: refrLadoMovel3,
            movelRefrig3: movelRefrig3,
            refrLadoMovel4: refrLadoMovel4,
            movelRefrig4: movelRefrig4,
            vaporLadoFixo1: vaporLadoFixo1,
            vaporLadoMovel1: vaporLadoMovel1,
            vaporLadoFixo2: vaporLadoFixo2,
            vaporLadoMovel2: vaporLadoMovel2,
            vaporLadoFixo3: vaporLadoFixo3,
            vaporLadoMovel3: vaporLadoMovel3,
            vaporLadoFixo4: vaporLadoFixo4,
            vaporLadoMovel4: vaporLadoMovel4,
            vaporLadoFixo5: vaporLadoFixo5,
            vaporLadoMovel5: vaporLadoMovel5,
            fixoSteam: fixoSteam,
            movelSteam: movelSteam,
         }).then(() => {

            RevisaoFichaTecnicaPastoreInjetores.create({
               idFichaTecnica: id,
               maq: maquina,
               NúmeroMolde: NúmeroMolde,
               NúmeroMáquina: NúmeroMáquina,
               Revisao: Revisao,
               Cliente: Cliente,
               CodigoPAM: CodigoPAM,
               Tecnico: Tecnico,
               Produto: Produto,
               Material: Material,
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

   Moldes.findOne({
      where: {
         descricao: NúmeroMolde
      }
   }).then(output => {
      if (output === null || output === 'null') {

         Moldes.create({
            descricao:NúmeroMolde,
            codigo:NúmeroMolde,
         }).then(() => {
            console.log('MOLDE ADICIONADO')
         })

      } else {
         console.log('MOLDE JÁ EXISTE. NÃO ADICIONADO')
      }
   })

   MateriasPrimas.findOne({
      where: {
         descricao: Material
      }
   }).then(output => {
      if (output === null || output === 'null') {

         MateriasPrimas.create({
            descricao:Material,
            codigo:Material,
      
         }).then(() => {
            console.log('MATERIA PRIMA ADICIONADA.')
         })

      } else {
         console.log('MATERIA PRIMA JÁ EXISTE. NÃO ADICIONADA')
      }
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
      },
      order: [ [ 'createdAt', 'DESC' ]]
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
