const express = require("express");
const router = express.Router();
const Maquinas = require("../Maquinas/Maquinas");
const ParametrosAtuais = require("../Ficha/ParametrosAtuais");
const ParametrosReal = require("../ParametrosTempoReal/ParametrosReal");
const Parametros = require("../Ficha/Parametros");

router.get("/parametrosReal",  (req,res) => {

    Maquinas.findAll().then(maquina => {
       

        res.render("parametros/index",{       
            maquinas: maquina,
            tabela:"",
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"active",
            nav_ficha: ""
        })
    })    
})

router.get("/parametros/new",  (req,res) => {

    var maquinas;

    Maquinas.findAll().then(maquina => {
        maquinas = maquina;
    })


    ParametrosReal.findAll().then((fichas) => {
        res.render("parametros/new",{        
            maquinas: maquinas,    
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"active",
            nav_ficha: ""
        })
    });

    
})

router.post("/parametrosReal/create",(req,res) => {
   
    var maquina = req.body.maquinas;
    var VI1_min = req.body.VI1_min;
    var VI1_max = req.body.VI1_max;
    var VI2_min = req.body.VI2_min;
    var VI2_max = req.body.VI2_max;     
    

    ParametrosReal.create({
        maquina:maquina,
        prodShotMin:  VI1_min,
        prodShotMax: VI1_max,
        cycleTimeMin: VI2_min,
        cycleTimeMax: VI2_max,    
  
    }).then(() => {
        res.redirect("/parametrosReal");
    })
})

router.get("/parametrosCadastrados/:maquina",  (req,res) => {

    var maquinaId= req.params.maquina;      

    Maquinas.findOne({
        where: {
            id: maquinaId
         }
    }).then(maquina => {     
        
        ParametrosReal.findAll({
            limit: 11,
            where: {
              maquina: maquina.id
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(output => {

            res.send(output[0])
            
          }); 
    })   

})


router.get("/parametrosReais/:maquina",  (req,res) => {

    var maquinaId= req.params.maquina;      

    Maquinas.findOne({
        where: {
            id: maquinaId
         }
    }).then(maquina => {     
        
        ParametrosAtuais.findAll({
            limit: 10,
            where: {
              mac: maquina.mac
            }
          }).then(output => {

            res.send(output)
            
          }); 
    })   

})

module.exports = router;