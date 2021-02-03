const express = require("express");
const router = express.Router();
const Tipo = require("./Tipo");


router.post('/tipo/criar', (req,res) => {

    console.log(req.body.tipo)
    var tipo = req.body.tipo;

    Tipo.create({
        tipo:tipo
    }).then(result =>{
        res.send(result); 
    })
    .catch(erro => {
        console.log("Error de insercao de tipo " + erro);
    })

   
})

module.exports = router;
