const express = require("express");
const router = express.Router();
const Maquinas = require("../Maquinas/Maquinas");

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

module.exports = router;