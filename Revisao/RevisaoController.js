const express = require("express");
const router = express.Router();
const RevisaoLimitesFichaTecnicaToshiba = require("../Revisao/RevisaoLimitesFichaTecnicaToshiba");
const RevisaoFichaTecnicaPastoreInjetores = require("../Revisao/RevisaoFichaTecnicaPastoreInjetores");
const RevisaoFichaTecnicaPastorePerifericos = require("../Revisao/RevisaoFichaTecnicaPastorePerifericos");

router.get("/ficha/revisao/visualizacao/:id",(req,res) => {
   var Id = req.params.id;

   RevisaoLimitesFichaTecnicaToshiba.findAll({
      where: {
         revisao: Id
      }
   }).then(revisao => {
      res.render("revisao/visualization", {
         revisoes: revisao[0],
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

router.get("/revisao/visualizacao/:id",(req,res) => {
   var Id = req.params.id;

   RevisaoFichaTecnicaPastoreInjetores.findAll({
      where: {
         revisao: Id
      }
   }).then(injetor => {
      RevisaoFichaTecnicaPastorePerifericos.findAll({
         where: {
            revisao: Id
         }
      }).then(periferico => {
         res.render("revisao/visualizationHaitian", {
            injetor: injetor[0],
            perifericos: periferico[0],
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

router.get("/get/revisao/:id",(req,res) => {
   var Id = req.params.id;
      
   RevisaoFichaTecnicaPastorePerifericos.findAll({
      where: {
         revisao: Id
      }
   }).then(periferico => {
      res.send(periferico[0])
   })

})

router.get("/idRevisaoHaitian/:idFicha", (req, res) => {
   var id = req.params.idFicha;

   RevisaoFichaTecnicaPastoreInjetores.findOne({
      where: {
         idFichaTecnica:id
      },
      order: [[ 'createdAt', 'DESC' ]]
   }).then(revisao => {
      res.send(revisao)
   })
})

module.exports = router;