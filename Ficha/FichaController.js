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


router.get("/fichas/editHaitian/:id",(req,res) => {

   var id = req.params.id;
   var perifericos;

   if(isNaN(id)){
      res.redirect("/fichas")
   }

   FichaPastorePerifericos.findByPk(id).then(periferico => {
      perifericos = periferico
      console.log(perifericos)
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
   console.log(req.body)
   var maquina = req.body.maquinaHaitian;

   var NúmeroMolde = req.body.molde !== "" ? req.body.molde : 0.0;
   var NúmeroMáquina = req.body.numMaquina;
   var Revisao = req.body.revisao !== "" ? req.body.revisao : 0.0;
   var Cliente = req.body.cliente;
   var CodigoPAM = req.body.codigoPAM !== "" ? req.body.codigoPAM : 0.0;
   var Tecnico = req.body.tecnico;
   var Produto = req.body.produto;
   var Material = req.body.material;

   var cilindro1 = req.body.cilindro1 !== "" ? req.body.cilindro1 : 0.0;
   var cilindro2 = req.body.cilindro2 !== "" ? req.body.cilindro2 : 0.0;
   var cilindro3 = req.body.cilindro3 !== "" ? req.body.cilindro3 : 0.0;
   var cilindro4 = req.body.cilindro4 !== "" ? req.body.cilindro4 : 0.0;
   var cilindro5 = req.body.cilindro5 !== "" ? req.body.cilindro5 : 0.0;
   var cilindro6 = req.body.cilindro6 !== "" ? req.body.cilindro6 : 0.0;
   var cilindro7 = req.body.cilindro7 !== "" ? req.body.cilindro7 : 0.0;
   var posComut = req.body.posComutacao !== "" ? req.body.posComutacao : 0.0;
   var posInjecao1 = req.body.posInj5 !== "" ? req.body.posInj5 : 0.0;
   var posInjecao2 = req.body.posInj4 !== "" ? req.body.posInj4 : 0.0;
   var posInjecao3 = req.body.posInj3 !== "" ? req.body.posInj3 : 0.0;
   var posInjecao4 = req.body.posInj2 !== "" ? req.body.posInj2 : 0.0;
   var posInjecao5 = req.body.posInj1 !== "" ? req.body.posInj1 : 0.0;
   var presComut = req.body.presComutacao !== "" ? req.body.presComutacao : 0.0;
   var presInjecao1 = req.body.presInj5 !== "" ? req.body.presInj5 : 0.0;
   var presInjecao2 = req.body.presInj4 !== "" ? req.body.presInj4 : 0.0;
   var presInjecao3 = req.body.presInj3 !== "" ? req.body.presInj3 : 0.0;
   var presInjecao4 = req.body.presInj2 !== "" ? req.body.presInj2 : 0.0;
   var presInjecao5 = req.body.presInj1 !== "" ? req.body.presInj1 : 0.0;
   var fluxoInjecao1 = req.body.fluxoInj5 !== "" ? req.body.fluxoInj5 : 0.0;
   var fluxoInjecao2 = req.body.fluxoInj4 !== "" ? req.body.fluxoInj4 : 0.0;
   var fluxoInjecao3 = req.body.fluxoInj3 !== "" ? req.body.fluxoInj3 : 0.0;
   var fluxoInjecao4 = req.body.fluxoInj2 !== "" ? req.body.fluxoInj2 : 0.0;
   var fluxoInjecao5 = req.body.fluxoInj1 !== "" ? req.body.fluxoInj1 : 0.0;
   var tempoDisparo = req.body.tempoDisparo !== "" ? req.body.tempoDisparo : 0.0;
   var pressaoInj = req.body.pressaoInj !== "" ? req.body.pressaoInj : 0.0;
   var presRecalque1 = req.body.presRecalque5 !== "" ? req.body.presRecalque5 : 0.0;
   var presRecalque2 = req.body.presRecalque4 !== "" ? req.body.presRecalque4 : 0.0;
   var presRecalque3 = req.body.presRecalque3 !== "" ? req.body.presRecalque3 : 0.0;
   var presRecalque4 = req.body.presRecalque2 !== "" ? req.body.presRecalque2 : 0.0;
   var presRecalque5 = req.body.presRecalque1 !== "" ? req.body.presRecalque1 : 0.0;
   var fluxoRecalque1 = req.body.fluxoRecalque5 !== "" ? req.body.fluxoRecalque5 : 0.0;
   var fluxoRecalque2 = req.body.fluxoRecalque4 !== "" ? req.body.fluxoRecalque4 : 0.0;
   var fluxoRecalque3 = req.body.fluxoRecalque3 !== "" ? req.body.fluxoRecalque3 : 0.0;
   var fluxoRecalque4 = req.body.fluxoRecalque2 !== "" ? req.body.fluxoRecalque2 : 0.0;
   var fluxoRecalque5 = req.body.fluxoRecalque1 !== "" ? req.body.fluxoRecalque1 : 0.0;
   var tempoRecalque1 = req.body.tempoRecalque5 !== "" ? req.body.tempoRecalque5 : 0.0;
   var tempoRecalque2 = req.body.tempoRecalque4 !== "" ? req.body.tempoRecalque4 : 0.0;
   var tempoRecalque3 = req.body.tempoRecalque3 !== "" ? req.body.tempoRecalque3 : 0.0;
   var tempoRecalque4 = req.body.tempoRecalque2 !== "" ? req.body.tempoRecalque2 : 0.0;
   var tempoRecalque5 = req.body.tempoRecalque1 !== "" ? req.body.tempoRecalque1 : 0.0;
   var partDosagem1 = req.body.partDosagem5 !== "" ? req.body.partDosagem5 : 0.0;
   var partDosagem2 = req.body.partDosagem4 !== "" ? req.body.partDosagem4 : 0.0;
   var partDosagem3 = req.body.partDosagem3 !== "" ? req.body.partDosagem3 : 0.0;
   var partDosagem4 = req.body.partDosagem2 !== "" ? req.body.partDosagem2 : 0.0;
   var partDosagem5 = req.body.partDosagem1 !== "" ? req.body.partDosagem1 : 0.0;
   var presDosagem1 = req.body.presDosagem5 !== "" ? req.body.presDosagem5 : 0.0;
   var presDosagem2 = req.body.presDosagem4 !== "" ? req.body.presDosagem4 : 0.0;
   var presDosagem3 = req.body.presDosagem3 !== "" ? req.body.presDosagem3 : 0.0;
   var presDosagem4 = req.body.presDosagem2 !== "" ? req.body.presDosagem2 : 0.0;
   var presDosagem5 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var fluxoDosagem1 = req.body.fluxoDosagem5 !== "" ? req.body.fluxoDosagem5 : 0.0;
   var fluxoDosagem2 = req.body.fluxoDosagem4 !== "" ? req.body.fluxoDosagem4 : 0.0;
   var fluxoDosagem3 = req.body.fluxoDosagem3 !== "" ? req.body.fluxoDosagem3 : 0.0;
   var fluxoDosagem4 = req.body.fluxoDosagem2 !== "" ? req.body.fluxoDosagem2 : 0.0;
   var fluxoDosagem5 = req.body.fluxoDosagem1 !== "" ? req.body.fluxoDosagem1 : 0.0;
   var CPDosagem1 = req.body.CPDosagem5 !== "" ? req.body.CPDosagem5 : 0.0;
   var CPDosagem2 = req.body.CPDosagem4 !== "" ? req.body.CPDosagem4 : 0.0;
   var CPDosagem3 = req.body.CPDosagem3 !== "" ? req.body.CPDosagem3 : 0.0;
   var CPDosagem4 = req.body.CPDosagem2 !== "" ? req.body.CPDosagem2 : 0.0;
   var CPDosagem5 = req.body.CPDosagem1 !== "" ? req.body.CPDosagem1 : 0.0;
   var tempoDosagem = req.body.tempoDosagem !== "" ? req.body.tempoDosagem : 0.0;
   var antesPos = req.body.antes1 !== "" ? req.body.antes1 : 0.0;
   var antesPres = req.body.antes2 !== "" ? req.body.antes2 : 0.0;
   var antesFluxo = req.body.antes3 !== "" ? req.body.antes3 : 0.0;
   var antesTempo = req.body.antes4 !== "" ? req.body.antes4 : 0.0;
   var depoisPos = req.body.depois1 !== "" ? req.body.depois1 : 0.0;
   var depoisPres = req.body.depois2 !== "" ? req.body.depois2 : 0.0;
   var depoisFluxo = req.body.depois3 !== "" ? req.body.depois3 : 0.0;
   var depoisTempo = req.body.depois4 !== "" ? req.body.depois4 : 0.0;
   var posFecha1 = req.body.posFech1 !== "" ? req.body.posFech1 : 0.0;
   var posFecha2 = req.body.posFech2 !== "" ? req.body.posFech2 : 0.0;
   var posFecha3 = req.body.posFech3 !== "" ? req.body.posFech3 : 0.0;
   var protMPos = req.body.protMPos !== "" ? req.body.protMPos : 0.0;
   var AltaPresPos = req.body.AltaPresPos !== "" ? req.body.AltaPresPos : 0.0;
   var presFecha1 = req.body.presFech1 !== "" ? req.body.presFech1 : 0.0;
   var presFecha2 = req.body.presFech2 !== "" ? req.body.presFech2 : 0.0;
   var presFecha3 = req.body.presFech3 !== "" ? req.body.presFech3 : 0.0;
   var protMPres = req.body.protMPres !== "" ? req.body.protMPres : 0.0;
   var AltaPresPres = req.body.AltaPresPressao !== "" ? req.body.AltaPresPressao : 0.0;
   var fluxoFecha1 = req.body.fluxoFech1 !== "" ? req.body.fluxoFech1 : 0.0;
   var fluxoFecha2 = req.body.fluxoFech2 !== "" ? req.body.fluxoFech2 : 0.0;
   var fluxoFecha3 = req.body.fluxoFech3 !== "" ? req.body.fluxoFech3 : 0.0;
   var protMFluxo = req.body.protMFluxo !== "" ? req.body.protMFluxo : 0.0;
   var AltaPresFluxo = req.body.AltaPresFluxo !== "" ? req.body.AltaPresFluxo : 0.0;
   var tempoProtMolde = req.body.tempoProtMolde !== "" ? req.body.tempoProtMolde : 0.0;
   var tempoFecha = req.body.tempoFecha !== "" ? req.body.tempoFecha : 0.0;
   var posAbertura1 = req.body.posAbertura5 !== "" ? req.body.posAbertura5 : 0.0;
   var posAbertura2 = req.body.posAbertura4 !== "" ? req.body.posAbertura4 : 0.0;
   var posAbertura3 = req.body.posAbertura3 !== "" ? req.body.posAbertura3 : 0.0;
   var posAbertura4 = req.body.posAbertura2 !== "" ? req.body.posAbertura2 : 0.0;
   var posAbertura5 = req.body.posAbertura1 !== "" ? req.body.posAbertura1 : 0.0;
   var presAbertura1 = req.body.presAbertura5 !== "" ? req.body.presAbertura5 : 0.0;
   var presAbertura2 = req.body.presAbertura4 !== "" ? req.body.presAbertura4 : 0.0;
   var presAbertura3 = req.body.presAbertura3 !== "" ? req.body.presAbertura3 : 0.0;
   var presAbertura4 = req.body.presAbertura2 !== "" ? req.body.presAbertura2 : 0.0;
   var presAbertura5 = req.body.presAbertura1 !== "" ? req.body.presAbertura1 : 0.0;
   var fluxoAbertura1 = req.body.fluxoAbertura5 !== "" ? req.body.fluxoAbertura5 : 0.0;
   var fluxoAbertura2 = req.body.fluxoAbertura4 !== "" ? req.body.fluxoAbertura4 : 0.0;
   var fluxoAbertura3 = req.body.fluxoAbertura3 !== "" ? req.body.fluxoAbertura3 : 0.0;
   var fluxoAbertura4 = req.body.fluxoAbertura2 !== "" ? req.body.fluxoAbertura2 : 0.0;
   var fluxoAbertura5 = req.body.fluxoAbertura1 !== "" ? req.body.fluxoAbertura1 : 0.0;
   var resfriamento = req.body.resfriamento !== "" ? req.body.resfriamento : 0.0;
   var tempoAbertura = req.body.tempoAbertura !== "" ? req.body.tempoAbertura : 0.0;
   var posAvanco1 = req.body.posAvanco1 !== "" ? req.body.posAvanco1 : 0.0;
   var posAvanco2 = req.body.posAvanco2 !== "" ? req.body.posAvanco2 : 0.0;
   var posAvanco3 = req.body.posAvanco3 !== "" ? req.body.posAvanco3 : 0.0;
   var posRecuo1 = req.body.posRecuo1 !== "" ? req.body.posRecuo1 : 0.0;
   var posRecuo2 = req.body.posRecuo2 !== "" ? req.body.posRecuo2 : 0.0;
   var posRecuo3 = req.body.posRecuo3 !== "" ? req.body.posRecuo3 : 0.0;
   var presAvanco1 = req.body.presAvanco1 !== "" ? req.body.presAvanco1 : 0.0;
   var presAvanco2 = req.body.presAvanco2 !== "" ? req.body.presAvanco2 : 0.0;
   var presAvanco3 = req.body.presAvanco3 !== "" ? req.body.presAvanco3 : 0.0;
   var presRecuo1 = req.body.presRecuo1 !== "" ? req.body.presRecuo1 : 0.0;
   var presRecuo2 = req.body.presRecuo2 !== "" ? req.body.presRecuo2 : 0.0;
   var presRecuo3 = req.body.presRecuo3 !== "" ? req.body.presRecuo3 : 0.0;
   var fluxoAvanco1 = req.body.fluxoAvanco1 !== "" ? req.body.fluxoAvanco1 : 0.0;
   var fluxoAvanco2 = req.body.fluxoAvanco2 !== "" ? req.body.fluxoAvanco2 : 0.0;
   var fluxoAvanco3 = req.body.fluxoAvanco3 !== "" ? req.body.fluxoAvanco3 : 0.0;
   var fluxoRecuo1 = req.body.fluxoRecuo1 !== "" ? req.body.fluxoRecuo1 : 0.0;
   var fluxoRecuo2 = req.body.fluxoRecuo2 !== "" ? req.body.fluxoRecuo2 : 0.0;
   var fluxoRecuo3 = req.body.fluxoRecuo3 !== "" ? req.body.fluxoRecuo3 : 0.0;
   var atraso = req.body.atraso !== "" ? req.body.atraso : 0.0;
   var batida = req.body.batida !== "" ? req.body.batida : 0.0;
   var radialTypeEntrada1 = req.body.type1 !== "" ? req.body.type1 : 0.0;
   var radialTypeSaida1 = req.body.type2 !== "" ? req.body.type2 : 0.0;
   var radialTypeEntrada2 = req.body.type3 !== "" ? req.body.type3 : 0.0;
   var radialTypeSaida2 = req.body.type4 !== "" ? req.body.type4 : 0.0;
   var radialPresEntrada1 = req.body.pressaoRadial1 !== "" ? req.body.pressaoRadial1 : 0.0;
   var radialPresSaida1 = req.body.pressaoRadial2 !== "" ? req.body.pressaoRadial2 : 0.0;
   var radialPresEntrada2 = req.body.pressaoRadial3 !== "" ? req.body.pressaoRadial3 : 0.0;
   var radialPresSaida2 = req.body.pressaoRadial4 !== "" ? req.body.pressaoRadial4 : 0.0;
   var radialPresEntrada3 = req.body.pressaoRadial5 !== "" ? req.body.pressaoRadial5 : 0.0;
   var radialPresSaida3 = req.body.pressaoRadial6 !== "" ? req.body.pressaoRadial6 : 0.0;
   var radialFluxoEntrada1 = req.body.fluxoRadial1 !== "" ? req.body.fluxoRadial1 : 0.0;
   var radialFluxoSaida1 = req.body.fluxoRadial2 !== "" ? req.body.fluxoRadial2 : 0.0;
   var radialFluxoEntrada2 = req.body.fluxoRadial3 !== "" ? req.body.fluxoRadial3 : 0.0;
   var radialFluxoSaida2 = req.body.fluxoRadial4 !== "" ? req.body.fluxoRadial4 : 0.0;
   var radialFluxoEntrada3 = req.body.fluxoRadial5 !== "" ? req.body.fluxoRadial5 : 0.0;
   var radialFluxoSaida3 = req.body.fluxoRadial6 !== "" ? req.body.fluxoRadial6 : 0.0;
   var radialPosEntrada1 = req.body.posRadial1 !== "" ? req.body.posRadial1 : 0.0;
   var radialPosSaida1 = req.body.posRadial2 !== "" ? req.body.posRadial2 : 0.0;
   var radialPosEntrada2 = req.body.posRadial3 !== "" ? req.body.posRadial3 : 0.0;
   var radialPosSaida2 = req.body.posRadial4 !== "" ? req.body.posRadial4 : 0.0;
   var radialPosEntrada3 = req.body.posRadial5 !== "" ? req.body.posRadial5 : 0.0;
   var radialPosSaida3 = req.body.posRadial6 !== "" ? req.body.posRadial6 : 0.0;
   var radialTempoEntrada1 = req.body.tempoRadial1 !== "" ? req.body.tempoRadial1 : 0.0;
   var radialTempoSaida1 = req.body.tempoRadial2 !== "" ? req.body.tempoRadial2 : 0.0;
   var radialTempoEntrada2 = req.body.tempoRadial3 !== "" ? req.body.tempoRadial3 : 0.0;
   var radialTempoSaida2 = req.body.tempoRadial4 !== "" ? req.body.tempoRadial4 : 0.0;
   var radialTempoEntrada3 = req.body.tempoRadial5 !== "" ? req.body.tempoRadial5 : 0.0;
   var radialTempoSaida3 = req.body.tempoRadial6 !== "" ? req.body.tempoRadial6 : 0.0;
   var radialSCREntrada1 = req.body.scrcount1 !== "" ? req.body.scrcount1 : 0.0;
   var radialSCRSaida1 = req.body.scrcount2 !== "" ? req.body.scrcount2 : 0.0;
   var radialSCREntrada2 = req.body.scrcount3 !== "" ? req.body.scrcount3 : 0.0;
   var radialSCRSaida2 = req.body.scrcount4 !== "" ? req.body.scrcount4 : 0.0;
   var radialSCREntrada3 = req.body.scrcount5 !== "" ? req.body.scrcount5 : 0.0;
   var radialSCRSaida3 = req.body.scrcount6 !== "" ? req.body.scrcount6 : 0.0;

   var camara1 = req.body.camara1[0] !== "" ? req.body.camara1[0] : 0.0;
   var camara2 = req.body.camara2[0] !== "" ? req.body.camara2[0] : 0.0;
   var camara3 = req.body.camara3[0] !== "" ? req.body.camara3[0] : 0.0;
   var camara4 = req.body.camara4[0] !== "" ? req.body.camara4[0] : 0.0;
   var camara5 = req.body.camara5[0] !== "" ? req.body.camara5[0] : 0.0;
   var camara6 = req.body.camara6[0] !== "" ? req.body.camara6[0] : 0.0;
   var camara7 = req.body.camara7[0] !== "" ? req.body.camara7[0] : 0.0;
   var camara8 = req.body.camara1[1] !== "" ? req.body.camara1[1] : 0.0;
   var camara9 = req.body.camara2[1] !== "" ? req.body.camara2[1] : 0.0;
   var camara10 = req.body.camara3[1] !== "" ? req.body.camara3[1] : 0.0;
   var camara11 = req.body.camara4[1] !== "" ? req.body.camara4[1] : 0.0;
   var camara12 = req.body.camara5[1] !== "" ? req.body.camara5[1] : 0.0;
   var camara13 = req.body.camara6[1] !== "" ? req.body.camara6[1] : 0.0;
   var camara14 = req.body.camara7[1] !== "" ? req.body.camara7[1] : 0.0;
   var camara15 = req.body.camara1[2] !== "" ? req.body.camara1[2] : 0.0;
   var camara16 = req.body.camara2[2] !== "" ? req.body.camara2[2] : 0.0;
   var camara17 = req.body.camara3[2] !== "" ? req.body.camara3[2] : 0.0;
   var camara18 = req.body.camara4[2] !== "" ? req.body.camara4[3] : 0.0;
   var camara19 = req.body.camara5[2] !== "" ? req.body.camara5[2] : 0.0;
   var camara20 = req.body.camara6[2] !== "" ? req.body.camara6[2] : 0.0;
   var camara21 = req.body.camara7[2] !== "" ? req.body.camara7[2] : 0.0;
   var camara22 = req.body.camara1[3] !== "" ? req.body.camara1[3] : 0.0;
   var camara23 = req.body.camara2[3] !== "" ? req.body.camara2[3] : 0.0;
   var camara24 = req.body.camara3[3] !== "" ? req.body.camara3[3] : 0.0;
   var camara25 = req.body.camara4[3] !== "" ? req.body.camara4[3] : 0.0;
   var camara26 = req.body.camara5[3] !== "" ? req.body.camara5[3] : 0.0;
   var camara27 = req.body.camara6[3] !== "" ? req.body.camara6[3] : 0.0;
   var camara28 = req.body.camara7[3] !== "" ? req.body.camara7[3] : 0.0;
   var camara29 = req.body.camara1[4] !== "" ? req.body.camara1[4] : 0.0;
   var camara30 = req.body.camara2[4] !== "" ? req.body.camara2[4] : 0.0;
   var camara31 = req.body.camara3[4] !== "" ? req.body.camara3[4] : 0.0;
   var camara32 = req.body.camara4[4] !== "" ? req.body.camara4[4] : 0.0;
   var camara33 = req.body.camara5[4] !== "" ? req.body.camara5[4] : 0.0;
   var camara34 = req.body.camara6[4] !== "" ? req.body.camara6[4] : 0.0;
   var camara35 = req.body.camara7[4] !== "" ? req.body.camara7[4] : 0.0;
   var camara36 = req.body.camara1[5] !== "" ? req.body.camara1[5] : 0.0;
   var camara37 = req.body.camara2[5] !== "" ? req.body.camara2[5] : 0.0;
   var camara38 = req.body.camara3[5] !== "" ? req.body.camara3[5] : 0.0;
   var camara39 = req.body.camara4[5] !== "" ? req.body.camara4[5] : 0.0;
   var camara40 = req.body.camara5[5] !== "" ? req.body.camara5[5] : 0.0;
   var camara41 = req.body.camara6[5] !== "" ? req.body.camara6[5] : 0.0;
   var camara42 = req.body.camara7[5] !== "" ? req.body.camara7[5] : 0.0;
   var camara43 = req.body.camara1[6] !== "" ? req.body.camara1[6] : 0.0;
   var camara44 = req.body.camara2[6] !== "" ? req.body.camara2[6] : 0.0;
   var camara45 = req.body.camara3[6] !== "" ? req.body.camara3[6] : 0.0;
   var camara46 = req.body.camara4[6] !== "" ? req.body.camara4[6] : 0.0;
   var camara47 = req.body.camara5[6] !== "" ? req.body.camara5[6] : 0.0;
   var camara48 = req.body.camara6[6] !== "" ? req.body.camara6[6] : 0.0;
   var camara49 = req.body.camara7[6] !== "" ? req.body.camara7[6] : 0.0;
   var camara50 = req.body.camara1[7] !== "" ? req.body.camara1[7] : 0.0;
   var camara51 = req.body.camara2[7] !== "" ? req.body.camara2[7] : 0.0;
   var camara52 = req.body.camara3[7] !== "" ? req.body.camara3[7] : 0.0;
   var camara53 = req.body.camara4[7] !== "" ? req.body.camara4[7] : 0.0;
   var camara54 = req.body.camara5[7] !== "" ? req.body.camara5[7] : 0.0;
   var camara55 = req.body.camara6[7] !== "" ? req.body.camara6[7] : 0.0;
   var camara56 = req.body.camara7[7] !== "" ? req.body.camara7[7] : 0.0;
   var camara57 = req.body.camara1[8] !== "" ? req.body.camara1[8] : 0.0;
   var camara58 = req.body.camara2[8] !== "" ? req.body.camara2[8] : 0.0;
   var camara59 = req.body.camara3[8] !== "" ? req.body.camara3[8] : 0.0;
   var camara60 = req.body.camara4[8] !== "" ? req.body.camara4[8] : 0.0;
   var camara61 = req.body.camara5[8] !== "" ? req.body.camara5[8] : 0.0;
   var camara62 = req.body.camara6[8] !== "" ? req.body.camara6[8] : 0.0;
   var camara63 = req.body.camara7[8] !== "" ? req.body.camara7[8] : 0.0;
   var camara64 = req.body.camara1[9] !== "" ? req.body.camara1[9] : 0.0;
   var camara65 = req.body.camara2[9] !== "" ? req.body.camara2[9] : 0.0;
   var camara66 = req.body.camara3[9] !== "" ? req.body.camara3[9] : 0.0;
   var camara67 = req.body.camara4[9] !== "" ? req.body.camara4[9] : 0.0;
   var camara68 = req.body.camara5[9] !== "" ? req.body.camara5[9] : 0.0;
   var camara69 = req.body.camara6[9] !== "" ? req.body.camara6[9] : 0.0;
   var camara70 = req.body.camara7[9] !== "" ? req.body.camara7[9] : 0.0;
   var camara71 = req.body.camara1[10] !== "" ? req.body.camara1[10] : 0.0;
   var camara72 = req.body.camara2[10] !== "" ? req.body.camara2[10] : 0.0;
   var camara73 = req.body.camara3[10] !== "" ? req.body.camara3[10] : 0.0;
   var camara74 = req.body.camara4[10] !== "" ? req.body.camara4[10] : 0.0;
   var camara75 = req.body.camara5[10] !== "" ? req.body.camara5[10] : 0.0;
   var camara76 = req.body.camara6[10] !== "" ? req.body.camara6[10] : 0.0;
   var camara77 = req.body.camara7[10] !== "" ? req.body.camara7[10] : 0.0;
   var camara78 = req.body.camara1[11] !== "" ? req.body.camara1[11] : 0.0;
   var camara79 = req.body.camara2[11] !== "" ? req.body.camara2[11] : 0.0;
   var camara80 = req.body.camara3[11] !== "" ? req.body.camara3[11] : 0.0;
   var camara81 = req.body.camara4[11] !== "" ? req.body.camara4[11] : 0.0;
   var camara82 = req.body.camara5[11] !== "" ? req.body.camara5[11] : 0.0;
   var camara83 = req.body.camara6[11] !== "" ? req.body.camara6[11] : 0.0;
   var camara84 = req.body.camara7[11] !== "" ? req.body.camara7[11] : 0.0;
   var camara85 = req.body.camara1[12] !== "" ? req.body.camara1[12] : 0.0;
   var camara86 = req.body.camara2[12] !== "" ? req.body.camara2[12] : 0.0;
   var camara87 = req.body.camara3[12] !== "" ? req.body.camara3[12] : 0.0;
   var camara88 = req.body.camara4[12] !== "" ? req.body.camara4[12] : 0.0;
   var camara89 = req.body.camara5[12] !== "" ? req.body.camara5[12] : 0.0;
   var camara90 = req.body.camara6[12] !== "" ? req.body.camara6[12] : 0.0;
   var camara91 = req.body.camara7[12] !== "" ? req.body.camara7[12] : 0.0;
   var camara92 = req.body.camara1[13] !== "" ? req.body.camara1[13] : 0.0;
   var camara93 = req.body.camara2[13] !== "" ? req.body.camara2[13] : 0.0;
   var camara94 = req.body.camara3[13] !== "" ? req.body.camara3[13] : 0.0;
   var camara95 = req.body.camara4[13] !== "" ? req.body.camara4[13] : 0.0;
   var camara96 = req.body.camara5[13] !== "" ? req.body.camara5[13] : 0.0;
   var camara97 = req.body.camara6[13] !== "" ? req.body.camara6[13] : 0.0;
   var camara98 = req.body.camara7[13] !== "" ? req.body.camara7[13] : 0.0;
   var camara99 = req.body.camara1[14] !== "" ? req.body.camara1[14] : 0.0;
   var camara100 = req.body.camara2[14] !== "" ? req.body.camara2[14] : 0.0;
   var camara101 = req.body.camara3[14] !== "" ? req.body.camara3[14] : 0.0;
   var camara102 = req.body.camara4[14] !== "" ? req.body.camara4[14] : 0.0;
   var camara103 = req.body.camara5[14] !== "" ? req.body.camara5[14] : 0.0;
   var camara104 = req.body.camara6[14] !== "" ? req.body.camara6[14] : 0.0;
   var camara105 = req.body.camara7[14] !== "" ? req.body.camara7[14] : 0.0;
   var camara106 = req.body.camara1[15] !== "" ? req.body.camara1[15] : 0.0;
   var camara107 = req.body.camara2[15] !== "" ? req.body.camara2[15] : 0.0;
   var camara108 = req.body.camara3[15] !== "" ? req.body.camara3[15] : 0.0;
   var camara109 = req.body.camara4[15] !== "" ? req.body.camara4[15] : 0.0;
   var camara110 = req.body.camara5[15] !== "" ? req.body.camara5[15] : 0.0;
   var camara111 = req.body.camara6[15] !== "" ? req.body.camara6[15] : 0.0;
   var camara112 = req.body.camara7[15] !== "" ? req.body.camara7[15] : 0.0;
   var camara113 = req.body.camara1[16] !== "" ? req.body.camara1[16] : 0.0;
   var camara114 = req.body.camara2[16] !== "" ? req.body.camara2[16] : 0.0;
   var camara115 = req.body.camara3[16] !== "" ? req.body.camara3[16] : 0.0;
   var camara116 = req.body.camara4[16] !== "" ? req.body.camara4[16] : 0.0;
   var camara117 = req.body.camara5[16] !== "" ? req.body.camara5[16] : 0.0;
   var camara118 = req.body.camara6[16] !== "" ? req.body.camara6[16] : 0.0;
   var camara119 = req.body.camara7[16] !== "" ? req.body.camara7[16] : 0.0;
   var camara120 = req.body.camara1[17] !== "" ? req.body.camara1[17] : 0.0;
   var camara121 = req.body.camara2[17] !== "" ? req.body.camara2[17] : 0.0;
   var camara122 = req.body.camara3[17] !== "" ? req.body.camara3[17] : 0.0;
   var camara123 = req.body.camara4[17] !== "" ? req.body.camara4[17] : 0.0;
   var camara124 = req.body.camara5[17] !== "" ? req.body.camara5[17] : 0.0;
   var camara125 = req.body.camara6[17] !== "" ? req.body.camara6[17] : 0.0;
   var camara126 = req.body.camara7[17] !== "" ? req.body.camara7[17] : 0.0;
   var camara127 = req.body.camara1[18] !== "" ? req.body.camara1[18] : 0.0;
   var camara128 = req.body.camara2[18] !== "" ? req.body.camara2[18] : 0.0;
   var camara129 = req.body.camara3[18] !== "" ? req.body.camara3[18] : 0.0;
   var camara130 = req.body.camara4[18] !== "" ? req.body.camara4[18] : 0.0;
   var termoparK1 = req.body.termoparK1 !== "" ? req.body.termoparK1 : 0.0;
   var termoparJ = req.body.termoparJ !== "" ? req.body.termoparJ : 0.0;
   var termoparK2 = req.body.termoparK2 !== "" ? req.body.termoparK2 : 0.0;
   var VG1DLYTIME = req.body.VG1[0] !== "" ? req.body.VG1[0] : 0.0;
   var VG1ACTTIME = req.body.VG1[1] !== "" ? req.body.VG1[1] : 0.0;
   var VG2DLYTIME = req.body.VG1[2] !== "" ? req.body.VG1[2] : 0.0;
   var VG2ACTTIME = req.body.VG1[3] !== "" ? req.body.VG1[3] : 0.0;
   var VG3DLYTIME = req.body.VG1[4] !== "" ? req.body.VG1[4] : 0.0;
   var VG3ACTTIME = req.body.VG1[5] !== "" ? req.body.VG1[5] : 0.0;
   var VG4DLYTIME = req.body.VG1[6] !== "" ? req.body.VG1[6] : 0.0;
   var VG4ACTTIME = req.body.VG1[7] !== "" ? req.body.VG1[7] : 0.0;
   var VG5DLYTIME = req.body.VG1[8] !== "" ? req.body.VG1[8] : 0.0;
   var VG5ACTTIME = req.body.VG1[9] !== "" ? req.body.VG1[9] : 0.0;
   var VG6DLYTIME = req.body.VG1[10] !== "" ? req.body.VG1[10] : 0.0;
   var VG6ACTTIME = req.body.VG1[11] !== "" ? req.body.VG1[11] : 0.0;
   var VG7DLYTIME = req.body.VG1[12] !== "" ? req.body.VG1[12] : 0.0;
   var VG7ACTTIME = req.body.VG1[13] !== "" ? req.body.VG1[13] : 0.0;
   var VG8DLYTIME = req.body.VG1[14] !== "" ? req.body.VG1[14] : 0.0;
   var VG8ACTTIME = req.body.VG1[15] !== "" ? req.body.VG1[15] : 0.0;
   var VG9DLYTIME = req.body.VG1[16] !== "" ? req.body.VG1[16] : 0.0;
   var VG9ACTTIME = req.body.VG1[17] !== "" ? req.body.VG1[17] : 0.0;
   var VG10DLYTIME = req.body.VG1[18] !== "" ? req.body.VG1[18] : 0.0;
   var VG10ACTTIME = req.body.VG1[19] !== "" ? req.body.VG1[19] : 0.0;
   var VG11DLYTIME = req.body.VG1[20] !== "" ? req.body.VG1[20] : 0.0;
   var VG11ACTTIME = req.body.VG1[21] !== "" ? req.body.VG1[21] : 0.0;
   var VG12DLYTIME = req.body.VG1[22] !== "" ? req.body.VG1[22] : 0.0;
   var VG12ACTTIME = req.body.VG1[23] !== "" ? req.body.VG1[23] : 0.0;
   var VG13DLYTIME = req.body.VG1[24] !== "" ? req.body.VG1[24] : 0.0;
   var VG13ACTTIME = req.body.VG1[25] !== "" ? req.body.VG1[25] : 0.0;
   var VG14DLYTIME = req.body.VG1[26] !== "" ? req.body.VG1[26] : 0.0;
   var VG14ACTTIME = req.body.VG1[27] !== "" ? req.body.VG1[27] : 0.0;
   var VG15DLYTIME = req.body.VG1[28] !== "" ? req.body.VG1[28] : 0.0;
   var VG15ACTTIME = req.body.VG1[29] !== "" ? req.body.VG1[29] : 0.0;
   var VG16DLYTIME = req.body.VG1[30] !== "" ? req.body.VG1[30] : 0.0;
   var VG16ACTTIME = req.body.VG1[31] !== "" ? req.body.VG1[31] : 0.0;
   var VG17DLYTIME = req.body.VG1[32] !== "" ? req.body.VG1[32] : 0.0;
   var VG17ACTTIME = req.body.VG1[33] !== "" ? req.body.VG1[33] : 0.0;
   var VG18DLYTIME = req.body.VG1[34] !== "" ? req.body.VG1[34] : 0.0;
   var VG18ACTTIME = req.body.VG1[35] !== "" ? req.body.VG1[35] : 0.0;
   var VG19DLYTIME = req.body.VG1[36] !== "" ? req.body.VG1[36] : 0.0;
   var VG19ACTTIME = req.body.VG1[37] !== "" ? req.body.VG1[37] : 0.0;
   var VG20DLYTIME = req.body.VG1[38] !== "" ? req.body.VG1[38] : 0.0;
   var VG20ACTTIME = req.body.VG1[39] !== "" ? req.body.VG1[39] : 0.0;
   var VG21DLYTIME = req.body.VG1[40] !== "" ? req.body.VG1[40] : 0.0;
   var VG21ACTTIME = req.body.VG1[41] !== "" ? req.body.VG1[41] : 0.0;
   var VG22DLYTIME = req.body.VG1[42] !== "" ? req.body.VG1[42] : 0.0;
   var VG22ACTTIME = req.body.VG1[43] !== "" ? req.body.VG1[43] : 0.0;
   var VG23DLYTIME = req.body.VG1[44] !== "" ? req.body.VG1[44] : 0.0;
   var VG23ACTTIME = req.body.VG1[45] !== "" ? req.body.VG1[45] : 0.0;
   var VG24DLYTIME = req.body.VG1[46] !== "" ? req.body.VG1[46] : 0.0;
   var VG24ACTTIME = req.body.VG1[47] !== "" ? req.body.VG1[47] : 0.0;
   var VG25DLYTIME = req.body.VG1[48] !== "" ? req.body.VG1[48] : 0.0;
   var VG25ACTTIME = req.body.VG1[49] !== "" ? req.body.VG1[49] : 0.0;
   var VG26DLYTIME = req.body.VG1[50] !== "" ? req.body.VG1[50] : 0.0;
   var VG26ACTTIME = req.body.VG1[51] !== "" ? req.body.VG1[51] : 0.0;
   var VG27DLYTIME = req.body.VG1[52] !== "" ? req.body.VG1[52] : 0.0;
   var VG27ACTTIME = req.body.VG1[53] !== "" ? req.body.VG1[53] : 0.0;
   var VG28DLYTIME = req.body.VG1[54] !== "" ? req.body.VG1[54] : 0.0;
   var VG28ACTTIME = req.body.VG1[55] !== "" ? req.body.VG1[55] : 0.0;
   var VG29DLYTIME = req.body.VG1[56] !== "" ? req.body.VG1[56] : 0.0;
   var VG29ACTTIME = req.body.VG1[57] !== "" ? req.body.VG1[57] : 0.0;
   var VG30DLYTIME = req.body.VG1[58] !== "" ? req.body.VG1[58] : 0.0;
   var VG30ACTTIME = req.body.VG1[59] !== "" ? req.body.VG1[59] : 0.0;
   var VG31DLYTIME = req.body.VG1[60] !== "" ? req.body.VG1[60] : 0.0;
   var VG31ACTTIME = req.body.VG1[61] !== "" ? req.body.VG1[61] : 0.0;
   var VG32DLYTIME = req.body.VG1[62] !== "" ? req.body.VG1[62] : 0.0;
   var VG32ACTTIME = req.body.VG1[63] !== "" ? req.body.VG1[63] : 0.0;
   var VG33DLYTIME = req.body.VG1[64] !== "" ? req.body.VG1[64] : 0.0;
   var VG33ACTTIME = req.body.VG1[65] !== "" ? req.body.VG1[65] : 0.0;
   var VG34DLYTIME = req.body.VG1[66] !== "" ? req.body.VG1[66] : 0.0;
   var VG34ACTTIME = req.body.VG1[67] !== "" ? req.body.VG1[67] : 0.0;
   var VG35DLYTIME = req.body.VG1[68] !== "" ? req.body.VG1[68] : 0.0;
   var VG35ACTTIME = req.body.VG1[69] !== "" ? req.body.VG1[69] : 0.0;
   var VG36DLYTIME = req.body.VG1[70] !== "" ? req.body.VG1[70] : 0.0;
   var VG36ACTTIME = req.body.VG1[71] !== "" ? req.body.VG1[71] : 0.0;
   var VG37DLYTIME = req.body.VG1[72] !== "" ? req.body.VG1[72] : 0.0;
   var VG37ACTTIME = req.body.VG1[73] !== "" ? req.body.VG1[73] : 0.0;
   var VG38DLYTIME = req.body.VG1[74] !== "" ? req.body.VG1[74] : 0.0;
   var VG38ACTTIME = req.body.VG1[75] !== "" ? req.body.VG1[75] : 0.0;
   var VG39DLYTIME = req.body.VG1[76] !== "" ? req.body.VG1[76] : 0.0;
   var VG39ACTTIME = req.body.VG1[77] !== "" ? req.body.VG1[77] : 0.0;
   var VG40DLYTIME = req.body.VG1[78] !== "" ? req.body.VG1[78] : 0.0;
   var VG40ACTTIME = req.body.VG1[79] !== "" ? req.body.VG1[79] : 0.0;
   var VG41DLYTIME = req.body.VG1[80] !== "" ? req.body.VG1[80] : 0.0;
   var VG41ACTTIME = req.body.VG1[81] !== "" ? req.body.VG1[81] : 0.0;
   var VG42DLYTIME = req.body.VG1[82] !== "" ? req.body.VG1[82] : 0.0;
   var VG42ACTTIME = req.body.VG1[83] !== "" ? req.body.VG1[83] : 0.0;
   var VG43DLYTIME = req.body.VG1[84] !== "" ? req.body.VG1[84] : 0.0;
   var VG43ACTTIME = req.body.VG1[85] !== "" ? req.body.VG1[85] : 0.0;
   var VG44DLYTIME = req.body.VG1[86] !== "" ? req.body.VG1[86] : 0.0;
   var VG44ACTTIME = req.body.VG1[87] !== "" ? req.body.VG1[87] : 0.0;
   var VG45DLYTIME = req.body.VG1[88] !== "" ? req.body.VG1[88] : 0.0;
   var VG45ACTTIME = req.body.VG1[89] !== "" ? req.body.VG1[89] : 0.0;
   var VG46DLYTIME = req.body.VG2[0] !== "" ? req.body.VG2[0] : 0.0;
   var VG46ACTTIME = req.body.VG2[1] !== "" ? req.body.VG2[1] : 0.0;
   var VG47DLYTIME = req.body.VG2[2] !== "" ? req.body.VG2[2] : 0.0;
   var VG47ACTTIME = req.body.VG2[3] !== "" ? req.body.VG2[3] : 0.0;
   var VG48DLYTIME = req.body.VG2[4] !== "" ? req.body.VG2[4] : 0.0;
   var VG48ACTTIME = req.body.VG2[5] !== "" ? req.body.VG2[5] : 0.0;
   var VG49DLYTIME = req.body.VG2[6] !== "" ? req.body.VG2[6] : 0.0;
   var VG49ACTTIME = req.body.VG2[7] !== "" ? req.body.VG2[7] : 0.0;
   var VG50DLYTIME = req.body.VG2[8] !== "" ? req.body.VG2[8] : 0.0;
   var VG50ACTTIME = req.body.VG2[9] !== "" ? req.body.VG2[9] : 0.0;
   var VG51DLYTIME = req.body.VG2[10] !== "" ? req.body.VG2[10] : 0.0;
   var VG51ACTTIME = req.body.VG2[11] !== "" ? req.body.VG2[11] : 0.0;
   var VG52DLYTIME = req.body.VG2[12] !== "" ? req.body.VG2[12] : 0.0;
   var VG52ACTTIME = req.body.VG2[13] !== "" ? req.body.VG2[13] : 0.0;
   var VG53DLYTIME = req.body.VG2[14] !== "" ? req.body.VG2[14] : 0.0;
   var VG53ACTTIME = req.body.VG2[15] !== "" ? req.body.VG2[15] : 0.0;
   var VG54DLYTIME = req.body.VG2[16] !== "" ? req.body.VG2[16] : 0.0;
   var VG54ACTTIME = req.body.VG2[17] !== "" ? req.body.VG2[17] : 0.0;
   var VG55DLYTIME = req.body.VG2[18] !== "" ? req.body.VG2[18] : 0.0;
   var VG55ACTTIME = req.body.VG2[19] !== "" ? req.body.VG2[19] : 0.0;
   var VG56DLYTIME = req.body.VG2[20] !== "" ? req.body.VG2[20] : 0.0;
   var VG56ACTTIME = req.body.VG2[21] !== "" ? req.body.VG2[21] : 0.0;
   var VG57DLYTIME = req.body.VG2[22] !== "" ? req.body.VG2[22] : 0.0;
   var VG57ACTTIME = req.body.VG2[23] !== "" ? req.body.VG2[23] : 0.0;
   var VG58DLYTIME = req.body.VG2[24] !== "" ? req.body.VG2[24] : 0.0;
   var VG58ACTTIME = req.body.VG2[25] !== "" ? req.body.VG2[25] : 0.0;
   var VG59DLYTIME = req.body.VG2[26] !== "" ? req.body.VG2[26] : 0.0;
   var VG59ACTTIME = req.body.VG2[27] !== "" ? req.body.VG2[27] : 0.0;
   var VG60DLYTIME = req.body.VG2[28] !== "" ? req.body.VG2[28] : 0.0;
   var VG60ACTTIME = req.body.VG2[29] !== "" ? req.body.VG2[29] : 0.0;
   var VG61DLYTIME = req.body.VG2[30] !== "" ? req.body.VG2[30] : 0.0;
   var VG61ACTTIME = req.body.VG2[31] !== "" ? req.body.VG2[31] : 0.0;
   var VG62DLYTIME = req.body.VG2[32] !== "" ? req.body.VG2[32] : 0.0;
   var VG62ACTTIME = req.body.VG2[33] !== "" ? req.body.VG2[33] : 0.0;
   var VG63DLYTIME = req.body.VG2[34] !== "" ? req.body.VG2[34] : 0.0;
   var VG63ACTTIME = req.body.VG2[35] !== "" ? req.body.VG2[35] : 0.0;
   var VG64DLYTIME = req.body.VG2[36] !== "" ? req.body.VG2[36] : 0.0;
   var VG64ACTTIME = req.body.VG2[37] !== "" ? req.body.VG2[37] : 0.0;
   var VG65DLYTIME = req.body.VG2[38] !== "" ? req.body.VG2[38] : 0.0;
   var VG65ACTTIME = req.body.VG2[39] !== "" ? req.body.VG2[39] : 0.0;
   var VG66DLYTIME = req.body.VG2[40] !== "" ? req.body.VG2[40] : 0.0;
   var VG66ACTTIME = req.body.VG2[41] !== "" ? req.body.VG2[41] : 0.0;
   var VG67DLYTIME = req.body.VG2[42] !== "" ? req.body.VG2[42] : 0.0;
   var VG67ACTTIME = req.body.VG2[43] !== "" ? req.body.VG2[43] : 0.0;
   var VG68DLYTIME = req.body.VG2[44] !== "" ? req.body.VG2[44] : 0.0;
   var VG68ACTTIME = req.body.VG2[45] !== "" ? req.body.VG2[45] : 0.0;
   var VG69DLYTIME = req.body.VG2[46] !== "" ? req.body.VG2[46] : 0.0;
   var VG69ACTTIME = req.body.VG2[47] !== "" ? req.body.VG2[47] : 0.0;
   var VG70DLYTIME = req.body.VG2[48] !== "" ? req.body.VG2[48] : 0.0;
   var VG70ACTTIME = req.body.VG2[49] !== "" ? req.body.VG2[49] : 0.0;
   var VG71DLYTIME = req.body.VG2[50] !== "" ? req.body.VG2[50] : 0.0;
   var VG71ACTTIME = req.body.VG2[51] !== "" ? req.body.VG2[51] : 0.0;
   var VG72DLYTIME = req.body.VG2[52] !== "" ? req.body.VG2[52] : 0.0;
   var VG72ACTTIME = req.body.VG2[53] !== "" ? req.body.VG2[53] : 0.0;
   var VG73DLYTIME = req.body.VG2[54] !== "" ? req.body.VG2[54] : 0.0;
   var VG73ACTTIME = req.body.VG2[55] !== "" ? req.body.VG2[55] : 0.0;
   var VG74DLYTIME = req.body.VG2[56] !== "" ? req.body.VG2[56] : 0.0;
   var VG74ACTTIME = req.body.VG2[57] !== "" ? req.body.VG2[57] : 0.0;
   var VG75DLYTIME = req.body.VG2[58] !== "" ? req.body.VG2[58] : 0.0;
   var VG75ACTTIME = req.body.VG2[59] !== "" ? req.body.VG2[59] : 0.0;
   var VG76DLYTIME = req.body.VG2[60] !== "" ? req.body.VG2[60] : 0.0;
   var VG76ACTTIME = req.body.VG2[61] !== "" ? req.body.VG2[61] : 0.0;
   var VG77DLYTIME = req.body.VG2[62] !== "" ? req.body.VG2[62] : 0.0;
   var VG77ACTTIME = req.body.VG2[63] !== "" ? req.body.VG2[63] : 0.0;
   var VG78DLYTIME = req.body.VG2[64] !== "" ? req.body.VG2[64] : 0.0;
   var VG78ACTTIME = req.body.VG2[65] !== "" ? req.body.VG2[65] : 0.0;
   var VG79DLYTIME = req.body.VG2[66] !== "" ? req.body.VG2[66] : 0.0;
   var VG79ACTTIME = req.body.VG2[67] !== "" ? req.body.VG2[67] : 0.0;
   var VG80DLYTIME = req.body.VG2[68] !== "" ? req.body.VG2[68] : 0.0;
   var VG80ACTTIME = req.body.VG2[69] !== "" ? req.body.VG2[69] : 0.0;
   var VG81DLYTIME = req.body.VG2[70] !== "" ? req.body.VG2[70] : 0.0;
   var VG81ACTTIME = req.body.VG2[71] !== "" ? req.body.VG2[71] : 0.0;
   var VG82DLYTIME = req.body.VG2[72] !== "" ? req.body.VG2[72] : 0.0;
   var VG82ACTTIME = req.body.VG2[73] !== "" ? req.body.VG2[73] : 0.0;
   var VG83DLYTIME = req.body.VG2[74] !== "" ? req.body.VG2[74] : 0.0;
   var VG83ACTTIME = req.body.VG2[75] !== "" ? req.body.VG2[75] : 0.0;
   var VG84DLYTIME = req.body.VG2[76] !== "" ? req.body.VG2[76] : 0.0;
   var VG84ACTTIME = req.body.VG2[77] !== "" ? req.body.VG2[77] : 0.0;
   var VG85DLYTIME = req.body.VG2[78] !== "" ? req.body.VG2[78] : 0.0;
   var VG85ACTTIME = req.body.VG2[79] !== "" ? req.body.VG2[79] : 0.0;
   var VG86DLYTIME = req.body.VG2[80] !== "" ? req.body.VG2[80] : 0.0;
   var VG86ACTTIME = req.body.VG2[81] !== "" ? req.body.VG2[81] : 0.0;
   var VG87DLYTIME = req.body.VG2[82] !== "" ? req.body.VG2[82] : 0.0;
   var VG87ACTTIME = req.body.VG2[83] !== "" ? req.body.VG2[83] : 0.0;
   var VG88DLYTIME = req.body.VG2[84] !== "" ? req.body.VG2[84] : 0.0;
   var VG88ACTTIME = req.body.VG2[85] !== "" ? req.body.VG2[85] : 0.0;
   var VG89DLYTIME = req.body.VG2[86] !== "" ? req.body.VG2[86] : 0.0;
   var VG89ACTTIME = req.body.VG2[87] !== "" ? req.body.VG2[87] : 0.0;
   var VG90DLYTIME = req.body.VG2[88] !== "" ? req.body.VG2[88] : 0.0;
   var VG90ACTTIME = req.body.VG2[89] !== "" ? req.body.VG2[89] : 0.0;
   var voltagem = req.body.voltagem !== "" ? req.body.voltagem : 0.0;

   var refrLadoFixo1 = req.body.rmladofixo1 !== "" ? req.body.rmladofixo1 : 0.0;
   var refrLadoFixo2 = req.body.rmladomovel1 !== "" ? req.body.rmladomovel1 : 0.0;
   var refrLadoMovel1 = req.body.rmladofixo2 !== "" ? req.body.rmladofixo2 : 0.0;
   var refrLadoMovel2 = req.body.rmladomovel2 !== "" ? req.body.rmladomovel2 : 0.0;
   var vaporLadoFixo1 = req.body.valorladofixo !== "" ? req.body.valorladofixo : 0.0;
   var vaporLadoFixo2 = req.body.valorladomovel !== "" ? req.body.valorladomovel : 0.0;

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
         termoparK1: termoparK1,
         termoparJ: termoparJ,
         termoparK2: termoparK2,
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
         VG41DLYTIME: VG41DLYTIME,
         VG41ACTTIME: VG41ACTTIME,
         VG42DLYTIME: VG42DLYTIME,
         VG42ACTTIME: VG42ACTTIME,
         VG43DLYTIME: VG43DLYTIME,
         VG43ACTTIME: VG43ACTTIME,
         VG44DLYTIME: VG44DLYTIME,
         VG44ACTTIME: VG44ACTTIME,
         VG45DLYTIME: VG45DLYTIME,
         VG45ACTTIME: VG45ACTTIME,
         VG46DLYTIME: VG46DLYTIME,
         VG46ACTTIME: VG46ACTTIME,
         VG47DLYTIME: VG47DLYTIME,
         VG47ACTTIME: VG47ACTTIME,
         VG48DLYTIME: VG48DLYTIME,
         VG48ACTTIME: VG48ACTTIME,
         VG49DLYTIME: VG49DLYTIME,
         VG49ACTTIME: VG49ACTTIME,
         VG50DLYTIME: VG50DLYTIME,
         VG50ACTTIME: VG50ACTTIME,
         VG51DLYTIME: VG51DLYTIME,
         VG51ACTTIME: VG51ACTTIME,
         VG52DLYTIME: VG52DLYTIME,
         VG52ACTTIME: VG52ACTTIME,
         VG53DLYTIME: VG53DLYTIME,
         VG53ACTTIME: VG53ACTTIME,
         VG54DLYTIME: VG54DLYTIME,
         VG54ACTTIME: VG54ACTTIME,
         VG55DLYTIME: VG55DLYTIME,
         VG55ACTTIME: VG55ACTTIME,
         VG56DLYTIME: VG56DLYTIME,
         VG56ACTTIME: VG56ACTTIME,
         VG57DLYTIME: VG57DLYTIME,
         VG57ACTTIME: VG57ACTTIME,
         VG58DLYTIME: VG58DLYTIME,
         VG58ACTTIME: VG58ACTTIME,
         VG59DLYTIME: VG59DLYTIME,
         VG59ACTTIME: VG59ACTTIME,
         VG60DLYTIME: VG60DLYTIME,
         VG60ACTTIME: VG60ACTTIME,
         VG61DLYTIME: VG61DLYTIME,
         VG61ACTTIME: VG61ACTTIME,
         VG62DLYTIME: VG62DLYTIME,
         VG62ACTTIME: VG62ACTTIME,
         VG63DLYTIME: VG63DLYTIME,
         VG63ACTTIME: VG63ACTTIME,
         VG64DLYTIME: VG64DLYTIME,
         VG64ACTTIME: VG64ACTTIME,
         VG65DLYTIME: VG65DLYTIME,
         VG65ACTTIME: VG65ACTTIME,
         VG66DLYTIME: VG66DLYTIME,
         VG66ACTTIME: VG66ACTTIME,
         VG67DLYTIME: VG67DLYTIME,
         VG67ACTTIME: VG67ACTTIME,
         VG68DLYTIME: VG68DLYTIME,
         VG68ACTTIME: VG68ACTTIME,
         VG69DLYTIME: VG69DLYTIME,
         VG69ACTTIME: VG69ACTTIME,
         VG70DLYTIME: VG70DLYTIME,
         VG70ACTTIME: VG70ACTTIME,
         VG71DLYTIME: VG71DLYTIME,
         VG71ACTTIME: VG71ACTTIME,
         VG72DLYTIME: VG72DLYTIME,
         VG72ACTTIME: VG72ACTTIME,
         VG73DLYTIME: VG73DLYTIME,
         VG73ACTTIME: VG73ACTTIME,
         VG74DLYTIME: VG74DLYTIME,
         VG74ACTTIME: VG74ACTTIME,
         VG75DLYTIME: VG75DLYTIME,
         VG75ACTTIME: VG75ACTTIME,
         VG76DLYTIME: VG76DLYTIME,
         VG76ACTTIME: VG76ACTTIME,
         VG77DLYTIME: VG77DLYTIME,
         VG77ACTTIME: VG77ACTTIME,
         VG78DLYTIME: VG78DLYTIME,
         VG78ACTTIME: VG78ACTTIME,
         VG79DLYTIME: VG79DLYTIME,
         VG79ACTTIME: VG79ACTTIME,
         VG80DLYTIME: VG80DLYTIME,
         VG80ACTTIME: VG80ACTTIME,
         VG81DLYTIME: VG81DLYTIME,
         VG81ACTTIME: VG81ACTTIME,
         VG82DLYTIME: VG82DLYTIME,
         VG82ACTTIME: VG82ACTTIME,
         VG83DLYTIME: VG83DLYTIME,
         VG83ACTTIME: VG83ACTTIME,
         VG84DLYTIME: VG84DLYTIME,
         VG84ACTTIME: VG84ACTTIME,
         VG85DLYTIME: VG85DLYTIME,
         VG85ACTTIME: VG85ACTTIME,
         VG86DLYTIME: VG86DLYTIME,
         VG86ACTTIME: VG86ACTTIME,
         VG87DLYTIME: VG87DLYTIME,
         VG87ACTTIME: VG87ACTTIME,
         VG88DLYTIME: VG88DLYTIME,
         VG88ACTTIME: VG88ACTTIME,
         VG89DLYTIME: VG89DLYTIME,
         VG89ACTTIME: VG89ACTTIME,
         VG90DLYTIME: VG90DLYTIME,
         VG90ACTTIME: VG90ACTTIME,
         voltagem: voltagem,
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
            termoparK1: termoparK1,
            termoparJ: termoparJ,
            termoparK2: termoparK2,
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
            VG41DLYTIME: VG41DLYTIME,
            VG41ACTTIME: VG41ACTTIME,
            VG42DLYTIME: VG42DLYTIME,
            VG42ACTTIME: VG42ACTTIME,
            VG43DLYTIME: VG43DLYTIME,
            VG43ACTTIME: VG43ACTTIME,
            VG44DLYTIME: VG44DLYTIME,
            VG44ACTTIME: VG44ACTTIME,
            VG45DLYTIME: VG45DLYTIME,
            VG45ACTTIME: VG45ACTTIME,
            VG46DLYTIME: VG46DLYTIME,
            VG46ACTTIME: VG46ACTTIME,
            VG47DLYTIME: VG47DLYTIME,
            VG47ACTTIME: VG47ACTTIME,
            VG48DLYTIME: VG48DLYTIME,
            VG48ACTTIME: VG48ACTTIME,
            VG49DLYTIME: VG49DLYTIME,
            VG49ACTTIME: VG49ACTTIME,
            VG50DLYTIME: VG50DLYTIME,
            VG50ACTTIME: VG50ACTTIME,
            VG51DLYTIME: VG51DLYTIME,
            VG51ACTTIME: VG51ACTTIME,
            VG52DLYTIME: VG52DLYTIME,
            VG52ACTTIME: VG52ACTTIME,
            VG53DLYTIME: VG53DLYTIME,
            VG53ACTTIME: VG53ACTTIME,
            VG54DLYTIME: VG54DLYTIME,
            VG54ACTTIME: VG54ACTTIME,
            VG55DLYTIME: VG55DLYTIME,
            VG55ACTTIME: VG55ACTTIME,
            VG56DLYTIME: VG56DLYTIME,
            VG56ACTTIME: VG56ACTTIME,
            VG57DLYTIME: VG57DLYTIME,
            VG57ACTTIME: VG57ACTTIME,
            VG58DLYTIME: VG58DLYTIME,
            VG58ACTTIME: VG58ACTTIME,
            VG59DLYTIME: VG59DLYTIME,
            VG59ACTTIME: VG59ACTTIME,
            VG60DLYTIME: VG60DLYTIME,
            VG60ACTTIME: VG60ACTTIME,
            VG61DLYTIME: VG61DLYTIME,
            VG61ACTTIME: VG61ACTTIME,
            VG62DLYTIME: VG62DLYTIME,
            VG62ACTTIME: VG62ACTTIME,
            VG63DLYTIME: VG63DLYTIME,
            VG63ACTTIME: VG63ACTTIME,
            VG64DLYTIME: VG64DLYTIME,
            VG64ACTTIME: VG64ACTTIME,
            VG65DLYTIME: VG65DLYTIME,
            VG65ACTTIME: VG65ACTTIME,
            VG66DLYTIME: VG66DLYTIME,
            VG66ACTTIME: VG66ACTTIME,
            VG67DLYTIME: VG67DLYTIME,
            VG67ACTTIME: VG67ACTTIME,
            VG68DLYTIME: VG68DLYTIME,
            VG68ACTTIME: VG68ACTTIME,
            VG69DLYTIME: VG69DLYTIME,
            VG69ACTTIME: VG69ACTTIME,
            VG70DLYTIME: VG70DLYTIME,
            VG70ACTTIME: VG70ACTTIME,
            VG71DLYTIME: VG71DLYTIME,
            VG71ACTTIME: VG71ACTTIME,
            VG72DLYTIME: VG72DLYTIME,
            VG72ACTTIME: VG72ACTTIME,
            VG73DLYTIME: VG73DLYTIME,
            VG73ACTTIME: VG73ACTTIME,
            VG74DLYTIME: VG74DLYTIME,
            VG74ACTTIME: VG74ACTTIME,
            VG75DLYTIME: VG75DLYTIME,
            VG75ACTTIME: VG75ACTTIME,
            VG76DLYTIME: VG76DLYTIME,
            VG76ACTTIME: VG76ACTTIME,
            VG77DLYTIME: VG77DLYTIME,
            VG77ACTTIME: VG77ACTTIME,
            VG78DLYTIME: VG78DLYTIME,
            VG78ACTTIME: VG78ACTTIME,
            VG79DLYTIME: VG79DLYTIME,
            VG79ACTTIME: VG79ACTTIME,
            VG80DLYTIME: VG80DLYTIME,
            VG80ACTTIME: VG80ACTTIME,
            VG81DLYTIME: VG81DLYTIME,
            VG81ACTTIME: VG81ACTTIME,
            VG82DLYTIME: VG82DLYTIME,
            VG82ACTTIME: VG82ACTTIME,
            VG83DLYTIME: VG83DLYTIME,
            VG83ACTTIME: VG83ACTTIME,
            VG84DLYTIME: VG84DLYTIME,
            VG84ACTTIME: VG84ACTTIME,
            VG85DLYTIME: VG85DLYTIME,
            VG85ACTTIME: VG85ACTTIME,
            VG86DLYTIME: VG86DLYTIME,
            VG86ACTTIME: VG86ACTTIME,
            VG87DLYTIME: VG87DLYTIME,
            VG87ACTTIME: VG87ACTTIME,
            VG88DLYTIME: VG88DLYTIME,
            VG88ACTTIME: VG88ACTTIME,
            VG89DLYTIME: VG89DLYTIME,
            VG89ACTTIME: VG89ACTTIME,
            VG90DLYTIME: VG90DLYTIME,
            VG90ACTTIME: VG90ACTTIME,
            voltagem: voltagem,
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
})

// *ATUALIZANDO FICHA PASTORE
router.post("/fichas/updateHaitian",(req,res) => {
   var id = req.body.id;
   var maquina = req.body.maquina;

   var NúmeroMolde = req.body.molde !== "" ? req.body.molde : 0.0;
   var NúmeroMáquina = req.body.numMaquina;
   var Revisao = req.body.revisao !== "" ? req.body.revisao : 0.0;
   var Cliente = req.body.cliente;
   var CodigoPAM = req.body.codigoPAM !== "" ? req.body.codigoPAM : 0.0;
   var Tecnico = req.body.tecnico;
   var Produto = req.body.produto;
   var Material = req.body.material;

   var cilindro1 = req.body.cilindro1 !== "" ? req.body.cilindro1 : 0.0;
   var cilindro2 = req.body.cilindro2 !== "" ? req.body.cilindro2 : 0.0;
   var cilindro3 = req.body.cilindro3 !== "" ? req.body.cilindro3 : 0.0;
   var cilindro4 = req.body.cilindro4 !== "" ? req.body.cilindro4 : 0.0;
   var cilindro5 = req.body.cilindro5 !== "" ? req.body.cilindro5 : 0.0;
   var cilindro6 = req.body.cilindro6 !== "" ? req.body.cilindro6 : 0.0;
   var cilindro7 = req.body.cilindro7 !== "" ? req.body.cilindro7 : 0.0;
   var posComut = req.body.posComutacao !== "" ? req.body.posComutacao : 0.0;
   var posInjecao1 = req.body.posInj5 !== "" ? req.body.posInj5 : 0.0;
   var posInjecao2 = req.body.posInj4 !== "" ? req.body.posInj4 : 0.0;
   var posInjecao3 = req.body.posInj3 !== "" ? req.body.posInj3 : 0.0;
   var posInjecao4 = req.body.posInj2 !== "" ? req.body.posInj2 : 0.0;
   var posInjecao5 = req.body.posInj1 !== "" ? req.body.posInj1 : 0.0;
   var presComut = req.body.presComutacao !== "" ? req.body.presComutacao : 0.0;
   var presInjecao1 = req.body.presInj5 !== "" ? req.body.presInj5 : 0.0;
   var presInjecao2 = req.body.presInj4 !== "" ? req.body.presInj4 : 0.0;
   var presInjecao3 = req.body.presInj3 !== "" ? req.body.presInj3 : 0.0;
   var presInjecao4 = req.body.presInj2 !== "" ? req.body.presInj2 : 0.0;
   var presInjecao5 = req.body.presInj1 !== "" ? req.body.presInj1 : 0.0;
   var fluxoInjecao1 = req.body.fluxoInj5 !== "" ? req.body.fluxoInj5 : 0.0;
   var fluxoInjecao2 = req.body.fluxoInj4 !== "" ? req.body.fluxoInj4 : 0.0;
   var fluxoInjecao3 = req.body.fluxoInj3 !== "" ? req.body.fluxoInj3 : 0.0;
   var fluxoInjecao4 = req.body.fluxoInj2 !== "" ? req.body.fluxoInj2 : 0.0;
   var fluxoInjecao5 = req.body.fluxoInj1 !== "" ? req.body.fluxoInj1 : 0.0;
   var tempoDisparo = req.body.tempoDisparo !== "" ? req.body.tempoDisparo : 0.0;
   var pressaoInj = req.body.pressaoInj !== "" ? req.body.pressaoInj : 0.0;
   var presRecalque1 = req.body.presRecalque5 !== "" ? req.body.presRecalque5 : 0.0;
   var presRecalque2 = req.body.presRecalque4 !== "" ? req.body.presRecalque4 : 0.0;
   var presRecalque3 = req.body.presRecalque3 !== "" ? req.body.presRecalque3 : 0.0;
   var presRecalque4 = req.body.presRecalque2 !== "" ? req.body.presRecalque2 : 0.0;
   var presRecalque5 = req.body.presRecalque1 !== "" ? req.body.presRecalque1 : 0.0;
   var fluxoRecalque1 = req.body.fluxoRecalque5 !== "" ? req.body.fluxoRecalque5 : 0.0;
   var fluxoRecalque2 = req.body.fluxoRecalque4 !== "" ? req.body.fluxoRecalque4 : 0.0;
   var fluxoRecalque3 = req.body.fluxoRecalque3 !== "" ? req.body.fluxoRecalque3 : 0.0;
   var fluxoRecalque4 = req.body.fluxoRecalque2 !== "" ? req.body.fluxoRecalque2 : 0.0;
   var fluxoRecalque5 = req.body.fluxoRecalque1 !== "" ? req.body.fluxoRecalque1 : 0.0;
   var tempoRecalque1 = req.body.tempoRecalque5 !== "" ? req.body.tempoRecalque5 : 0.0;
   var tempoRecalque2 = req.body.tempoRecalque4 !== "" ? req.body.tempoRecalque4 : 0.0;
   var tempoRecalque3 = req.body.tempoRecalque3 !== "" ? req.body.tempoRecalque3 : 0.0;
   var tempoRecalque4 = req.body.tempoRecalque2 !== "" ? req.body.tempoRecalque2 : 0.0;
   var tempoRecalque5 = req.body.tempoRecalque1 !== "" ? req.body.tempoRecalque1 : 0.0;
   var partDosagem1 = req.body.partDosagem5 !== "" ? req.body.partDosagem5 : 0.0;
   var partDosagem2 = req.body.partDosagem4 !== "" ? req.body.partDosagem4 : 0.0;
   var partDosagem3 = req.body.partDosagem3 !== "" ? req.body.partDosagem3 : 0.0;
   var partDosagem4 = req.body.partDosagem2 !== "" ? req.body.partDosagem2 : 0.0;
   var partDosagem5 = req.body.partDosagem1 !== "" ? req.body.partDosagem1 : 0.0;
   var presDosagem1 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var presDosagem2 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var presDosagem3 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var presDosagem4 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var presDosagem5 = req.body.presDosagem1 !== "" ? req.body.presDosagem1 : 0.0;
   var fluxoDosagem1 = req.body.fluxoDosagem5 !== "" ? req.body.fluxoDosagem5 : 0.0;
   var fluxoDosagem2 = req.body.fluxoDosagem4 !== "" ? req.body.fluxoDosagem4 : 0.0;
   var fluxoDosagem3 = req.body.fluxoDosagem3 !== "" ? req.body.fluxoDosagem3 : 0.0;
   var fluxoDosagem4 = req.body.fluxoDosagem2 !== "" ? req.body.fluxoDosagem2 : 0.0;
   var fluxoDosagem5 = req.body.fluxoDosagem1 !== "" ? req.body.fluxoDosagem1 : 0.0;
   var CPDosagem1 = req.body.CPDosagem5 !== "" ? req.body.CPDosagem5 : 0.0;
   var CPDosagem2 = req.body.CPDosagem4 !== "" ? req.body.CPDosagem4 : 0.0;
   var CPDosagem3 = req.body.CPDosagem3 !== "" ? req.body.CPDosagem3 : 0.0;
   var CPDosagem4 = req.body.CPDosagem2 !== "" ? req.body.CPDosagem2 : 0.0;
   var CPDosagem5 = req.body.CPDosagem1 !== "" ? req.body.CPDosagem1 : 0.0;
   var tempoDosagem = req.body.tempoDosagem !== "" ? req.body.tempoDosagem : 0.0;
   var antesPos = req.body.antes1 !== "" ? req.body.antes1 : 0.0;
   var antesPres = req.body.antes2 !== "" ? req.body.antes2 : 0.0;
   var antesFluxo = req.body.antes3 !== "" ? req.body.antes3 : 0.0;
   var antesTempo = req.body.antes4 !== "" ? req.body.antes4 : 0.0;
   var depoisPos = req.body.depois1 !== "" ? req.body.depois1 : 0.0;
   var depoisPres = req.body.depois2 !== "" ? req.body.depois2 : 0.0;
   var depoisFluxo = req.body.depois3 !== "" ? req.body.depois3 : 0.0;
   var depoisTempo = req.body.depois4 !== "" ? req.body.depois4 : 0.0;
   var posFecha1 = req.body.posFech1 !== "" ? req.body.posFech1 : 0.0;
   var posFecha2 = req.body.posFech2 !== "" ? req.body.posFech2 : 0.0;
   var posFecha3 = req.body.posFech3 !== "" ? req.body.posFech3 : 0.0;
   var protMPos = req.body.protMPos !== "" ? req.body.protMPos : 0.0;
   var AltaPresPos = req.body.AltaPresPos !== "" ? req.body.AltaPresPos : 0.0;
   var presFecha1 = req.body.presFech1 !== "" ? req.body.presFech1 : 0.0;
   var presFecha2 = req.body.presFech2 !== "" ? req.body.presFech2 : 0.0;
   var presFecha3 = req.body.presFech3 !== "" ? req.body.presFech3 : 0.0;
   var protMPres = req.body.protMPres !== "" ? req.body.protMPres : 0.0;
   var AltaPresPres = req.body.AltaPresPressao !== "" ? req.body.AltaPresPressao : 0.0;
   var fluxoFecha1 = req.body.fluxoFech1 !== "" ? req.body.fluxoFech1 : 0.0;
   var fluxoFecha2 = req.body.fluxoFech2 !== "" ? req.body.fluxoFech2 : 0.0;
   var fluxoFecha3 = req.body.fluxoFech3 !== "" ? req.body.fluxoFech3 : 0.0;
   var protMFluxo = req.body.protMFluxo !== "" ? req.body.protMFluxo : 0.0;
   var AltaPresFluxo = req.body.AltaPresFluxo !== "" ? req.body.AltaPresFluxo : 0.0;
   var tempoProtMolde = req.body.tempoProtMolde !== "" ? req.body.tempoProtMolde : 0.0;
   var tempoFecha = req.body.tempoFecha !== "" ? req.body.tempoFecha : 0.0;
   var posAbertura1 = req.body.posAbertura5 !== "" ? req.body.posAbertura5 : 0.0;
   var posAbertura2 = req.body.posAbertura4 !== "" ? req.body.posAbertura4 : 0.0;
   var posAbertura3 = req.body.posAbertura3 !== "" ? req.body.posAbertura3 : 0.0;
   var posAbertura4 = req.body.posAbertura2 !== "" ? req.body.posAbertura2 : 0.0;
   var posAbertura5 = req.body.posAbertura1 !== "" ? req.body.posAbertura1 : 0.0;
   var presAbertura1 = req.body.presAbertura5 !== "" ? req.body.presAbertura5 : 0.0;
   var presAbertura2 = req.body.presAbertura4 !== "" ? req.body.presAbertura4 : 0.0;
   var presAbertura3 = req.body.presAbertura3 !== "" ? req.body.presAbertura3 : 0.0;
   var presAbertura4 = req.body.presAbertura2 !== "" ? req.body.presAbertura2 : 0.0;
   var presAbertura5 = req.body.presAbertura1 !== "" ? req.body.presAbertura1 : 0.0;
   var fluxoAbertura1 = req.body.fluxoAbertura5 !== "" ? req.body.fluxoAbertura5 : 0.0;
   var fluxoAbertura2 = req.body.fluxoAbertura4 !== "" ? req.body.fluxoAbertura4 : 0.0;
   var fluxoAbertura3 = req.body.fluxoAbertura3 !== "" ? req.body.fluxoAbertura3 : 0.0;
   var fluxoAbertura4 = req.body.fluxoAbertura2 !== "" ? req.body.fluxoAbertura2 : 0.0;
   var fluxoAbertura5 = req.body.fluxoAbertura1 !== "" ? req.body.fluxoAbertura1 : 0.0;
   var resfriamento = req.body.resfriamento !== "" ? req.body.resfriamento : 0.0;
   var tempoAbertura = req.body.tempoAbertura !== "" ? req.body.tempoAbertura : 0.0;
   var posAvanco1 = req.body.posAvanco1 !== "" ? req.body.posAvanco1 : 0.0;
   var posAvanco2 = req.body.posAvanco2 !== "" ? req.body.posAvanco2 : 0.0;
   var posAvanco3 = req.body.posAvanco3 !== "" ? req.body.posAvanco3 : 0.0;
   var posRecuo1 = req.body.posRecuo1 !== "" ? req.body.posRecuo1 : 0.0;
   var posRecuo2 = req.body.posRecuo2 !== "" ? req.body.posRecuo2 : 0.0;
   var posRecuo3 = req.body.posRecuo3 !== "" ? req.body.posRecuo3 : 0.0;
   var presAvanco1 = req.body.presAvanco1 !== "" ? req.body.presAvanco1 : 0.0;
   var presAvanco2 = req.body.presAvanco2 !== "" ? req.body.presAvanco2 : 0.0;
   var presAvanco3 = req.body.presAvanco3 !== "" ? req.body.presAvanco3 : 0.0;
   var presRecuo1 = req.body.presRecuo1 !== "" ? req.body.presRecuo1 : 0.0;
   var presRecuo2 = req.body.presRecuo2 !== "" ? req.body.presRecuo2 : 0.0;
   var presRecuo3 = req.body.presRecuo3 !== "" ? req.body.presRecuo3 : 0.0;
   var fluxoAvanco1 = req.body.fluxoAvanco1 !== "" ? req.body.fluxoAvanco1 : 0.0;
   var fluxoAvanco2 = req.body.fluxoAvanco2 !== "" ? req.body.fluxoAvanco2 : 0.0;
   var fluxoAvanco3 = req.body.fluxoAvanco3 !== "" ? req.body.fluxoAvanco3 : 0.0;
   var fluxoRecuo1 = req.body.fluxoRecuo1 !== "" ? req.body.fluxoRecuo1 : 0.0;
   var fluxoRecuo2 = req.body.fluxoRecuo2 !== "" ? req.body.fluxoRecuo2 : 0.0;
   var fluxoRecuo3 = req.body.fluxoRecuo3 !== "" ? req.body.fluxoRecuo3 : 0.0;
   var atraso = req.body.atraso !== "" ? req.body.atraso : 0.0;
   var batida = req.body.batida !== "" ? req.body.batida : 0.0;
   var radialTypeEntrada1 = req.body.type1 !== "" ? req.body.type1 : 0.0;
   var radialTypeSaida1 = req.body.type2 !== "" ? req.body.type2 : 0.0;
   var radialTypeEntrada2 = req.body.type3 !== "" ? req.body.type3 : 0.0;
   var radialTypeSaida2 = req.body.type4 !== "" ? req.body.type4 : 0.0;
   var radialPresEntrada1 = req.body.pressaoRadial1 !== "" ? req.body.pressaoRadial1 : 0.0;
   var radialPresSaida1 = req.body.pressaoRadial2 !== "" ? req.body.pressaoRadial2 : 0.0;
   var radialPresEntrada2 = req.body.pressaoRadial3 !== "" ? req.body.pressaoRadial3 : 0.0;
   var radialPresSaida2 = req.body.pressaoRadial4 !== "" ? req.body.pressaoRadial4 : 0.0;
   var radialPresEntrada3 = req.body.pressaoRadial5 !== "" ? req.body.pressaoRadial5 : 0.0;
   var radialPresSaida3 = req.body.pressaoRadial6 !== "" ? req.body.pressaoRadial6 : 0.0;
   var radialFluxoEntrada1 = req.body.fluxoRadial1 !== "" ? req.body.fluxoRadial1 : 0.0;
   var radialFluxoSaida1 = req.body.fluxoRadial2 !== "" ? req.body.fluxoRadial2 : 0.0;
   var radialFluxoEntrada2 = req.body.fluxoRadial3 !== "" ? req.body.fluxoRadial3 : 0.0;
   var radialFluxoSaida2 = req.body.fluxoRadial4 !== "" ? req.body.fluxoRadial4 : 0.0;
   var radialFluxoEntrada3 = req.body.fluxoRadial5 !== "" ? req.body.fluxoRadial5 : 0.0;
   var radialFluxoSaida3 = req.body.fluxoRadial6 !== "" ? req.body.fluxoRadial6 : 0.0;
   var radialPosEntrada1 = req.body.posRadial1 !== "" ? req.body.posRadial1 : 0.0;
   var radialPosSaida1 = req.body.posRadial2 !== "" ? req.body.posRadial2 : 0.0;
   var radialPosEntrada2 = req.body.posRadial3 !== "" ? req.body.posRadial3 : 0.0;
   var radialPosSaida2 = req.body.posRadial4 !== "" ? req.body.posRadial4 : 0.0;
   var radialPosEntrada3 = req.body.posRadial5 !== "" ? req.body.posRadial5 : 0.0;
   var radialPosSaida3 = req.body.posRadial6 !== "" ? req.body.posRadial6 : 0.0;
   var radialTempoEntrada1 = req.body.tempoRadial1 !== "" ? req.body.tempoRadial1 : 0.0;
   var radialTempoSaida1 = req.body.tempoRadial2 !== "" ? req.body.tempoRadial2 : 0.0;
   var radialTempoEntrada2 = req.body.tempoRadial3 !== "" ? req.body.tempoRadial3 : 0.0;
   var radialTempoSaida2 = req.body.tempoRadial4 !== "" ? req.body.tempoRadial4 : 0.0;
   var radialTempoEntrada3 = req.body.tempoRadial5 !== "" ? req.body.tempoRadial5 : 0.0;
   var radialTempoSaida3 = req.body.tempoRadial6 !== "" ? req.body.tempoRadial6 : 0.0;
   var radialSCREntrada1 = req.body.scrcount1 !== "" ? req.body.scrcount1 : 0.0;
   var radialSCRSaida1 = req.body.scrcount2 !== "" ? req.body.scrcount2 : 0.0;
   var radialSCREntrada2 = req.body.scrcount3 !== "" ? req.body.scrcount3 : 0.0;
   var radialSCRSaida2 = req.body.scrcount4 !== "" ? req.body.scrcount4 : 0.0;
   var radialSCREntrada3 = req.body.scrcount5 !== "" ? req.body.scrcount5 : 0.0;
   var radialSCRSaida3 = req.body.scrcount6 !== "" ? req.body.scrcount6 : 0.0;

   var camara1 = req.body.camara1 !== "" ? req.body.camara1 : 0.0;
   var camara2 = req.body.camara2 !== "" ? req.body.camara2 : 0.0;
   var camara3 = req.body.camara3 !== "" ? req.body.camara3 : 0.0;
   var camara4 = req.body.camara4 !== "" ? req.body.camara4 : 0.0;
   var camara5 = req.body.camara5 !== "" ? req.body.camara5 : 0.0;
   var camara6 = req.body.camara6 !== "" ? req.body.camara6 : 0.0;
   var camara7 = req.body.camara7 !== "" ? req.body.camara7 : 0.0;
   var camara8 = req.body.camara8 !== "" ? req.body.camara8 : 0.0;
   var camara9 = req.body.camara9 !== "" ? req.body.camara9 : 0.0;
   var camara10 = req.body.camara10 !== "" ? req.body.camara10 : 0.0;
   var camara11 = req.body.camara11 !== "" ? req.body.camara11 : 0.0;
   var camara12 = req.body.camara12 !== "" ? req.body.camara12 : 0.0;
   var camara13 = req.body.camara13 !== "" ? req.body.camara13 : 0.0;
   var camara14 = req.body.camara14 !== "" ? req.body.camara14 : 0.0;
   var camara15 = req.body.camara15 !== "" ? req.body.camara15 : 0.0;
   var camara16 = req.body.camara16 !== "" ? req.body.camara16 : 0.0;
   var camara17 = req.body.camara17 !== "" ? req.body.camara17 : 0.0;
   var camara18 = req.body.camara18 !== "" ? req.body.camara18 : 0.0;
   var camara19 = req.body.camara19 !== "" ? req.body.camara19 : 0.0;
   var camara20 = req.body.camara20 !== "" ? req.body.camara20 : 0.0;
   var camara21 = req.body.camara21 !== "" ? req.body.camara21 : 0.0;
   var camara22 = req.body.camara22 !== "" ? req.body.camara22 : 0.0;
   var camara23 = req.body.camara23 !== "" ? req.body.camara23 : 0.0;
   var camara24 = req.body.camara24 !== "" ? req.body.camara24 : 0.0;
   var camara25 = req.body.camara25 !== "" ? req.body.camara25 : 0.0;
   var camara26 = req.body.camara26 !== "" ? req.body.camara26 : 0.0;
   var camara27 = req.body.camara27 !== "" ? req.body.camara27 : 0.0;
   var camara28 = req.body.camara28 !== "" ? req.body.camara28 : 0.0;
   var camara29 = req.body.camara29 !== "" ? req.body.camara29 : 0.0;
   var camara30 = req.body.camara30 !== "" ? req.body.camara30 : 0.0;
   var camara31 = req.body.camara31 !== "" ? req.body.camara31 : 0.0;
   var camara32 = req.body.camara32 !== "" ? req.body.camara32 : 0.0;
   var camara33 = req.body.camara33 !== "" ? req.body.camara33 : 0.0;
   var camara34 = req.body.camara34 !== "" ? req.body.camara34 : 0.0;
   var camara35 = req.body.camara35 !== "" ? req.body.camara35 : 0.0;
   var camara36 = req.body.camara36 !== "" ? req.body.camara36 : 0.0;
   var camara37 = req.body.camara37 !== "" ? req.body.camara37 : 0.0;
   var camara38 = req.body.camara38 !== "" ? req.body.camara38 : 0.0;
   var camara39 = req.body.camara39 !== "" ? req.body.camara39 : 0.0;
   var camara40 = req.body.camara40 !== "" ? req.body.camara40 : 0.0;
   var camara41 = req.body.camara41 !== "" ? req.body.camara41 : 0.0;
   var camara42 = req.body.camara42 !== "" ? req.body.camara42 : 0.0;
   var camara43 = req.body.camara43 !== "" ? req.body.camara43 : 0.0;
   var camara44 = req.body.camara44 !== "" ? req.body.camara44 : 0.0;
   var camara45 = req.body.camara45 !== "" ? req.body.camara45 : 0.0;
   var camara46 = req.body.camara46 !== "" ? req.body.camara46 : 0.0;
   var camara47 = req.body.camara47 !== "" ? req.body.camara47 : 0.0;
   var camara48 = req.body.camara48 !== "" ? req.body.camara48 : 0.0;
   var camara49 = req.body.camara49 !== "" ? req.body.camara49 : 0.0;
   var camara50 = req.body.camara50 !== "" ? req.body.camara50 : 0.0;
   var camara51 = req.body.camara51 !== "" ? req.body.camara51 : 0.0;
   var camara52 = req.body.camara52 !== "" ? req.body.camara52 : 0.0;
   var camara53 = req.body.camara53 !== "" ? req.body.camara53 : 0.0;
   var camara54 = req.body.camara54 !== "" ? req.body.camara54 : 0.0;
   var camara55 = req.body.camara55 !== "" ? req.body.camara55 : 0.0;
   var camara56 = req.body.camara56 !== "" ? req.body.camara56 : 0.0;
   var camara57 = req.body.camara57 !== "" ? req.body.camara57 : 0.0;
   var camara58 = req.body.camara58 !== "" ? req.body.camara58 : 0.0;
   var camara59 = req.body.camara59 !== "" ? req.body.camara59 : 0.0;
   var camara60 = req.body.camara60 !== "" ? req.body.camara60 : 0.0;
   var camara61 = req.body.camara61 !== "" ? req.body.camara61 : 0.0;
   var camara62 = req.body.camara62 !== "" ? req.body.camara62 : 0.0;
   var camara63 = req.body.camara63 !== "" ? req.body.camara63 : 0.0;
   var camara64 = req.body.camara64 !== "" ? req.body.camara64 : 0.0;
   var camara65 = req.body.camara65 !== "" ? req.body.camara65 : 0.0;
   var camara66 = req.body.camara66 !== "" ? req.body.camara66 : 0.0;
   var camara67 = req.body.camara67 !== "" ? req.body.camara67 : 0.0;
   var camara68 = req.body.camara68 !== "" ? req.body.camara68 : 0.0;
   var camara69 = req.body.camara69 !== "" ? req.body.camara69 : 0.0;
   var camara70 = req.body.camara70 !== "" ? req.body.camara70 : 0.0;
   var camara71 = req.body.camara71 !== "" ? req.body.camara71 : 0.0;
   var camara72 = req.body.camara72 !== "" ? req.body.camara72 : 0.0;
   var camara73 = req.body.camara73 !== "" ? req.body.camara73 : 0.0;
   var camara74 = req.body.camara74 !== "" ? req.body.camara74 : 0.0;
   var camara75 = req.body.camara75 !== "" ? req.body.camara75 : 0.0;
   var camara76 = req.body.camara76 !== "" ? req.body.camara76 : 0.0;
   var camara77 = req.body.camara77 !== "" ? req.body.camara77 : 0.0;
   var camara78 = req.body.camara78 !== "" ? req.body.camara78 : 0.0;
   var camara79 = req.body.camara79 !== "" ? req.body.camara79 : 0.0;
   var camara80 = req.body.camara80 !== "" ? req.body.camara80 : 0.0;
   var camara81 = req.body.camara81 !== "" ? req.body.camara81 : 0.0;
   var camara82 = req.body.camara82 !== "" ? req.body.camara82 : 0.0;
   var camara83 = req.body.camara83 !== "" ? req.body.camara83 : 0.0;
   var camara84 = req.body.camara84 !== "" ? req.body.camara84 : 0.0;
   var camara85 = req.body.camara85 !== "" ? req.body.camara85 : 0.0;
   var camara86 = req.body.camara86 !== "" ? req.body.camara86 : 0.0;
   var camara87 = req.body.camara87 !== "" ? req.body.camara87 : 0.0;
   var camara88 = req.body.camara88 !== "" ? req.body.camara88 : 0.0;
   var camara89 = req.body.camara89 !== "" ? req.body.camara89 : 0.0;
   var camara90 = req.body.camara90 !== "" ? req.body.camara90 : 0.0;
   var camara91 = req.body.camara91 !== "" ? req.body.camara91 : 0.0;
   var camara92 = req.body.camara92 !== "" ? req.body.camara92 : 0.0;
   var camara93 = req.body.camara93 !== "" ? req.body.camara93 : 0.0;
   var camara94 = req.body.camara94 !== "" ? req.body.camara94 : 0.0;
   var camara95 = req.body.camara95 !== "" ? req.body.camara95 : 0.0;
   var camara96 = req.body.camara96 !== "" ? req.body.camara96 : 0.0;
   var camara97 = req.body.camara97 !== "" ? req.body.camara97 : 0.0;
   var camara98 = req.body.camara98 !== "" ? req.body.camara98 : 0.0;
   var camara99 = req.body.camara99 !== "" ? req.body.camara99 : 0.0;
   var camara100 = req.body.camara100 !== "" ? req.body.camara100 : 0.0;
   var camara101 = req.body.camara101 !== "" ? req.body.camara101 : 0.0;
   var camara102 = req.body.camara102 !== "" ? req.body.camara102 : 0.0;
   var camara103 = req.body.camara103 !== "" ? req.body.camara103 : 0.0;
   var camara104 = req.body.camara104 !== "" ? req.body.camara104 : 0.0;
   var camara105 = req.body.camara105 !== "" ? req.body.camara105 : 0.0;
   var camara106 = req.body.camara106 !== "" ? req.body.camara106 : 0.0;
   var camara107 = req.body.camara107 !== "" ? req.body.camara107 : 0.0;
   var camara108 = req.body.camara108 !== "" ? req.body.camara108 : 0.0;
   var camara109 = req.body.camara109 !== "" ? req.body.camara109 : 0.0;
   var camara110 = req.body.camara110 !== "" ? req.body.camara110 : 0.0;
   var camara111 = req.body.camara111 !== "" ? req.body.camara111 : 0.0;
   var camara112 = req.body.camara112 !== "" ? req.body.camara112 : 0.0;
   var camara113 = req.body.camara113 !== "" ? req.body.camara113 : 0.0;
   var camara114 = req.body.camara114 !== "" ? req.body.camara114 : 0.0;
   var camara115 = req.body.camara115 !== "" ? req.body.camara115 : 0.0;
   var camara116 = req.body.camara116 !== "" ? req.body.camara116 : 0.0;
   var camara117 = req.body.camara117 !== "" ? req.body.camara117 : 0.0;
   var camara118 = req.body.camara118 !== "" ? req.body.camara118 : 0.0;
   var camara119 = req.body.camara119 !== "" ? req.body.camara119 : 0.0;
   var camara120 = req.body.camara120 !== "" ? req.body.camara120 : 0.0;
   var camara121 = req.body.camara121 !== "" ? req.body.camara121 : 0.0;
   var camara122 = req.body.camara122 !== "" ? req.body.camara122 : 0.0;
   var camara123 = req.body.camara123 !== "" ? req.body.camara123 : 0.0;
   var camara124 = req.body.camara124 !== "" ? req.body.camara124 : 0.0;
   var camara125 = req.body.camara125 !== "" ? req.body.camara125 : 0.0;
   var camara126 = req.body.camara126 !== "" ? req.body.camara126 : 0.0;
   var camara127 = req.body.camara127 !== "" ? req.body.camara127 : 0.0;
   var camara128 = req.body.camara128 !== "" ? req.body.camara128 : 0.0;
   var camara129 = req.body.camara129 !== "" ? req.body.camara129 : 0.0;
   var camara130 = req.body.camara130 !== "" ? req.body.camara130 : 0.0;
   var termoparK1 = req.body.termoparK1 !== "" ? req.body.termoparK1 : 0.0;
   var termoparJ = req.body.termoparJ !== "" ? req.body.termoparJ : 0.0;
   var termoparK2 = req.body.termoparK2 !== "" ? req.body.termoparK2 : 0.0;
   var valve1 = req.body.VG1[0] !== "" ? req.body.VG1[0] : 0.0;
   var valve2 = req.body.VG1[1] !== "" ? req.body.VG1[1] : 0.0;
   var valve3 = req.body.VG1[2] !== "" ? req.body.VG1[2] : 0.0;
   var valve4 = req.body.VG1[3] !== "" ? req.body.VG1[3] : 0.0;
   var valve5 = req.body.VG1[4] !== "" ? req.body.VG1[4] : 0.0;
   var valve6 = req.body.VG1[5] !== "" ? req.body.VG1[5] : 0.0;
   var valve7 = req.body.VG1[6] !== "" ? req.body.VG1[6] : 0.0;
   var valve8 = req.body.VG1[7] !== "" ? req.body.VG1[7] : 0.0;
   var valve9 = req.body.VG1[8] !== "" ? req.body.VG1[8] : 0.0;
   var valve10 = req.body.VG1[9] !== "" ? req.body.VG1[9] : 0.0;
   var valve11 = req.body.VG1[10] !== "" ? req.body.VG1[10] : 0.0;
   var valve12 = req.body.VG1[11] !== "" ? req.body.VG1[11] : 0.0;
   var valve13 = req.body.VG1[12] !== "" ? req.body.VG1[12] : 0.0;
   var valve14 = req.body.VG1[13] !== "" ? req.body.VG1[13] : 0.0;
   var valve15 = req.body.VG1[14] !== "" ? req.body.VG1[14] : 0.0;
   var valve16 = req.body.VG1[15] !== "" ? req.body.VG1[15] : 0.0;
   var valve17 = req.body.VG1[16] !== "" ? req.body.VG1[16] : 0.0;
   var valve18 = req.body.VG1[17] !== "" ? req.body.VG1[17] : 0.0;
   var valve19 = req.body.VG1[18] !== "" ? req.body.VG1[18] : 0.0;
   var valve20 = req.body.VG1[19] !== "" ? req.body.VG1[19] : 0.0;
   var valve21 = req.body.VG1[20] !== "" ? req.body.VG1[20] : 0.0;
   var valve22 = req.body.VG1[21] !== "" ? req.body.VG1[21] : 0.0;
   var valve23 = req.body.VG1[22] !== "" ? req.body.VG1[22] : 0.0;
   var valve24 = req.body.VG1[23] !== "" ? req.body.VG1[23] : 0.0;
   var valve25 = req.body.VG1[24] !== "" ? req.body.VG1[24] : 0.0;
   var valve26 = req.body.VG1[25] !== "" ? req.body.VG1[25] : 0.0;
   var valve27 = req.body.VG1[26] !== "" ? req.body.VG1[26] : 0.0;
   var valve28 = req.body.VG1[27] !== "" ? req.body.VG1[27] : 0.0;
   var valve29 = req.body.VG1[28] !== "" ? req.body.VG1[28] : 0.0;
   var valve30 = req.body.VG1[29] !== "" ? req.body.VG1[29] : 0.0;
   var valve31 = req.body.VG1[30] !== "" ? req.body.VG1[30] : 0.0;
   var valve32 = req.body.VG1[31] !== "" ? req.body.VG1[31] : 0.0;
   var valve33 = req.body.VG1[32] !== "" ? req.body.VG1[32] : 0.0;
   var valve34 = req.body.VG1[33] !== "" ? req.body.VG1[33] : 0.0;
   var valve35 = req.body.VG1[34] !== "" ? req.body.VG1[34] : 0.0;
   var valve36 = req.body.VG1[35] !== "" ? req.body.VG1[35] : 0.0;
   var valve37 = req.body.VG1[36] !== "" ? req.body.VG1[36] : 0.0;
   var valve38 = req.body.VG1[37] !== "" ? req.body.VG1[37] : 0.0;
   var valve39 = req.body.VG1[38] !== "" ? req.body.VG1[38] : 0.0;
   var valve40 = req.body.VG1[39] !== "" ? req.body.VG1[39] : 0.0;
   var valve41 = req.body.VG1[40] !== "" ? req.body.VG1[40] : 0.0;
   var valve42 = req.body.VG1[41] !== "" ? req.body.VG1[41] : 0.0;
   var valve43 = req.body.VG1[42] !== "" ? req.body.VG1[42] : 0.0;
   var valve44 = req.body.VG1[43] !== "" ? req.body.VG1[43] : 0.0;
   var valve45 = req.body.VG1[44] !== "" ? req.body.VG1[44] : 0.0;
   var valve46 = req.body.VG1[45] !== "" ? req.body.VG1[45] : 0.0;
   var valve47 = req.body.VG1[46] !== "" ? req.body.VG1[46] : 0.0;
   var valve48 = req.body.VG1[47] !== "" ? req.body.VG1[47] : 0.0;
   var valve49 = req.body.VG1[48] !== "" ? req.body.VG1[48] : 0.0;
   var valve50 = req.body.VG1[49] !== "" ? req.body.VG1[49] : 0.0;
   var valve51 = req.body.VG1[50] !== "" ? req.body.VG1[50] : 0.0;
   var valve52 = req.body.VG1[51] !== "" ? req.body.VG1[51] : 0.0;
   var valve53 = req.body.VG1[52] !== "" ? req.body.VG1[52] : 0.0;
   var valve54 = req.body.VG1[53] !== "" ? req.body.VG1[53] : 0.0;
   var valve55 = req.body.VG1[54] !== "" ? req.body.VG1[54] : 0.0;
   var valve56 = req.body.VG1[55] !== "" ? req.body.VG1[55] : 0.0;
   var valve57 = req.body.VG1[56] !== "" ? req.body.VG1[56] : 0.0;
   var valve58 = req.body.VG1[57] !== "" ? req.body.VG1[57] : 0.0;
   var valve59 = req.body.VG1[58] !== "" ? req.body.VG1[58] : 0.0;
   var valve60 = req.body.VG1[59] !== "" ? req.body.VG1[59] : 0.0;
   var valve61 = req.body.VG1[60] !== "" ? req.body.VG1[60] : 0.0;
   var valve62 = req.body.VG1[61] !== "" ? req.body.VG1[61] : 0.0;
   var valve63 = req.body.VG1[62] !== "" ? req.body.VG1[62] : 0.0;
   var valve64 = req.body.VG1[63] !== "" ? req.body.VG1[63] : 0.0;
   var valve65 = req.body.VG1[64] !== "" ? req.body.VG1[64] : 0.0;
   var valve66 = req.body.VG1[65] !== "" ? req.body.VG1[65] : 0.0;
   var valve67 = req.body.VG1[66] !== "" ? req.body.VG1[66] : 0.0;
   var valve68 = req.body.VG1[67] !== "" ? req.body.VG1[67] : 0.0;
   var valve69 = req.body.VG1[68] !== "" ? req.body.VG1[68] : 0.0;
   var valve70 = req.body.VG1[69] !== "" ? req.body.VG1[69] : 0.0;
   var valve71 = req.body.VG1[70] !== "" ? req.body.VG1[70] : 0.0;
   var valve72 = req.body.VG1[71] !== "" ? req.body.VG1[71] : 0.0;
   var valve73 = req.body.VG1[72] !== "" ? req.body.VG1[72] : 0.0;
   var valve74 = req.body.VG1[73] !== "" ? req.body.VG1[73] : 0.0;
   var valve75 = req.body.VG1[74] !== "" ? req.body.VG1[74] : 0.0;
   var valve76 = req.body.VG1[75] !== "" ? req.body.VG1[75] : 0.0;
   var valve77 = req.body.VG1[76] !== "" ? req.body.VG1[76] : 0.0;
   var valve78 = req.body.VG1[77] !== "" ? req.body.VG1[77] : 0.0;
   var valve79 = req.body.VG1[78] !== "" ? req.body.VG1[78] : 0.0;
   var valve80 = req.body.VG1[79] !== "" ? req.body.VG1[79] : 0.0;
   var valve81 = req.body.VG1[80] !== "" ? req.body.VG1[80] : 0.0;
   var valve82 = req.body.VG1[81] !== "" ? req.body.VG1[81] : 0.0;
   var valve83 = req.body.VG1[82] !== "" ? req.body.VG1[82] : 0.0;
   var valve84 = req.body.VG1[83] !== "" ? req.body.VG1[83] : 0.0;
   var valve85 = req.body.VG1[84] !== "" ? req.body.VG1[84] : 0.0;
   var valve86 = req.body.VG1[85] !== "" ? req.body.VG1[85] : 0.0;
   var valve87 = req.body.VG1[86] !== "" ? req.body.VG1[86] : 0.0;
   var valve88 = req.body.VG1[87] !== "" ? req.body.VG1[87] : 0.0;
   var valve89 = req.body.VG1[88] !== "" ? req.body.VG1[88] : 0.0;
   var valve90 = req.body.VG1[89] !== "" ? req.body.VG1[89] : 0.0;
   var valve91 = req.body.VG2[0] !== "" ? req.body.VG2[0] : 0.0;
   var valve92 = req.body.VG2[1] !== "" ? req.body.VG2[1] : 0.0;
   var valve93 = req.body.VG2[2] !== "" ? req.body.VG2[2] : 0.0;
   var valve94 = req.body.VG2[3] !== "" ? req.body.VG2[3] : 0.0;
   var valve95 = req.body.VG2[4] !== "" ? req.body.VG2[4] : 0.0;
   var valve96 = req.body.VG2[5] !== "" ? req.body.VG2[5] : 0.0;
   var valve97 = req.body.VG2[6] !== "" ? req.body.VG2[6] : 0.0;
   var valve98 = req.body.VG2[7] !== "" ? req.body.VG2[7] : 0.0;
   var valve99 = req.body.VG2[8] !== "" ? req.body.VG2[8] : 0.0;
   var valve100 = req.body.VG2[9] !== "" ? req.body.VG2[9] : 0.0;
   var valve101 = req.body.VG2[10] !== "" ? req.body.VG2[10] : 0.0;
   var valve102 = req.body.VG2[11] !== "" ? req.body.VG2[11] : 0.0;
   var valve103 = req.body.VG2[12] !== "" ? req.body.VG2[12] : 0.0;
   var valve104 = req.body.VG2[13] !== "" ? req.body.VG2[13] : 0.0;
   var valve105 = req.body.VG2[14] !== "" ? req.body.VG2[14] : 0.0;
   var valve106 = req.body.VG2[15] !== "" ? req.body.VG2[15] : 0.0;
   var valve107 = req.body.VG2[16] !== "" ? req.body.VG2[16] : 0.0;
   var valve108 = req.body.VG2[17] !== "" ? req.body.VG2[17] : 0.0;
   var valve109 = req.body.VG2[18] !== "" ? req.body.VG2[18] : 0.0;
   var valve110 = req.body.VG2[19] !== "" ? req.body.VG2[19] : 0.0;
   var valve111 = req.body.VG2[20] !== "" ? req.body.VG2[20] : 0.0;
   var valve112 = req.body.VG2[21] !== "" ? req.body.VG2[21] : 0.0;
   var valve113 = req.body.VG2[22] !== "" ? req.body.VG2[22] : 0.0;
   var valve114 = req.body.VG2[23] !== "" ? req.body.VG2[23] : 0.0;
   var valve115 = req.body.VG2[24] !== "" ? req.body.VG2[24] : 0.0;
   var valve116 = req.body.VG2[25] !== "" ? req.body.VG2[25] : 0.0;
   var valve117 = req.body.VG2[26] !== "" ? req.body.VG2[26] : 0.0;
   var valve118 = req.body.VG2[27] !== "" ? req.body.VG2[27] : 0.0;
   var valve119 = req.body.VG2[28] !== "" ? req.body.VG2[28] : 0.0;
   var valve120 = req.body.VG2[29] !== "" ? req.body.VG2[29] : 0.0;
   var valve121 = req.body.VG2[30] !== "" ? req.body.VG2[30] : 0.0;
   var valve122 = req.body.VG2[31] !== "" ? req.body.VG2[31] : 0.0;
   var valve123 = req.body.VG2[32] !== "" ? req.body.VG2[32] : 0.0;
   var valve124 = req.body.VG2[33] !== "" ? req.body.VG2[33] : 0.0;
   var valve125 = req.body.VG2[34] !== "" ? req.body.VG2[34] : 0.0;
   var valve126 = req.body.VG2[35] !== "" ? req.body.VG2[35] : 0.0;
   var valve127 = req.body.VG2[36] !== "" ? req.body.VG2[36] : 0.0;
   var valve128 = req.body.VG2[37] !== "" ? req.body.VG2[37] : 0.0;
   var valve129 = req.body.VG2[38] !== "" ? req.body.VG2[38] : 0.0;
   var valve130 = req.body.VG2[39] !== "" ? req.body.VG2[39] : 0.0;
   var valve131 = req.body.VG2[40] !== "" ? req.body.VG2[40] : 0.0;
   var valve132 = req.body.VG2[41] !== "" ? req.body.VG2[41] : 0.0;
   var valve133 = req.body.VG2[42] !== "" ? req.body.VG2[42] : 0.0;
   var valve134 = req.body.VG2[43] !== "" ? req.body.VG2[43] : 0.0;
   var valve135 = req.body.VG2[44] !== "" ? req.body.VG2[44] : 0.0;
   var valve136 = req.body.VG2[45] !== "" ? req.body.VG2[45] : 0.0;
   var valve137 = req.body.VG2[46] !== "" ? req.body.VG2[46] : 0.0;
   var valve138 = req.body.VG2[47] !== "" ? req.body.VG2[47] : 0.0;
   var valve139 = req.body.VG2[48] !== "" ? req.body.VG2[48] : 0.0;
   var valve140 = req.body.VG2[49] !== "" ? req.body.VG2[49] : 0.0;
   var valve141 = req.body.VG2[50] !== "" ? req.body.VG2[50] : 0.0;
   var valve142 = req.body.VG2[51] !== "" ? req.body.VG2[51] : 0.0;
   var valve143 = req.body.VG2[52] !== "" ? req.body.VG2[52] : 0.0;
   var valve144 = req.body.VG2[53] !== "" ? req.body.VG2[53] : 0.0;
   var valve145 = req.body.VG2[54] !== "" ? req.body.VG2[54] : 0.0;
   var valve146 = req.body.VG2[55] !== "" ? req.body.VG2[55] : 0.0;
   var valve147 = req.body.VG2[56] !== "" ? req.body.VG2[56] : 0.0;
   var valve148 = req.body.VG2[57] !== "" ? req.body.VG2[57] : 0.0;
   var valve149 = req.body.VG2[58] !== "" ? req.body.VG2[58] : 0.0;
   var valve150 = req.body.VG2[59] !== "" ? req.body.VG2[59] : 0.0;
   var valve151 = req.body.VG2[60] !== "" ? req.body.VG2[60] : 0.0;
   var valve152 = req.body.VG2[61] !== "" ? req.body.VG2[61] : 0.0;
   var valve153 = req.body.VG2[62] !== "" ? req.body.VG2[62] : 0.0;
   var valve154 = req.body.VG2[63] !== "" ? req.body.VG2[63] : 0.0;
   var valve155 = req.body.VG2[64] !== "" ? req.body.VG2[64] : 0.0;
   var valve156 = req.body.VG2[65] !== "" ? req.body.VG2[65] : 0.0;
   var valve157 = req.body.VG2[66] !== "" ? req.body.VG2[66] : 0.0;
   var valve158 = req.body.VG2[67] !== "" ? req.body.VG2[67] : 0.0;
   var valve159 = req.body.VG2[68] !== "" ? req.body.VG2[68] : 0.0;
   var valve160 = req.body.VG2[69] !== "" ? req.body.VG2[69] : 0.0;
   var valve161 = req.body.VG2[70] !== "" ? req.body.VG2[70] : 0.0;
   var valve162 = req.body.VG2[71] !== "" ? req.body.VG2[71] : 0.0;
   var valve163 = req.body.VG2[72] !== "" ? req.body.VG2[72] : 0.0;
   var valve164 = req.body.VG2[73] !== "" ? req.body.VG2[73] : 0.0;
   var valve165 = req.body.VG2[74] !== "" ? req.body.VG2[74] : 0.0;
   var valve166 = req.body.VG2[75] !== "" ? req.body.VG2[75] : 0.0;
   var valve167 = req.body.VG2[76] !== "" ? req.body.VG2[76] : 0.0;
   var valve168 = req.body.VG2[77] !== "" ? req.body.VG2[77] : 0.0;
   var valve169 = req.body.VG2[78] !== "" ? req.body.VG2[78] : 0.0;
   var valve170 = req.body.VG2[79] !== "" ? req.body.VG2[79] : 0.0;
   var valve171 = req.body.VG2[80] !== "" ? req.body.VG2[80] : 0.0;
   var valve172 = req.body.VG2[81] !== "" ? req.body.VG2[81] : 0.0;
   var valve173 = req.body.VG2[82] !== "" ? req.body.VG2[82] : 0.0;
   var valve174 = req.body.VG2[83] !== "" ? req.body.VG2[83] : 0.0;
   var valve175 = req.body.VG2[84] !== "" ? req.body.VG2[84] : 0.0;
   var valve176 = req.body.VG2[85] !== "" ? req.body.VG2[85] : 0.0;
   var valve177 = req.body.VG2[86] !== "" ? req.body.VG2[86] : 0.0;
   var valve178 = req.body.VG2[87] !== "" ? req.body.VG2[87] : 0.0;
   var valve179 = req.body.VG2[88] !== "" ? req.body.VG2[88] : 0.0;
   var valve180 = req.body.VG2[89] !== "" ? req.body.VG2[89] : 0.0;
   var voltagem = req.body.voltagem !== "" ? req.body.voltagem : 0.0;
   var refrLadoFixo1 = req.body.rmladofixo1 !== "" ? req.body.rmladofixo1 : 0.0;
   var refrLadoFixo2 = req.body.rmladomovel1 !== "" ? req.body.rmladomovel1 : 0.0;
   var refrLadoMovel1 = req.body.rmladofixo2 !== "" ? req.body.rmladofixo2 : 0.0;
   var refrLadoMovel2 = req.body.rmladomovel2 !== "" ? req.body.rmladomovel2 : 0.0;
   var vaporLadoFixo1 = req.body.valorladofixo !== "" ? req.body.valorladofixo : 0.0;
   var vaporLadoFixo2 = req.body.valorladomovel !== "" ? req.body.valorladomovel : 0.0;
   
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
         termoparK1: termoparK1,
         termoparJ: termoparJ,
         termoparK2: termoparK2,
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
         valve91: valve91,
         valve92: valve92,
         valve93: valve93,
         valve94: valve94,
         valve95: valve95,
         valve96: valve96,
         valve97: valve97,
         valve98: valve98,
         valve99: valve99,
         valve100: valve100,
         valve101: valve101,
         valve102: valve102,
         valve103: valve103,
         valve104: valve104,
         valve105: valve105,
         valve106: valve106,
         valve107: valve107,
         valve108: valve108,
         valve109: valve109,
         valve110: valve110,
         valve111: valve111,
         valve112: valve112,
         valve113: valve113,
         valve114: valve114,
         valve115: valve115,
         valve116: valve116,
         valve117: valve117,
         valve118: valve118,
         valve119: valve119,
         valve120: valve120,
         valve121: valve121,
         valve122: valve122,
         valve123: valve123,
         valve124: valve124,
         valve125: valve125,
         valve126: valve126,
         valve127: valve127,
         valve128: valve128,
         valve129: valve129,
         valve130: valve130,
         valve131: valve131,
         valve132: valve132,
         valve133: valve133,
         valve134: valve134,
         valve135: valve135,
         valve136: valve136,
         valve137: valve137,
         valve138: valve138,
         valve139: valve139,
         valve140: valve140,
         valve141: valve141,
         valve142: valve142,
         valve143: valve143,
         valve144: valve144,
         valve145: valve145,
         valve146: valve146,
         valve147: valve147,
         valve148: valve148,
         valve149: valve149,
         valve150: valve150,
         valve151: valve151,
         valve152: valve152,
         valve153: valve153,
         valve154: valve154,
         valve155: valve155,
         valve156: valve156,
         valve157: valve157,
         valve158: valve158,
         valve159: valve159,
         valve160: valve160,
         valve161: valve161,
         valve162: valve162,
         valve163: valve163,
         valve164: valve164,
         valve165: valve165,
         valve166: valve166,
         valve167: valve167,
         valve168: valve168,
         valve169: valve169,
         valve170: valve170,
         valve171: valve171,
         valve172: valve172,
         valve173: valve173,
         valve174: valve174,
         valve175: valve175,
         valve176: valve176,
         valve177: valve177,
         valve178: valve178,
         valve179: valve179,
         valve180: valve180,
         voltagem: voltagem,
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
            termoparK1: termoparK1,
            termoparJ: termoparJ,
            termoparK2: termoparK2,
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
            valve91: valve91,
            valve92: valve92,
            valve93: valve93,
            valve94: valve94,
            valve95: valve95,
            valve96: valve96,
            valve97: valve97,
            valve98: valve98,
            valve99: valve99,
            valve100: valve100,
            valve101: valve101,
            valve102: valve102,
            valve103: valve103,
            valve104: valve104,
            valve105: valve105,
            valve106: valve106,
            valve107: valve107,
            valve108: valve108,
            valve109: valve109,
            valve110: valve110,
            valve111: valve111,
            valve112: valve112,
            valve113: valve113,
            valve114: valve114,
            valve115: valve115,
            valve116: valve116,
            valve117: valve117,
            valve118: valve118,
            valve119: valve119,
            valve120: valve120,
            valve121: valve121,
            valve122: valve122,
            valve123: valve123,
            valve124: valve124,
            valve125: valve125,
            valve126: valve126,
            valve127: valve127,
            valve128: valve128,
            valve129: valve129,
            valve130: valve130,
            valve131: valve131,
            valve132: valve132,
            valve133: valve133,
            valve134: valve134,
            valve135: valve135,
            valve136: valve136,
            valve137: valve137,
            valve138: valve138,
            valve139: valve139,
            valve140: valve140,
            valve141: valve141,
            valve142: valve142,
            valve143: valve143,
            valve144: valve144,
            valve145: valve145,
            valve146: valve146,
            valve147: valve147,
            valve148: valve148,
            valve149: valve149,
            valve150: valve150,
            valve151: valve151,
            valve152: valve152,
            valve153: valve153,
            valve154: valve154,
            valve155: valve155,
            valve156: valve156,
            valve157: valve157,
            valve158: valve158,
            valve159: valve159,
            valve160: valve160,
            valve161: valve161,
            valve162: valve162,
            valve163: valve163,
            valve164: valve164,
            valve165: valve165,
            valve166: valve166,
            valve167: valve167,
            valve168: valve168,
            valve169: valve169,
            valve170: valve170,
            valve171: valve171,
            valve172: valve172,
            valve173: valve173,
            valve174: valve174,
            valve175: valve175,
            valve176: valve176,
            valve177: valve177,
            valve178: valve178,
            valve179: valve179,
            valve180: valve180,
            voltagem: voltagem,
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

router.get("/visualizacaoEmFicha/:maquina",  (req,res) => {     
   var maquinaId= req.params.maquina;   
   var maquinas;   
   
   Maquinas.findAll().then(maquina => {
      maquinas = maquina;
   }) 

   // Maquinas.findAll().then(maquina => {
   //    maquinas = maquina;
   //    res.render("fichas/indexFicha",{
   //       maquinas: maquinas,
   //       injetor: "",
   //       perifericos: "",
   //       parametros: "",
   //       nav_maquinas : "",
   //       nav_produtos : "",
   //       nav_mp : "",
   //       nav_usuarios : "",
   //       nav_moldes : "",
   //       nav_clientes : "",
   //       nav_parametros:"",
   //       nav_ficha: "active",
   //       nav_alertas:""
   //    })
   // })   

   Maquinas.findOne({
      where: {
         id: maquinaId
      },
      include: [{
         model: Tipo,
         required: true
      }]
   }).then(maquina => {   
      console.log('maquina')
      console.log(maquina)
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
            }).then(outputParams => {
               console.log('outputParams[0]')
               console.log(outputParams[0])
               // res.send(output[0])

               Maquinas.findOne({
                  where: {
                     descricao : outputParams[0].mac
                  }
               }).then(maq => {
                  
                  RevisaoFichaTecnicaPastoreInjetores.findOne({
                     limit: 1,
                     where: {
                        maq : maq.id
                     },
                     order: [ [ 'createdAt', 'DESC' ]]
                  }).then(injetores => {
                     console.log('outputInj');
                     console.log(injetores);

                     RevisaoFichaTecnicaPastorePerifericos.findOne({
                        limit: 1,
                        where: {
                           maq : maq.id
                        },
                        order: [ [ 'createdAt', 'DESC' ]]
                     }).then(periferico => {
                        console.log('outputInj');
                        console.log(periferico);
   
                        res.render("fichas/indexFicha",{
                           maquinas: maquinas,
                           parametros: outputParams[0],
                           injetor: injetores,
                           perifericos: periferico,
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

                  }); 
                  
               }); 

            }); 
            break;
      }
   })
})

module.exports = router;
