const express = require("express");
const router = express.Router();
const RevisaoFicha = require("../RevisaoFicha/RevisaoFicha");

router.get("/revisaoFicha/visualizacao/:id",(req,res) => {
   var id = req.params.id;

   RevisaoFicha.findAll({
        where: {
            revisao: id
        }
    }).then(revisao => {
        res.render("revisaoFicha/visualizacao", {
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

module.exports = router;