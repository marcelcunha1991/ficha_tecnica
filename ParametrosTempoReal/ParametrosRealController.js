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
    var VI3_min = req.body.VI3_min;
    var VI3_max = req.body.VI3_max;    
    var ok_prodShotMin = req.body.ok_prodShot_min;
    var ok_prodShotMax = req.body.ok_prodShot_min;
    var printShotMin = req.body.printShotMin_min;
    var printShotMax = req.body.printShotMin_max;
    var fillingTimeMin = req.body.fillingTime_min;
    var fillingTimeMax = req.body.fillingTime_max;
    var chargingTimeMin = req.body.chargingTime_min;
    var chargingTimeMax = req.body.chargingTime_max;
    var takeoutTimeMin = req.body.takeoutTime_min;
    var takeoutTimeMax = req.body.takeoutTime_max;
    var dwellChnagePositionMin = req.body.dwellChnagePosition_min;
    var dwellChnagePositionMax = req.body.dwellChnagePosition_max;
    var minumumCushionPositionMin = req.body.minumumCushionPosition_min;
    var minumumCushionPositionMax = req.body.minumumCushionPosition_max;
    var cushionPositionMin = req.body.cushionPosition_min;
    var cushionPositionMax = req.body.cushionPosition_max;
    var injetStartPositionMin = req.body.injetStartPosition_min;
    var injetStartPositionMax = req.body.injetStartPosition_max;
    var maxInjectPressureMin = req.body.maxInjectPressure_min;
    var maxInjectPressureMax = req.body.maxInjectPressure_max;
    var crewRotationSpeedMin = req.body.crewRotationSpeed_min;
    var crewRotationSpeedMax = req.body.crewRotationSpeed_max;

    ParametrosReal.create({
        maquina:maquina,
        prodShotMin:  VI1_min,
        prodShotMax: VI1_max,
        cycleTimeMin: VI2_min,
        cycleTimeMax: VI2_max,    
        dwellPressureMin: VI3_min,
        dwellPressureMax: VI3_max,
        ok_prodShotMin : ok_prodShotMin,
        ok_prodShotMax : ok_prodShotMax,
        printShotMin : printShotMin,
        printShotMax : printShotMax,
        fillingTimeMin : fillingTimeMin,
        fillingTimeMax : fillingTimeMax,
        chargingTimeMin : chargingTimeMin,
        chargingTimeMax : chargingTimeMax,
        takeoutTimeMin : takeoutTimeMin,
        takeoutTimeMax : takeoutTimeMax,
        dwellChnagePositionMin : dwellChnagePositionMin,
        dwellChnagePositionMax : dwellChnagePositionMax,
        minumumCushionPositionMin : minumumCushionPositionMin,
        minumumCushionPositionMax : minumumCushionPositionMax,
        cushionPositionMin : cushionPositionMin,
        cushionPositionMax : cushionPositionMax,
        injetStartPositionMin : injetStartPositionMin,
        injetStartPositionMax : injetStartPositionMax,
        maxInjectPressureMin : maxInjectPressureMin,
        maxInjectPressureMax : maxInjectPressureMax,
        crewRotationSpeedMin : crewRotationSpeedMin,
        crewRotationSpeedMax : crewRotationSpeedMax   


  
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
            limit: 30,
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
            limit: 30,
            where: {
              mac: maquina.mac
            }
          }).then(output => {

            res.send(output)
            
          }); 
    })   

})

module.exports = router;