const express = require("express");
const router = express.Router();
const Maquinas = require("../Maquinas/Maquinas");
const ParametrosAtuais = require("../Ficha/ParametrosAtuais");
const ParametrosReal = require("../ParametrosTempoReal/ParametrosReal");
const Parametros = require("../Ficha/Parametros");
const RevisaoParametros = require("../RevisaoParametros/RevisaoParametros");

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
    var VI1_min = req.body.VI1_min !== "" ? req.body.VI1_min : 0.0;
    var VI1_max = req.body.VI1_max !== "" ? req.body.VI1_max : 0.0;
    var VI2_min = req.body.VI2_min !== "" ? req.body.VI2_min : 0.0;
    var VI2_max = req.body.VI2_max !== "" ? req.body.VI2_max : 0.0;     
    var VI3_min = req.body.VI3_min !== "" ? req.body.VI3_min : 0.0;
    var VI3_max = req.body.VI3_max !== "" ? req.body.VI3_max : 0.0;    
    var ok_prodShotMin = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var ok_prodShotMax = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var printShotMin = req.body.printShotMin_min !== "" ? req.body.printShotMin_min : 0.0;
    var printShotMax = req.body.printShotMin_max !== "" ? req.body.printShotMin_max : 0.0;
    var fillingTimeMin = req.body.fillingTime_min !== "" ? req.body.fillingTime_min : 0.0;
    var fillingTimeMax = req.body.fillingTime_max !== "" ? req.body.fillingTime_max : 0.0;
    var chargingTimeMin = req.body.chargingTime_min !== "" ? req.body.chargingTime_min : 0.0;
    var chargingTimeMax = req.body.chargingTime_max !== "" ? req.body.chargingTime_max : 0.0;
    var takeoutTimeMin = req.body.takeoutTime_min !== "" ? req.body.takeoutTime_min : 0.0;
    var takeoutTimeMax = req.body.takeoutTime_max !== "" ? req.body.takeoutTime_max : 0.0;
    var dwellChnagePositionMin = req.body.dwellChnagePosition_min !== "" ? req.body.dwellChnagePosition_min : 0.0;
    var dwellChnagePositionMax = req.body.dwellChnagePosition_max !== "" ? req.body.dwellChnagePosition_max : 0.0;
    var minumumCushionPositionMin = req.body.minumumCushionPosition_min !== "" ? req.body.minumumCushionPosition_min : 0.0;
    var minumumCushionPositionMax = req.body.minumumCushionPosition_max !== "" ? req.body.minumumCushionPosition_max : 0.0;
    var cushionPositionMin = req.body.cushionPosition_min !== "" ? req.body.cushionPosition_min : 0.0;
    var cushionPositionMax = req.body.cushionPosition_max !== "" ? req.body.cushionPosition_max : 0.0;
    var injetStartPositionMin = req.body.injetStartPosition_min !== "" ? req.body.injetStartPosition_min : 0.0;
    var injetStartPositionMax = req.body.injetStartPosition_max !== "" ? req.body.injetStartPosition_max : 0.0;
    var maxInjectPressureMin = req.body.maxInjectPressure_min !== "" ? req.body.maxInjectPressure_min : 0.0;
    var maxInjectPressureMax = req.body.maxInjectPressure_max !== "" ? req.body.maxInjectPressure_max : 0.0;
    var crewRotationSpeedMin = req.body.crewRotationSpeed_min !== "" ? req.body.crewRotationSpeed_min : 0.0;
    var crewRotationSpeedMax = req.body.crewRotationSpeed_max !== "" ? req.body.crewRotationSpeed_max : 0.0;

    var temperature_hen_min = req.body.temperature_hen_min !== "" ? req.body.temperature_hen_min : 0.0;
    var temperature_hen_max = req.body.temperature_hen_max !== "" ? req.body.temperature_hen_max : 0.0;
    var temperature_hn_min = req.body.temperature_hn_min !== "" ? req.body.temperature_hn_min : 0.0;
    var temperature_hn_max = req.body.temperature_hn_max !== "" ? req.body.temperature_hn_max : 0.0;
    var temperature_h1_min = req.body.temperature_h1_min !== "" ? req.body.temperature_h1_min : 0.0;
    var temperature_h1_max = req.body.temperature_h1_max !== "" ? req.body.temperature_h1_max : 0.0;
    var temperature_h2_min = req.body.temperature_h2_min !== "" ? req.body.temperature_h2_min : 0.0;
    var temperature_h2_max = req.body.temperature_h2_max !== "" ? req.body.temperature_h2_max : 0.0;
    var temperature_h3_min = req.body.temperature_h3_min !== "" ? req.body.temperature_h3_min : 0.0;
    var temperature_h3_max = req.body.temperature_h3_max !== "" ? req.body.temperature_h3_max : 0.0;
    var temperature_h4_min = req.body.temperature_h4_min !== "" ? req.body.temperature_h4_min : 0.0;
    var temperature_h4_max = req.body.temperature_h4_max !== "" ? req.body.temperature_h4_max : 0.0;
    var temperature_h5_min = req.body.temperature_h5_min !== "" ? req.body.temperature_h5_min : 0.0;
    var temperature_h5_max = req.body.temperature_h5_max !== "" ? req.body.temperature_h5_max : 0.0;
    var temperature_oil_min = req.body.temperature_oil_min !== "" ? req.body.temperature_oil_min : 0.0;
    var temperature_oil_max = req.body.temperature_oil_max !== "" ? req.body.temperature_oil_max : 0.0;
    var temperature_hop_min = req.body.temperature_hop_min !== "" ? req.body.temperature_hop_min : 0.0;
    var temperature_hop_max = req.body.temperature_hop_max !== "" ? req.body.temperature_hop_max : 0.0;




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
        crewRotationSpeedMax : crewRotationSpeedMax,
        temperature_henMin : temperature_hen_min,
        temperature_henMax : temperature_hen_max,
        temperature_hnMin : temperature_hn_min,
        temperature_hnMax : temperature_hn_max,
        temperature_h1Min : temperature_h1_min,
        temperature_h1Max : temperature_h1_max,
        temperature_h2Min : temperature_h2_min,
        temperature_h2Max : temperature_h2_max,
        temperature_h3Min : temperature_h3_min,
        temperature_h3Max : temperature_h3_max,
        temperature_h4Min : temperature_h4_min,
        temperature_h4Max : temperature_h4_max,
        temperature_h5Min : temperature_h5_min,
        temperature_h5Max : temperature_h5_max,
        temperature_hopMin : temperature_hop_min,
        temperature_hopMax : temperature_hop_max,
        temperature_oilMin : temperature_oil_min,
        temperature_oilMax : temperature_oil_max



  
    }).then(data => {
        RevisaoParametros.create({
            idFichaTecnica: data.id,
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
            crewRotationSpeedMax : crewRotationSpeedMax,
            temperature_henMin : temperature_hen_min,
            temperature_henMax : temperature_hen_max,
            temperature_hnMin : temperature_hn_min,
            temperature_hnMax : temperature_hn_max,
            temperature_h1Min : temperature_h1_min,
            temperature_h1Max : temperature_h1_max,
            temperature_h2Min : temperature_h2_min,
            temperature_h2Max : temperature_h2_max,
            temperature_h3Min : temperature_h3_min,
            temperature_h3Max : temperature_h3_max,
            temperature_h4Min : temperature_h4_min,
            temperature_h4Max : temperature_h4_max,
            temperature_h5Min : temperature_h5_min,
            temperature_h5Max : temperature_h5_max,
            temperature_hopMin : temperature_hop_min,
            temperature_hopMax : temperature_hop_max,
            temperature_oilMin : temperature_oil_min,
            temperature_oilMax : temperature_oil_max
    
    
    
      
        }).then(() => {
            res.redirect("/parametrosReal");
        })
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

router.get("/parametros/lista",  (req,res) => {

    var maquinas;

    Maquinas.findAll().then(maquina => {
        maquinas = maquina;

        ParametrosReal.findAll().then((parametros) => {
            res.render("parametros/lista",{        
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
})

router.get("/lista/getParametros/:idMaquina",  (req,res) => {
    console.log('req.params.idMaquina');
    console.log(req.params.idMaquina);
    var maquinaId= req.params.idMaquina;
 
    // Maquinas.findOne({
    //     where: {
    //         id : maquinaId
    //     }
    // }).then(output => {
    //     console.log(output.id);
    ParametrosReal.findAll({
            where: {
                maquina: maquinaId
            }
        }).then(parametros => {         
    
            res.send(parametros)
            
        }); 
        
    // }); 
})

router.post("/parametros/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            ParametrosReal.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/parametros/lista");
            })

        }else{
            res.redirect("/parametros/lista");
        }
    }else{
        res.redirect("/parametros/lista");
    }
})

router.get("/parametros/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/parametrosReal")
    }

    ParametrosReal.findByPk(id).then(parametros => {

        if(parametros != undefined){

            res.render("parametros/edit",{
                parametros:parametros,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "",
                nav_parametros : "active",
                nav_ficha: ""
              
            })

        }else{
            res.redirect("/parametrosReal");
        }

    }).catch(erro => {
        res.redirect("/parametrosReal");
    })  

})

