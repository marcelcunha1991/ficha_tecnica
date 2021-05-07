const express = require("express");
const router = express.Router();
const Maquinas = require("./Maquinas");
const Tipo = require("../Tipo/Tipo")
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");
const LimitesFichaTecnicaToshiba = require("../Ficha/LimitesFichaTecnicaToshiba");
const FichaTecnicaPastoreInjetores = require("../Ficha/FichaPastore/FichaTecnicaPastoreInjetores");
const FichaPastorePerifericos = require("../Ficha/FichaPastore/FichaTecnicaPastorePerifericos");
const RevisaoLimitesFichaTecnicaToshiba = require("../Revisao/RevisaoLimitesFichaTecnicaToshiba");
const RevisaoFichaTecnicaPastoreInjetores = require("../Revisao/RevisaoFichaTecnicaPastoreInjetores");
const RevisaoFichaTecnicaPastorePerifericos = require("../Revisao/RevisaoFichaTecnicaPastorePerifericos");


router.get("/maquinas",  (req,res) => {


   Maquinas.findAll().then(maquinas => {
      res.render("maquinas/index",{
         maquinas:maquinas,
         nav_maquinas : "active",
         nav_produtos : "",
         nav_mp : "",
         nav_usuarios : "",
         nav_moldes : "",
         nav_clientes : "",
         nav_parametros:"",
         nav_ficha: "",
         nav_alertas:""
      })
   });

    
})

router.get("/maquinaById/:id",  (req,res) => {

   var maquinaId = req.params.id;
   
   Maquinas.findOne({
      where:{
         id:parseInt(maquinaId)
      }
   }).then(result => {
      res.send(result);
   })

    
})


router.get("/maquinas/new",  (req,res) => {

   Tipo.findAll().then(result => {

      Maquinas.findAll().then(maquinas => {
         res.render("maquinas/new",{            
               nav_maquinas : "active",
               tipos : result,
               nav_produtos : "",
               nav_mp : "",
               nav_usuarios : "",
               nav_moldes : "",
               nav_clientes : "",
               nav_parametros:"",
               nav_ficha: "",
               nav_alertas:""
         })
      });

   })

    

    
})

router.post("/maquinas/create",(req,res) => {
   var descricao = req.body.descricao;
   var codigo = req.body.codigo;
   var mac = req.body.mac;
   var peso = req.body.peso;
   var modelo = req.body.modelo;
   var tipo = req.body.tipos;
   

   Maquinas.create({
      descricao:descricao,
      codigo: codigo,
      mac:mac,
      peso:peso,
      modelo: modelo,
      tipoId:tipo
   }).then(result => {
      res.redirect("/maquinas");
   })
})


router.get("/maquinas/edit/:id",(req,res) => {

   var id = req.params.id;

   if(isNaN(id)){
      res.redirect("/maquinas")
   }

   Maquinas.findByPk(id).then(maquina => {

      if(maquina != undefined){

         res.render("maquinas/edit",{
            maquina:maquina,
            nav_maquinas : "active",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas: ""
            
         })

      }else{
         res.redirect("/maquinas");
      }

   }).catch(erro => {
      res.redirect("/maquinas");
   })  

})


router.post("/maquinas/update",(req,res) => {
    
   var descricao = req.body.descricao;
   var codigo = req.body.codigo;
   var peso = req.body.peso;
   var modelo = req.body.modelo;
   var id = req.body.id;

   Maquinas.update({
      descricao:descricao,
      codigo: codigo,
      peso:peso,
      modelo: modelo
   },{
      where:{
         id:id
      }
   }).then(() => {
      res.redirect("/maquinas")
   })
})


router.post("/maquinas/delete",(req,res) => {
   var id = req.body.id;
   if (id != undefined){

      if(!isNaN(id)){

         Maquinas.findOne({
            where: {
               id: id
            },include: [{
               model: Tipo,
               required: true
            }]
         }).then(data => {

            console.log(data.tipo.tipo)
            if (data.tipo.tipo === 'Toshiba') {

               LimitesFichaTecnicaToshiba.destroy({
                  where:{
                     maq:id
                  }
               }).then(() => {
                  RevisaoLimitesFichaTecnicaToshiba.destroy({
                     where:{
                        maq:id
                     }
                  }).then(() => {
                     Maquinas.destroy({
                        where:{
                           id:id
                        }
                     }).then(() => {
                        res.redirect("/maquinas");
                        
                     })
                  })
               })
            
            } else if (data.tipo.tipo === 'HAITIAN') {
               
               FichaTecnicaPastoreInjetores.destroy({
                  where:{
                     maq:id
                  }
               }).then(() => {
                  FichaPastorePerifericos.destroy({
                     where:{
                        maq:id
                     }
                  }).then(() => {
                     RevisaoFichaTecnicaPastoreInjetores.destroy({
                        where:{
                           maq:id
                        }
                     })
                     RevisaoFichaTecnicaPastorePerifericos.destroy({
                        where:{
                           maq:id
                        }
                     }).then(() => {
                        Maquinas.destroy({
                           where:{
                              id:id
                           }
                        }).then(() => {
                           res.redirect("/maquinas");
                           
                        })
                     })
                  })
               })

            }
         
         })

      }else{
         res.redirect("/maquinas");
      }
   }else{
      res.redirect("/maquinas");
   }
})


router.get("/listaMaquinas",(req,res) => {

   Maquinas.findAll().then(maquinas => {
      res.json({maquinas: maquinas})
   })

})


module.exports = router;
