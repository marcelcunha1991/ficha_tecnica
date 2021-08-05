const express = require("express");
const router = express.Router();
const Maquinas = require("../Maquinas/Maquinas");
const Tipo = require("../Tipo/Tipo");
const ParametrosReaisToshiba = require("../ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("../ParametrosTempoReal/ParametrosReaisAutomata");
const ParametrosReaishaitianJupyter = require("../ParametrosTempoReal/ParametrosReaisHaitianJupyter");

router.get("/externo/fichas/:maquina?",  (req,res) => {     
   var maquinas;
   var maquinaId = req.params.maquina;

   var dsMaquina = "",
   dsMaquina = req.params.maquina;

   Maquinas.findAll().then(maquina => {
      maquinas = maquina;

      res.render("acesso_vf_web/index", {
         dsMaquina : dsMaquina,
         maquinas: maquinas,
         maquinaId: maquinaId,
         tabela:"",
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

router.get("/externo/vf-web/maquinaById/:id",  (req,res) => {
   var maquinaId = req.params.id;
   
   Maquinas.findOne({
      where:{
         codigo:maquinaId
      }
   }).then(result => {
      if (result === null || result === "null") {
         var error = {'error': -1}
         res.send(error)
      } else {
         res.send(result);
      }

   })

    
})

router.get("/externo/vf-web/fichasUltimo/maquina/:id/:date?",  (req,res) => {
   
   var maquinaId= req.params.id;      
   var dataEscolhida = req.params.date;     

   Maquinas.findOne({
      where: {
         codigo:maquinaId
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
                  mac: maquina.descricao,
                  DATA: dataEscolhida
               },
               order: [ [ 'createdAt', 'DESC' ]]
            }).then(output => {
      
               res.send(output[0])
               
            }); 
            break;

               
      }


      
   })      

})

router.get("/externo/parametrosReais/:maquina/:date?",  (req,res) => {

   var maquinaId = req.params.maquina;    
   var dataEscolhida = req.params.date;  

   Maquinas.findOne({
      where: {
         codigo:maquinaId
      }
   }).then(maquina => {     

      console.log(maquina.tipoId);

      if(maquina.tipoId == 1){
         ParametrosReaisToshiba.findAll({
            limit: 30,
            where: {
               mac: maquina.mac
            }
         }).then(output => {

            res.send(output)
            
         }); 
      }else if(maquina.tipoId == 2){
         ParametrosReaisAutomata.findAll({
            limit: 30,
            where: {
               mac: maquina.mac
            }
         }).then(output => {

            res.send(output)
            
         }); 
      }else if(maquina.tipoId == 3){
         ParametrosReaishaitianJupyter.findAll({
            limit: 30,
            where: {
               mac: maquina.mac,
               DATA: dataEscolhida
            },
            order: [ [ 'createdAt', 'DESC' ]]
         }).then(output => {

            res.send(output)
            
         }); 
      }
       
   })   

})

module.exports = router;