router.post("/parametros/update",(req,res) => {
    
    var id = req.body.id;
    var maquina = req.body.maquina;
    var VI1_min = req.body.VI1_min !== "" ? req.body.VI1_min : 0.0;
    var VI1_max = req.body.VI1_max !== "" ? req.body.VI1_max : 0.0;
    var VI2_min = req.body.VI2_min !== "" ? req.body.VI2_min : 0.0;
    var VI2_max = req.body.VI2_max !== "" ? req.body.VI2_max : 0.0;     
    var VI3_min = req.body.VI3_min !== "" ? req.body.VI3_min : 0.0;
    var VI3_max = req.body.VI3_max !== "" ? req.body.VI3_max : 0.0;    
    var ok_prodShotMin = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var ok_prodShotMax = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var printShotMin = req.body.printShotMin_min !== "" ? req.body.printShotMin_min : 0.0;
    var printShotMax = req.body.printShotMin_max !== "" ? req.body.printShotMin_max : 0.0;
    var fillingTimeMin = req.body.fillingTime_min !== "" ? req.body.fillingTime_min : 0.0;
    var fillingTimeMax = req.body.fillingTime_max !== "" ? req.body.fillingTime_max : 0.0;
    var chargingTimeMin = req.body.chargingTime_min !== "" ? req.body.chargingTime_min : 0.0;
    var chargingTimeMax = req.body.chargingTime_max !== "" ? req.body.chargingTime_max : 0.0;
    var takeoutTimeMin = req.body.takeoutTime_min !== "" ? req.body.takeoutTime_min : 0.0;
    var takeoutTimeMax = req.body.takeoutTime_max !== "" ? req.body.takeoutTime_max : 0.0;
    var dwellChnagePositionMin = req.body.dwellChnagePosition_min !== "" ? req.body.dwellChnagePosition_min : 0.0;
    var dwellChnagePositionMax = req.body.dwellChnagePosition_max !== "" ? req.body.dwellChnagePosition_max : 0.0;
    var minumumCushionPositionMin = req.body.minumumCushionPosition_min !== "" ? req.body.minumumCushionPosition_min : 0.0;
    var minumumCushionPositionMax = req.body.minumumCushionPosition_max !== "" ? req.body.minumumCushionPosition_max : 0.0;
    var cushionPositionMin = req.body.cushionPosition_min !== "" ? req.body.cushionPosition_min : 0.0;
    var cushionPositionMax = req.body.cushionPosition_max !== "" ? req.body.cushionPosition_max : 0.0;
    var injetStartPositionMin = req.body.injetStartPosition_min !== "" ? req.body.injetStartPosition_min : 0.0;
    var injetStartPositionMax = req.body.injetStartPosition_max !== "" ? req.body.injetStartPosition_max : 0.0;
    var maxInjectPressureMin = req.body.maxInjectPressure_min !== "" ? req.body.maxInjectPressure_min : 0.0;
    var maxInjectPressureMax = req.body.maxInjectPressure_max !== "" ? req.body.maxInjectPressure_max : 0.0;
    var crewRotationSpeedMin = req.body.crewRotationSpeed_min !== "" ? req.body.crewRotationSpeed_min : 0.0;
    var crewRotationSpeedMax = req.body.crewRotationSpeed_max !== "" ? req.body.crewRotationSpeed_max : 0.0;

    var temperature_hen_min = req.body.temperature_hen_min !== "" ? req.body.temperature_hen_min : 0.0;
    var temperature_hen_max = req.body.temperature_hen_max !== "" ? req.body.temperature_hen_max : 0.0;
    var temperature_hn_min = req.body.temperature_hn_min !== "" ? req.body.temperature_hn_min : 0.0;
    var temperature_hn_max = req.body.temperature_hn_max !== "" ? req.body.temperature_hn_max : 0.0;
    var temperature_h1_min = req.body.temperature_h1_min !== "" ? req.body.temperature_h1_min : 0.0;
    var temperature_h1_max = req.body.temperature_h1_max !== "" ? req.body.temperature_h1_max : 0.0;
    var temperature_h2_min = req.body.temperature_h2_min !== "" ? req.body.temperature_h2_min : 0.0;
    var temperature_h2_max = req.body.temperature_h2_max !== "" ? req.body.temperature_h2_max : 0.0;
    var temperature_h3_min = req.body.temperature_h3_min !== "" ? req.body.temperature_h3_min : 0.0;
    var temperature_h3_max = req.body.temperature_h3_max !== "" ? req.body.temperature_h3_max : 0.0;
    var temperature_h4_min = req.body.temperature_h4_min !== "" ? req.body.temperature_h4_min : 0.0;
    var temperature_h4_max = req.body.temperature_h4_max !== "" ? req.body.temperature_h4_max : 0.0;
    var temperature_h5_min = req.body.temperature_h5_min !== "" ? req.body.temperature_h5_min : 0.0;
    var temperature_h5_max = req.body.temperature_h5_max !== "" ? req.body.temperature_h5_max : 0.0;
    var temperature_oil_min = req.body.temperature_oil_min !== "" ? req.body.temperature_oil_min : 0.0;
    var temperature_oil_max = req.body.temperature_oil_max !== "" ? req.body.temperature_oil_max : 0.0;
    var temperature_hop_min = req.body.temperature_hop_min !== "" ? req.body.temperature_hop_min : 0.0;
    var temperature_hop_max = req.body.temperature_hop_max !== "" ? req.body.temperature_hop_max : 0.0;

    ParametrosReal.update({
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
        crewRotationSpeedMax : crewRotationSpeedMax,
        temperature_henMin : temperature_hen_min,
        temperature_henMax : temperature_hen_max,
        temperature_hnMin : temperature_hn_min,
        temperature_hnMax : temperature_hn_max,
        temperature_h1Min : temperature_h1_min,
        temperature_h1Max : temperature_h1_max,
        temperature_h2Min : temperature_h2_min,
        temperature_h2Max : temperature_h2_max,
        temperature_h3Min : temperature_h3_min,
        temperature_h3Max : temperature_h3_max,
        temperature_h4Min : temperature_h4_min,
        temperature_h4Max : temperature_h4_max,
        temperature_h5Min : temperature_h5_min,
        temperature_h5Max : temperature_h5_max,
        temperature_hopMin : temperature_hop_min,
        temperature_hopMax : temperature_hop_max,
        temperature_oilMin : temperature_oil_min,
        temperature_oilMax : temperature_oil_max
    },{
        where:{
            id:id
        }
    }).then(() => {
        RevisaoParametros.create({
            idFichaTecnica: id,
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
            crewRotationSpeedMax : crewRotationSpeedMax,
            temperature_henMin : temperature_hen_min,
            temperature_henMax : temperature_hen_max,
            temperature_hnMin : temperature_hn_min,
            temperature_hnMax : temperature_hn_max,
            temperature_h1Min : temperature_h1_min,
            temperature_h1Max : temperature_h1_max,
            temperature_h2Min : temperature_h2_min,
            temperature_h2Max : temperature_h2_max,
            temperature_h3Min : temperature_h3_min,
            temperature_h3Max : temperature_h3_max,
            temperature_h4Min : temperature_h4_min,
            temperature_h4Max : temperature_h4_max,
            temperature_h5Min : temperature_h5_min,
            temperature_h5Max : temperature_h5_max,
            temperature_hopMin : temperature_hop_min,
            temperature_hopMax : temperature_hop_max,
            temperature_oilMin : temperature_oil_min,
            temperature_oilMax : temperature_oil_max
    
    
    
      
        }).then(() => {
            res.redirect("/parametros/lista")
        })
    })
})

router.get("/parametros/revisao/:id",(req,res) => {
    var fichaId = req.params.id;
 

    RevisaoParametros.findAll({
        where: {
            idFichaTecnica: fichaId
        },
        order: [ [ 'createdAt', 'DESC' ]]
    }).then(revisao => {
        Maquinas.findOne({
            where: {
                id: revisao[0].maquina
            }
        }).then(maquina => {
            res.render("revisaoParametros/index", {
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
module.exports = router;